class CreateLocationTags < ActiveRecord::Migration[4.2]
  def self.up
    create_table :location_tags do |t|

      t.timestamps
    end
  end

  def self.down
    drop_table :location_tags
  end
end
