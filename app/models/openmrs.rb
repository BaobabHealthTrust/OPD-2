module Openmrs

  module ClassMethods
    def assign_scopes
      col_names = self.columns.map(&:name)
      default_scope {where ("#{self.table_name}.voided = 0")} if col_names.include?("voided")
      default_scope {where ("#{self.table_name}.retired = 0")}if col_names.include?("retired")
    end
    def [](name)
      name = name.to_s.gsub('_', ' ')
      self.find_by_name(name)
    end
  end

  def self.included(base)
    base.extend(ClassMethods)
    base.assign_scopes
  end

  def before_save

    self.changed_by = User.current.id if self.has_attribute?("changed_by") and User.current != nil

    self.changed_by = User.first if self.has_attribute?("changed_by") and User.current.nil?

    self.date_changed = Time.now if self.has_attribute?("date_changed")

  end

  def before_create

    if !Person.migrated_datetime.to_s.empty?
      self.location_id = Person.migrated_location if self.has_attribute?("location_id")
      self.creator = Person.migrated_creator if self.has_attribute?("creator")
      self.date_created = Person.migrated_datetime if self.has_attribute?("date_created")
    else
      self.location_id = Location.current_health_center.id if self.has_attribute?("location_id") and (self.location_id.blank? || self.location_id == 0) and Location.current_health_center != nil
      self.creator = User.current.id if self.has_attribute?("creator") and (self.creator.blank? || self.creator == 0)and User.current != nil
      self.date_created = Time.now if self.has_attribute?("date_created")
    end

    self.uuid = ActiveRecord::Base.connection.select_one("SELECT UUID() as uuid")['uuid'] if self.has_attribute?("uuid")
  end

  # Override this
  def after_void(reason = nil)
  end

  def void(reason = "Voided through #{ART_VERSION}",date_voided = Time.now, voided_by = (User.current.user_id unless User.current.nil?))
    unless voided?
      self.date_voided = date_voided
      self.voided = 1
      self.void_reason = reason
      self.voided_by = voided_by
      self.save
      self.after_void(reason)
    end
  end

  def voided?
    self.has_attribute?("voided") ? voided == 1 : raise("Model does not support voiding")
  end

  def add_location_obs
    obs = Observation.new()
    obs.person_id = self.patient_id
    obs.encounter_id = self.id
    obs.concept_id = ConceptName.find_by_name("WORKSTATION LOCATION").concept_id
    obs.value_text = Location.current_location.name
    obs.obs_datetime = self.encounter_datetime
    obs.save
  end
end
