class PatientProgram < ActiveRecord::Base
 before_save :before_save
  before_create :before_create
  self.table_name = "patient_program"
  self.primary_key = "patient_program_id"
  include Openmrs
  belongs_to :patient, -> {where(voided: 0)}, optional: true
  belongs_to :program, -> {where(retired: 0)}, optional: true
  belongs_to :location, -> {where(retired: 0)}, optional: true
  has_many :patient_states, -> {where(voided: 0)}, class_name: 'PatientState' # :order => 'start_date, date_created', :dependent => :destroy

  scope :current, -> { where('date_enrolled < NOW() AND (date_completed IS NULL OR date_completed > NOW())')}
  scope :local, lambda{|| where (['location_id IN (?)',  Location.current_health_center.children.map{|l|l.id} + [Location.current_health_center.id] ])}

  scope :in_programs, lambda{|names| names.blank? ? {} : joins(:program).where(['program.name IN (?)', Array(names)])}
  scope :not_completed, lambda{|| where('date_completed IS NULL')}

  scope :in_uncompleted_programs, lambda{|names| names.blank? ? {} : includes(:program).references("program.program_id").where(['program.name IN (?) AND date_completed IS NULL', Array(names)])}

  validates_presence_of :date_enrolled, :program_id

  def validate
    PatientProgram.where(patient_id: self.patient_id).each{|patient_program|
      next if self.program == patient_program.program
      if self.program == patient_program.program and self.location and self.location.related_to_location?(patient_program.location) and patient_program.date_enrolled <= self.date_enrolled and (patient_program.date_completed.nil? or self.date_enrolled <= patient_program.date_completed)
        errors.add_to_base "Patient already enrolled in program #{self.program.name rescue nil} at #{self.date_enrolled.to_date} at #{self.location.parent.name rescue self.location.name}"
      end
    }
  end

  def after_void(reason = nil)
    self.patient_states.each{|row| row.void(reason) }
  end

  def debug
    puts self.to_yaml
    return
    puts "Name: #{self.program.concept.fullname}" rescue nil
    puts "Date enrolled: #{self.date_enrolled}"

  end

  def to_s
	if !self.program.concept.shortname.blank?
    	"#{self.program.concept.shortname} (at #{location.name rescue nil})"
	else
    	"#{self.program.concept.fullname} (at #{location.name rescue nil})"
	end
  end
  
  def transition(params)
	#raise params.to_yaml
    ActiveRecord::Base.transaction do
      # Find the state by name
      # Used upcase below as we were having problems matching the concept fullname with the state
      # I hope this will sort the problem and doesnt break anything
      selected_state = self.program.program_workflows.map(&:program_workflow_states).flatten.select{|pws| pws.concept.fullname.upcase() == params[:state].upcase()}.first rescue nil
      state = self.patient_states.last rescue []
      if (state && selected_state == state.program_workflow_state)
        # do nothing as we are already there
      else
        # Check if there is an open state and close it
        if (state && state.end_date.blank?)
          state.end_date = params[:start_date]
          state.save!
        end    
        # Create the new state      
        state = self.patient_states.new({
          :state => selected_state.program_workflow_state_id,
          :start_date => params[:start_date] || Date.today,
          :end_date => params[:end_date]
        })
        state.save!

		if selected_state.terminal == 1
			complete(params[:start_date])
		else
			complete(nil)
		end

      end  
    end
  end
  
  def complete(end_date = nil)
    self.date_completed = end_date
    self.save!
  end
  
  # This is a pretty clumsy way of finding which regimen the patient is on.
  # Eventually it would be good to have a way to associate a program with a
  # regimen type without doing it manually. Note, the location of the regimen
  # obs must be the current health center, not the station!
  def current_regimen
    location_id = Location.current_health_center.location_id
		obs = patient.person.observations.recent(1).where(['value_coded IN (?) AND encounter.location_id = ?', regimens, location_id]).joins(:encounter)
    obs.first.value_coded rescue nil
  end

  # Actually returns +Concept+s of suitable +Regimen+s for the given +weight+
  def regimens(weight=nil)
    self.program.regimens(weight)
  end

  def closed?
    (self.date_completed.blank? == false)
  end
        
end
