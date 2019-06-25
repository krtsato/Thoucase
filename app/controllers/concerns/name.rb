# frozen_string_literal: true

require 'active_support/concern'

module Name
  extend ActiveSupport::Concern

  # For crystal#show
  def showcase_name_kept_nil(shw_id)
    shw_id.present? ? Showcase.find_name(shw_id) : nil
  end
end