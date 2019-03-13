class CreateFragments < ActiveRecord::Migration[5.2]
  def change
    create_table :fragments do |t|
      t.string :name
      t.jsonb :content
      t.integer :user_id
      t.integer :crystal_id

      t.timestamps
    end
  end
end
