# frozen_string_literal: true

class Fragment < ApplicationRecord
  belongs_to :user, foreign_key: :user_id, inverse_of: :fragments
  belongs_to :crystal, foreign_key: :crystal_id, inverse_of: :fragments

  validates :name, presence: true
  validates :content, presence: true
  validates :user_id, presence: true
  validates :crystal_id, presence: true
end
