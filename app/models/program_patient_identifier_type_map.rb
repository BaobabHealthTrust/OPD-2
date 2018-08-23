class ProgramPatientIdentifierTypeMap < ActiveRecord::Base
  self.table_name = "program_patient_identifier_type_map"
  self.primary_key = "program_patient_identifier_type_map_id"
  include Openmrs
  belongs_to :program,->{where(retired: 0)}, optional: true
  belongs_to :patient_identifier_type, ->{where(retired: 0)}, optional: true
end
