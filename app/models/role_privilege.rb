require "composite_primary_keys"

class RolePrivilege < ActiveRecord::Base
  self.table_name = "role_privilege"
  self.primary_keys = [:privilege, :role]
  include Openmrs
  belongs_to :role, foreign_key: :role, optional: true # no default scope
  belongs_to :privilege, foreign_key: :privilege, optional: true # no default scope
end