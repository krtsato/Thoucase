# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password
  has_secure_token

  has_many :showcases, dependent: :destroy
  has_many :crystals, dependent: :destroy
  has_many :fragments, dependent: :destroy

  validates :name, presence: true
  validates :email, presence: true
  validates :password, presence: true
end
