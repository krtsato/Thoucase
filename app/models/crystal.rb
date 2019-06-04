# frozen_string_literal: true

class Crystal < ApplicationRecord
  belongs_to :user, inverse_of: :crystals
  belongs_to :showcase, inverse_of: :crystals
  has_many :fragments, dependent: :destroy, inverse_of: :crystal

  validates :name, presence: true
  validates :user_id, presence: true
  validates :showcase_id, presence: true
end
