class CreateRegions < ActiveRecord::Migration[4.2]
  def self.up
    create_table :regions do |t|

      t.timestamps
    end
  end

  def self.down
    drop_table :regions
  end
end
