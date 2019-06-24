# frozen_string_literal: true

class Showcase < ApplicationRecord
  belongs_to :user, inverse_of: :showcases
  has_many :crystals, dependent: :destroy, inverse_of: :showcase

  validates :name, presence: true
  validates :user_id, presence: true

  scope :later, -> (num) {order(created_at: :desc).limit(num)}
  scope :earlier, -> (num) {order(created_at: :asc).limit(num)}

  def crystals
    Crystal.where(showcase_id: self.id)
  end
end
