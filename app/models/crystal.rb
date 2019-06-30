# frozen_string_literal: true

class Crystal < ApplicationRecord
  include FindName
  include DescAscScope
  include UserScope

  belongs_to :user, inverse_of: :crystals
  belongs_to :showcase, optional: true, inverse_of: :crystals
  has_many :fragments, dependent: :destroy, inverse_of: :crystal

  validates :name, presence: true
  validates :user_id, presence: true
  validates :showcase_id, numericality: true, allow_nil: true

  scope :by_showcase_id, -> (id) {where(showcase_id: id)}
  scope :includes_map_showcase, -> {includes(:showcase).map(&:showcase)}

  class << self
    # For fragments#new, crystals#create
    def by_user_id_select_id_name_latest(usr_id, count)
      by_user_id(usr_id).select('id, name').latest(count)
    end

    # For showcases#show
    def by_showcase_id_latest(shw_id, count)
      by_showcase_id(shw_id).latest(count)
    end
  end
end
