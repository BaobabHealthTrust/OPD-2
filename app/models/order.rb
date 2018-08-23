class Order < ActiveRecord::Base
  before_save :before_save
  before_create :before_create

  self.table_name = "orders"
  self.primary_key = "order_id"
  include Openmrs
  belongs_to :order_type, -> { where retired: 0 }, optional: true
  belongs_to :concept, -> { where retired: 0 }, optional: true
  belongs_to :encounter, -> { where voided: 0 }, optional: true
  belongs_to :patient, -> { where voided: 0 }, optional: true
  belongs_to :provider, -> { where retired: 0 }, foreign_key: :orderer, class_name: :User, optional: true
  belongs_to :observation, -> { where voided: 0 }, foreign_key: :obs_id, class_name: :Observation, optional: true
  has_one :drug_order # no default scope

  scope :current,-> { includes(:encounter).references("encounter.encounter_id").where('DATE(encounter.encounter_datetime) = CURRENT_DATE()') }
  scope :historical, -> { includes(:encounter).references("encounter.encounter_id").where('DATE(encounter.encounter_datetime) <> CURRENT_DATE()') }
  scope :unfinished, -> {where("discontinued = 0 AND auto_expire_date > NOW()")}
  scope :finished, -> {where("discontinued = 1 OR auto_expire_date < NOW()")}
  scope :arv, lambda {|order|
    arv_concept = ConceptName.find_by_name("ANTIRETROVIRAL DRUGS").concept_id
    arv_drug_concepts = ConceptSet.where(['concept_set = ?', arv_concept])
    where(['concept_id IN (?)', arv_drug_concepts.map(&:concept_id)])
  }
  scope :labs, -> {joins(:drug_order).where('drug_order.drug_inventory_id is NULL')}
  scope :prescriptions, -> {joins(:drug_order).where("drug_order.drug_inventory_id is NOT NULL")}

  def after_void(reason = nil)
    # TODO Should we be voiding the associated meta obs that point back to this?
  end

  def to_s
    "#{drug_order}"
  end

end
