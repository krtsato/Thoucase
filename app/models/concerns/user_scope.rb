# frozen_string_literal: true

module UserScope
  extend ActiveSupport::Concern
  included do
    scope :by_user_id, -> (id) {where(user_id: id)}
    scope :includes_map_user, -> {includes(:user).map(&:user)}
  end
end
