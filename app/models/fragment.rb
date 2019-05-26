# frozen_string_literal: true

class Fragment < ApplicationRecord
  belongs_to :user, foreign_key: :user_id
  belongs_to :crystal, foreign_key: :crystal_id

  validates :name, presence: true
  validates :content, presence: true
  validates :user_id, presence: true
  validates :crystal_id, presence: true
end
