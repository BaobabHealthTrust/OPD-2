require 'composite_primary_keys'
class LocationTagMap < ActiveRecord::Base
  self.table_name = "location_tag_map"
  self.primary_keys = [:location_tag_id, :location_id]
  belongs_to :location_tag, optional: true
  belongs_to :location, optional: true
end
