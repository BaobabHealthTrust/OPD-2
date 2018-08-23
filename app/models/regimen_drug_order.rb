class RegimenDrugOrder < ActiveRecord::Base
  self.table_name = "regimen_drug_order"
  self.primary_key = "regimen_drug_order_id"
  include Openmrs
  belongs_to :regimen,->{where(retired:0)}, optional: true
  belongs_to :drug, ->{where(retired:0)}, foreign_key: :drug_inventory_id, optional: true

  def to_s
    s = "#{drug.name}: #{self.dose} #{self.units} #{frequency}"
    s << " (prn)" if prn == 1
    s
  end
end