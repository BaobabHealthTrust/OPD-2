class HealthdataConnection < ActiveRecord::Base
  establish_connection HEALTHDATA_DB
  self.abstract_class = true
end
