class ConceptDatatype < ActiveRecord::Base
  self.table_name = "concept_datatype"
  self.primary_key  = "concept_datatype_id"

  has_many :concepts, -> { where retired: 0 },  class_name: :Concept, foreign_key: :datatype_id
  belongs_to :user, -> { where voided: 0 }, foreign_key: :user_id
end