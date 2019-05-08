# frozen_string_literal: true

class HomeController < ApplicationController
  include ActionView::Layouts

  def root
    render template: 'index'
  end
end
