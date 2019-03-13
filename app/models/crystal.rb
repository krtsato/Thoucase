# frozen_string_literal: true

class Crystal < ApplicationRecord
  validates :name, {presence: true}
  validates :user_id, {presence: true}
  validates :showcase_id, {presence: true}
end
