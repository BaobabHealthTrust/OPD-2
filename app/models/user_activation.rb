class UserActivation < ActiveRecord::Base
  self.table_name = "user_activation"
  self.primary_key = "user"
end
