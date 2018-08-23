class ProgramEncounterTypeMap < ActiveRecord::Base
  self.table_name = "program_encounter_type_map"
  self.primary_key = "program_encounter_type_map_id"
  include Openmrs
  belongs_to :program, ->{where(retired: 0)}, optional: true
  belongs_to :encounter_type,->{where(retired: 0)}, optional: true
end
