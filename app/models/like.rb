class Like < ApplicationRecord
  validates :user_id, presence: true
  validates :fragment_id, presence: true
end
