class PersonAttributeType < ActiveRecord::Base
  self.table_name = "person_attribute_type"
  self.primary_key = "person_attribute_type_id"
  before_save :before_save
  before_create :before_create
  include Openmrs
  has_many :person_attributes, ->{where(voided:0)}
end