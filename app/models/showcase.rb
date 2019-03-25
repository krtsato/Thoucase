# frozen_string_literal: true

class Showcase < ApplicationRecord
  validates :name, presence: true
  validates :user_id, presence: true
end
