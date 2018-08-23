require 'composite_primary_keys'
class UserRole < ActiveRecord::Base
  self.table_name  = "user_role"
  self.primary_keys = :role, :user_id
  #include Openmrs
  belongs_to :user, -> { where retired: 0 }, foreign_key: :user_id, optional: true
end
