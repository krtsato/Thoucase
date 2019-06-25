# frozen_string_literal: true

class Fragment < ApplicationRecord
  belongs_to :user, inverse_of: :fragments
  belongs_to :crystal, inverse_of: :fragments

  validates :name, presence: true
  validates :content, presence: true
  validates :user_id, presence: true
  validates :crystal_id, presence: true

  scope :latest, -> (count) {order(created_at: :desc).limit(count)}
  scope :earliest, -> (count) {order(created_at: :asc).limit(count)}
  scope :by_crystal_id, -> (id) {where(crystal_id: id)}

  class << self
    # For crystal#show
    def by_crystal_id_latest(crs_id, count)
      by_crystal_id(crs_id).latest(count)
    end
  end
end
