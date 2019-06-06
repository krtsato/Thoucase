# frozen_string_literal: true

class Fragment < ApplicationRecord
  belongs_to :user, inverse_of: :fragments
  belongs_to :crystal, inverse_of: :fragments

  validates :name, presence: true
  validates :content, presence: true
  validates :user_id, presence: true
  validates :crystal_id, presence: true
end
