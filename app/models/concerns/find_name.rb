# frozen_string_literal: true

module FindName
  extend ActiveSupport::Concern

  class_methods do
    # User     : for crystals#show, fragments#show
    # Showcase : for controller/concern/name
    # Crystal  : for fragments#show
    def find_name(id)
      find(id)[:name]
    end
  end
end
