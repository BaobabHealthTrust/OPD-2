class ProgramOrdersMap < ActiveRecord::Base
  self.table_name = "program_orders_map"
  self.primary_key = "program_orders_map_id"
  include Openmrs
  belongs_to :program, ->{where(retired: 0)}, optional: true
  belongs_to :concept, ->{where(retired: 0)}, optional: true
end
