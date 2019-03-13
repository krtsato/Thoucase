class CreateCrystals < ActiveRecord::Migration[5.2]
  def change
    create_table :crystals do |t|
      t.string :name
      t.integer :user_id
      t.integer :showcase_id

      t.timestamps
    end
  end
end
