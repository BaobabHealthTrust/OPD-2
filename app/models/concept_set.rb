class ConceptSet < ActiveRecord::Base
  self.table_name = "concept_set"
  self.primary_key = "concept_set_id"

  belongs_to :set, -> { where retired: 0 }, class_name: :Concept, optional: true
  belongs_to :concept, -> { where retired: 0 }, optional: true
end
