class AddEventTextToEvent < ActiveRecord::Migration[5.0]
  def change
    add_column :events, :body, :text, after: :title_name
  end
end
