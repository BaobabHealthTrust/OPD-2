class CreateProgramEncounters < ActiveRecord::Migration[4.2]
  def self.up
    create_table :program_encounters, :primary_key => :program_encounter_id do |t|
      t.integer :encounter_id
      t.integer :program_id
      t.integer :voided, :limit => 1, :default => 0
      t.timestamps
    end
  end

  def self.down
    drop_table :program_encounters
  end
end
