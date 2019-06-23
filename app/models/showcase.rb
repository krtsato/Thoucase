# frozen_string_literal: true

class Showcase < ApplicationRecord
  belongs_to :user, inverse_of: :showcases
  has_many :crystals, dependent: :destroy, inverse_of: :showcase

  validates :name, presence: true
  validates :user_id, presence: true

  # Each instance method has argument
  # because model data may exist in frontend by Link or Redirect.
  # So, only ids are sended to get extra data. e.g. user's name.
  def user(usr_id)
    User.find(usr_id)
  end

  def crystal(crs_id)
    Crystal.find(crs_id)
  end
end
