class CreateDrugIngredients < ActiveRecord::Migration[4.2]
  def self.up
    create_table :drug_ingredients do |t|

      t.timestamps
    end
  end

  def self.down
    drop_table :drug_ingredients
  end
end
