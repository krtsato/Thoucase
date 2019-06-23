# frozen_string_literal: true

class Fragment < ApplicationRecord
  belongs_to :user, inverse_of: :fragments
  belongs_to :crystal, inverse_of: :fragments

  validates :name, presence: true
  validates :content, presence: true
  validates :user_id, presence: true
  validates :crystal_id, presence: true

  # Each instance method has argument
  # because model data may exist in frontend by Link or Redirect.
  # So, only ids are sended to get extra data. e.g. user's name.
=begin
  def user(usr_id)
    User.find(usr_id)
  end

  def crystal(crs_id)
    Showcase.find(crs_id)
  end
=end
end
