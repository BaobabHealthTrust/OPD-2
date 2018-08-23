class ConceptClass < ActiveRecord::Base
  self.table_name = "concept_class"
  self.primary_key = "concept_class_id"

  has_many :concepts, -> { where retired: 0 }, class_name: :Concept, foreign_key: :class_id

  def self.diagnosis_concepts
    #@@diagnoses ||= self.find_by_name("DIAGNOSIS", :include => {:concepts => :name}).concepts
    @@diagnoses ||= self.includes({:concepts => :concept_names}).where(["name =?", "DIAGNOSIS"]).last.concepts
    @@diagnoses
  end
end
