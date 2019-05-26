# frozen_string_literal: true

class Showcase < ApplicationRecord
  belongs_to :user, foreign_key: :user_id
  has_many :crystals, dependent: :destroy

  validates :name, presence: true
  validates :user_id, presence: true
end
