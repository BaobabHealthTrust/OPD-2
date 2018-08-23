require "will_paginate"
class Encounter < ActiveRecord::Base
  before_save :before_save
  before_create :before_create
  after_save :after_save
  after_create :create_encounter_program

  self.table_name = "encounter"
  self.primary_key = "encounter_id"

  include Openmrs

  has_many :observations, -> { where voided: 0 }, dependent: :destroy
  has_many :orders, -> { where voided: 0 }, dependent: :destroy
  has_many :drug_orders, foreign_key: "order_id", through: "orders"
  belongs_to :type, -> { where retired: 0 }, class_name: "EncounterType", foreign_key: "encounter_type", optional: true
  belongs_to :provider, -> { where voided: 0 }, class_name: "Person", foreign_key: "provider_id", optional: true
  belongs_to :patient, -> { where voided: 0 }, optional: true

  # TODO, this needs to account for current visit, which needs to account for possible retrospective entry
  scope :current, -> {where('DATE(encounter.encounter_datetime) = CURRENT_DATE()')}

  def before_save
    self.provider = User.current.person if self.provider.blank?
    # TODO, this needs to account for current visit, which needs to account for possible retrospective entry
    self.encounter_datetime = Time.now if self.encounter_datetime.blank?
  end

  def after_save
    self.add_location_obs
  end

  def after_void(reason = nil)
    self.observations.each do |row|
      if not row.order_id.blank?
        ActiveRecord::Base.connection.execute <<EOF
UPDATE drug_order SET quantity = NULL WHERE order_id = #{row.order_id};
EOF
      end rescue nil
      row.void(reason)
    end rescue []

    self.orders.each do |order|
      order.void(reason)
    end

    void_encounter_program
  end

  def name
    self.type.name rescue "N/A"
  end

  def encounter_type_name=(encounter_type_name)
    self.type = EncounterType.where(["name =?", encounter_type_name]).last
    raise "#{encounter_type_name} not a valid encounter_type" if self.type.nil?
  end

  def to_s
    if name == 'REGISTRATION'
      "Patient was seen at the registration desk at #{encounter_datetime.strftime('%I:%M')}"
    elsif name == 'TREATMENT'
      o = orders.collect{|order| order.to_s}.join("\n")
      o = "No prescriptions have been made" if o.blank?
      o
    elsif name == 'VITALS'
      temp = observations.select {|obs| obs.concept.concept_names.map(&:name).include?("TEMPERATURE (C)") && "#{obs.answer_string}".upcase != 'UNKNOWN' }
      weight = observations.select {|obs| obs.concept.concept_names.map(&:name).include?("WEIGHT (KG)") || obs.concept.concept_names.map(&:name).include?("Weight (kg)") && "#{obs.answer_string}".upcase != '0.0' }
      height = observations.select {|obs| obs.concept.concept_names.map(&:name).include?("HEIGHT (CM)") || obs.concept.concept_names.map(&:name).include?("Height (cm)") && "#{obs.answer_string}".upcase != '0.0' }
      vitals = [weight_str = weight.first.answer_string + 'KG' rescue 'UNKNOWN WEIGHT',
        height_str = height.first.answer_string + 'CM' rescue 'UNKNOWN HEIGHT']
      temp_str = temp.first.answer_string + '°C' rescue nil
      vitals << temp_str if temp_str
      vitals.join(', ')
    else
      observations.collect{|observation| "<b>#{(observation.concept.concept_names.last.name) rescue ""}</b>: #{observation.answer_string}"}.join(", ")
    end
  end

  def self.statistics(encounter_types, opts={})
    encounter_types = EncounterType.where(['name IN (?)', encounter_types])
    encounter_types_hash = encounter_types.inject({}) {|result, row| result[row.encounter_type_id] = row.name; result }
    rows = self.where(['encounter_type IN (?)', encounter_types.map(&:encounter_type_id)]).where(opts[:conditions]).group("encounter_type").select("count(*) as number, encounter_type")
    return rows.inject({}) {|result, row| result[encounter_types_hash[row['encounter_type']]] = row['number']; result }
  end

  def create_encounter_program
    database_sharing = CoreService.get_global_property_value("database.sharing").to_s == "true"
    if (database_sharing)
      program_encounter = ProgramEncounter.new
      program_encounter.encounter_id = self.encounter_id
      program_encounter.program_id = Program.where(["name =?","OPD Program"]).last.program_id
      program_encounter.save
    end
  end

  def void_encounter_program
    database_sharing = CoreService.get_global_property_value("database.sharing").to_s == "true"
    if (database_sharing)
      program_encounter = ProgramEncounter.where(["encounter_id =?", self.encounter_id]).last
      unless program_encounter.blank?
        program_encounter.voided = 1
        program_encounter.save
      end
    end
  end
end
