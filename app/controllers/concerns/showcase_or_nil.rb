# frozen_string_literal: true

module ShowcaseOrNil
  extend ActiveSupport::Concern

  # For crystal#show
  def showcase_or_nil(shw_id)
    shw_id.present? ? Showcase.find(shw_id) : nil
  end
end
