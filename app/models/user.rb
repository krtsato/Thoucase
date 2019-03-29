# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password
  has_secure_token

  validates :name, presence: true
  validates :email, presence: true
  validates :password, presence: true
end
