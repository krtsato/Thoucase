# frozen_string_literal: true

class Crystal < ApplicationRecord
  belongs_to :user, foreign_key: :user_id
  belongs_to :showcase, foreign_key: :showcase_id
  has_many :fragments, dependent: :destroy

  validates :name, presence: true
  validates :user_id, presence: true
  validates :showcase_id, presence: true
end
