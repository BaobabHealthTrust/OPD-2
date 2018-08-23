class ConceptAnswer < ActiveRecord::Base
  self.table_name  = "concept_answer"
  self.primary_key = "concept_answer_id"


  belongs_to :answer, -> { where retired: 0 }, class_name: :Concept, foreign_key: :answer_concept, optional: true
  belongs_to :drug, -> { where retired: 0 }, class_name: :Drug, foreign_key: :answer_drug, optional: true
  belongs_to :concept, -> { where retired: 0 }, class_name: :Concept, foreign_key: :concept_id, optional: true

  def name
    self.answer.fullname rescue ''
  end
end
