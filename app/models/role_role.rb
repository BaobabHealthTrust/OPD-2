require 'composite_primary_keys'
class RoleRole < ActiveRecord::Base
  self.table_name = "role_role"
  self.primary_keys= :parent_role, :child_role
  include Openmrs
end
