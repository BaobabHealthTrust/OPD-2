class ProgramWorkflow < ActiveRecord::Base
  self.table_name = "program_workflow"
  self.primary_key = "program_workflow_id"
  include Openmrs
  belongs_to :program,->{where(retired: 0)}, optional: true
  belongs_to :concept,->{where(retired: 0)}, optional: true
  has_many :program_workflow_states, ->{where(retired: 0)}
end
