# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password
  has_secure_token

  has_many :showcases, dependent: :destroy, inverse_of: :user
  has_many :crystals, dependent: :destroy, inverse_of: :user
  has_many :fragments, dependent: :destroy, inverse_of: :user

  validates :name, presence: true
  validates :email, presence: true
  validates :password, presence: true

  scope :latest, -> (count) {order(created_at: :desc).limit(count)}
  scope :earliest, -> (count) {order(created_at: :asc).limit(count)}

  class << self
    # For crystal#show
    def find_name(usr_id)
      find(usr_id)[:name]
    end
  end
end
