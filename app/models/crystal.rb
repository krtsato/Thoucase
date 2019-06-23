# frozen_string_literal: true

class Crystal < ApplicationRecord
  belongs_to :user, inverse_of: :crystals
  belongs_to :showcase, optional: true, inverse_of: :crystals
  has_many :fragments, dependent: :destroy, inverse_of: :crystal

  validates :name, presence: true
  validates :user_id, presence: true
  validates :showcase_id, numericality: true, allow_nil: true

  # Each instance method has argument
  # because model data may exist in frontend by Link or Redirect.
  # So, only ids are sended to get extra data. e.g. user's name.
=begin
  def user(usr_id)
    User.find(usr_id)
  end

  def showcase(shw_id)
    Showcase.find(shw_id)
  end

  def fragments(crs_id)
    Fragment.find_by(crystal_id: crs_id)
  end
=end
end
