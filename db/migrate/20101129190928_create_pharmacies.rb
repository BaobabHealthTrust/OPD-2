class CreatePharmacies < ActiveRecord::Migration[4.2]
  def self.up
    create_table :pharmacies do |t|

      t.timestamps
    end
  end

  def self.down
    drop_table :pharmacies
  end
end
