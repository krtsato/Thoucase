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

  def showcases
    Showcase.where(user_id: self.id)
  end

  def crystals
    Crystal.where(user_id: self.id)
  end

  def fragments
    Fragment.where(user_id: self.id)
  end
end
