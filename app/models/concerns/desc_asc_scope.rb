# frozen_string_literal: true

module DescAscScope
  extend ActiveSupport::Concern
  included do
    scope :latest, -> (count) {order(created_at: :desc).limit(count)}
    scope :earliest, -> (count) {order(created_at: :asc).limit(count)}
  end
end
