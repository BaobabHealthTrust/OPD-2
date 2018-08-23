class ConceptMap < ActiveRecord::Base
  self.table_name = "concept_map"
  self.primary_key = "concept_map_id"

  belongs_to :concept, -> { where retired: 0 }, optional: true
  belongs_to :concept_source, -> { where retired: 0 }, class_name: :ConceptSource, foreign_key: :source, optional: true
end

