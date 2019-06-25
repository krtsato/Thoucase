# frozen_string_literal: true

class Showcase < ApplicationRecord
  belongs_to :user, inverse_of: :showcases
  has_many :crystals, dependent: :destroy, inverse_of: :showcase

  validates :name, presence: true
  validates :user_id, presence: true

  scope :latest, -> (count) {order(created_at: :desc).limit(count)}
  scope :earliest, -> (count) {order(created_at: :asc).limit(count)}
  scope :by_crystal_id, -> (id) {where(crystal_id: id)}

  class << self
    # For controller/concern/name
    def find_name(shw_id)
      find(shw_id)[:name]
    end
  end
end
