class CreateLabs < ActiveRecord::Migration[4.2]
  def self.up
    create_table :labs do |t|

      t.timestamps
    end
  end

  def self.down
    drop_table :labs
  end
end
