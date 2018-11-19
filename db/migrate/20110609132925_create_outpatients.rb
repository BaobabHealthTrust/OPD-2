class CreateOutpatients < ActiveRecord::Migration[4.2]
  def self.up
    create_table :outpatients do |t|

      t.timestamps
    end
  end

  def self.down
    drop_table :outpatients
  end
end
