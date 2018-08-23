class Regimen < ActiveRecord::Base
  self.table_name = "regimen"
  self.primary_key = "regimen_id"
  include Openmrs
  belongs_to :concept,->{where(retired:0)}, optional: true
  belongs_to :program,->{where(retired:0)}
  has_many :regimen_drug_orders # no default scope
  scope :program, lambda {|program_id| where(program_id: program_id)}
  scope :criteria, lambda {|weight| where(['min_weight <= ? AND max_weight > ?', weight, weight]) unless weight.blank?}
end
