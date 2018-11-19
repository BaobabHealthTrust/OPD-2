class CreateTraditionalAuthorities < ActiveRecord::Migration[4.2]
  def self.up
    create_table :traditional_authorities do |t|

      t.timestamps
    end
  end

  def self.down
    drop_table :traditional_authorities
  end
end
