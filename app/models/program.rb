class Program < ActiveRecord::Base
  self.table_name = "program"
  self.primary_key = "program_id"
  include Openmrs
  belongs_to :concept,->{where(retired: 0)}, optional: true
  has_many :patient_programs, -> {where(voided: 0)}
  has_many :program_workflows,-> {where(retired: 0)}
  has_many :program_workflow_states, through: :program_workflows

  # Actually returns +Concept+s of suitable +Regimen+s for the given +weight+
  # and this +Program+
  def regimens(weight=nil)
    Regimen.program(program_id).criteria(weight).select('concept_id').includes(:concept).group('concept_id, program_id'
    ).order('regimen_id').map(&:concept)
  end
end
