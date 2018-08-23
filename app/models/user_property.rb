require 'composite_primary_keys'
class UserProperty < ActiveRecord::Base
  self.table_name = "user_property"
  self.primary_keys = :user_id, :property
  #include Openmrs
  belongs_to :user, -> { where retired: 0 }, foreign_key: :user_id, optional: true
end