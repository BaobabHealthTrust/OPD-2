class CreateDistricts < ActiveRecord::Migration[4.2]
  def self.up
    create_table :districts do |t|

      t.timestamps
    end
  end

  def self.down
    drop_table :districts
  end
end
