class ChangeTemperatureColumnDecimalPrecision < ActiveRecord::Migration[4.2]
  def self.up
    change_column :temperature_records, :temperature, :decimal, :precision => 5, :scale => 2
  end

  def self.down
    change_column :temperature_records, :temperature, :decimal
  end
end
