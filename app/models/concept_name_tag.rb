class ConceptNameTag < ActiveRecord::Base
  self.table_name = "concept_name_tag"
  self.primary_key = "concept_name_tag_id"

  has_many :concept_name_tag_map # no default scope
  has_many :concept_name, :through => :concept_name_tag_map
end

