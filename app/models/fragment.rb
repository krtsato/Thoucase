# frozen_string_literal: true

class Fragment < ApplicationRecord
  validates :name, {presence: true}
  validates :content, {presence: true}
  validates :user_id, {presence: true}
  validates :crystal_id, {presence: true}
end
