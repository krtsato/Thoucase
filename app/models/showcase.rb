# frozen_string_literal: true

class Showcase < ApplicationRecord
  include FindName
  include DescAscScope
  include UserScope

  belongs_to :user, inverse_of: :showcases
  has_many :crystals, dependent: :destroy, inverse_of: :showcase

  validates :name, presence: true
  validates :user_id, presence: true

  class << self
    # For hoge#fuga
    def by_user_id_select_id_name_latest(usr_id, count)
      by_user_id(usr_id).select('id, name').latest(count)
    end
  end
end
