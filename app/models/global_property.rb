class GlobalProperty < ActiveRecord::Base
  before_save :before_save
  before_create :before_create

  self.table_name = "global_property"
  self.primary_key =  "property"
  include Openmrs

  def to_s
    return "#{property}: #{property_value}"
  end

end
