class CreateVillages < ActiveRecord::Migration[4.2]
  def self.up
    create_table :villages do |t|

      t.timestamps
    end
  end

  def self.down
    drop_table :villages
  end
end
