# frozen_string_literal: true

class Showcase < ApplicationRecord
  belongs_to :user, foreign_key: :user_id, inverse_of: :showcases
  has_many :crystals, dependent: :destroy, inverse_of: :showcase

  validates :name, presence: true
  validates :user_id, presence: true
end
