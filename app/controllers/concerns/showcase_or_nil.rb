# frozen_string_literal: true

module ShowcaseOrNil
  extend ActiveSupport::Concern

  # For crystal#show
  def showcase_name_or_nil(shw_id)
    shw_id.present? ? Showcase.find_name(shw_id) : nil
  end
end
