# frozen_string_literal: true

class User < ApplicationRecord
  include DescAscScope

  has_secure_password
  has_secure_token

  has_many :showcases, dependent: :destroy, inverse_of: :user
  has_many :crystals, dependent: :destroy, inverse_of: :user
  has_many :fragments, dependent: :destroy, inverse_of: :user

  validates :name, presence: true
  validates :email, presence: true
  validates :password, presence: true
end
