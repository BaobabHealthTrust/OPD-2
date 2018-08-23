class Person < ActiveRecord::Base
  self.table_name = "person"
  self.primary_key  = "person_id"
  before_save :before_save
  before_create :before_create
  include Openmrs

  cattr_accessor :session_datetime
  cattr_accessor :migrated_datetime
  cattr_accessor :migrated_creator
  cattr_accessor :migrated_location

  has_one :patient, ->{where(voided:0)},class_name: :Patient, foreign_key: :patient_id, dependent: :destroy
  has_many :names, ->{where(voided:0)},class_name: :PersonName, foreign_key: :person_id, dependent: :destroy #, order: 'person_name.preferred DESC'
  has_many :addresses, ->{where(voided:0)}, class_name: :PersonAddress, foreign_key: :person_id, dependent: :destroy #, order: 'person_address.preferred DESC'
  has_many :relationships,->{where(voided:0)}, class_name: :Relationship, foreign_key: :person_a
  has_many :person_attributes,->{where(voided:0)}, class_name: :PersonAttribute, foreign_key: :person_id
  has_many :observations,->{where(voided:0)}, class_name: :Observation, foreign_key: :person_id, dependent: :destroy do
    def find_by_concept_name(name)
      concept_name = ConceptName.find_by_name(name)
      where('concept_id = ?', concept_name.concept_id) rescue []
    end
  end

  def after_void(reason = nil)
    self.patient.void(reason) rescue nil
    self.names.each{|row| row.void(reason) }
    self.addresses.each{|row| row.void(reason) }
    self.relationships.each{|row| row.void(reason) }
    self.person_attributes.each{|row| row.void(reason) }
    # We are going to rely on patient => encounter => obs to void those
  end

end
