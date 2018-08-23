class PatientState < ActiveRecord::Base
  before_save :before_save
  before_create :before_create
  after_save :after_save
  self.table_name = "patient_state"
  self.primary_key = "patient_state_id"
  include Openmrs

  belongs_to :patient_program, -> {where(voided: 0)}, optional: true
  belongs_to :program_workflow_state,foreign_key: :state,class_name: 'ProgramWorkflowState', optional: true
#, :conditions => {:retired => 0}

  scope :current, -> {where(['start_date IS NOT NULL AND DATE(start_date) <= ? AND (end_date IS NULL OR DATE(end_date) > ?)',Date.today,Date.today])}

  def after_save
    # If this is the only state and it is not initial, oh well
    # If this is a terminal state then close the program
    patient_program.complete(end_date) if program_workflow_state.terminal != 0 rescue nil
  end

  def to_s
	workflow_state = ProgramWorkflowState.find_state state
	s = workflow_state.concept.concept_names.typed("SHORT").first.name rescue workflow_state.concept.fullname
    if start_date
      s = s + " #{start_date.strftime('%d/%b/%Y')}"
    end

    if end_date
      s = s + "-#{end_date.strftime('%d/%b/%Y')}"
    end
    s
  end

  def name
		workflow_state = ProgramWorkflowState.find_state state
		s = workflow_state.concept.concept_names.typed("SHORT").first.name rescue workflow_state.concept.fullname
    s
  end
 end
