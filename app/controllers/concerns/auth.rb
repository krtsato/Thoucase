# frozen_string_literal: true

require 'active_support/concern'

module Auth
  extend ActiveSupport::Concern

  def authenticate_user
    authenticate_with_http_token do |token|
      @current_user = User.find_by(token: token)
      return if @current_user.present?

      response.headers['flash'] = 'er-auth'
      render status: :unauthorized
    end
  end

  def forbid_signin_user
    return if @current_user.nil?

    response.headers['flash'] = 'er-forbd'
    render status: :forbidden
  end

  def ensure_owner(instance)
    return if @current_user.id == instance.user_id

    response.headers['flash'] = 'er-auth'
    render status: :unauthorized
  end
end
