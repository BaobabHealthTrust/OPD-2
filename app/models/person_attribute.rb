class PersonAttribute < ActiveRecord::Base
  self.table_name = "person_attribute"
  self.primary_key = "person_attribute_id"
  before_save :before_save
  before_create :before_create

  include Openmrs


  belongs_to :type,->{where(retired:0)}, class_name: :PersonAttributeType, foreign_key: :person_attribute_type_id, optional: true
  belongs_to :person, ->{where(voided:0)}, foreign_key: :person_id, optional: true
end
