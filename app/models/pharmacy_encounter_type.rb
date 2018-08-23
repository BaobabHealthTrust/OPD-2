class PharmacyEncounterType < ActiveRecord::Base
  self.table_name = "pharmacy_encounter_type"
  self.primary_key = "pharmacy_encounter_type_id"
  include Openmrs
end
