class ProgramEncounter < ActiveRecord::Base
  before_save :before_save
  before_create :before_create
  
  self.table_name = "program_encounters"
  self.primary_key = "program_encounter_id"

  include Openmrs
  belongs_to :encounter, :foreign_key => :encounter_id
  
end
