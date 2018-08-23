class ProgramRelationshipTypeMap < ActiveRecord::Base
  self.table_name = "program_relationship_type_map"
  self.primary_key = "program_relationship_type_map_id"
  include Openmrs
  belongs_to :program,->{where(retired: 0)}, optional: true
  belongs_to :relationship_type,->{where(retired: 0)}, optional: true
end
