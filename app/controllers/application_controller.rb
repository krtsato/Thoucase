# frozen_string_literal: true

class ApplicationController < ActionController::API
  include ActionController::HttpAuthentication::Token::ControllerMethods

  def authenticate_user
    authenticate_with_http_token do |token|
      @current_user = User.find_by(token: token)
      if @current_user.nil?
        response.status = 401
        response.headers['flash'] = 'er-auth'
      end
    end
  end
  
  def forbid_login_user
    if @current_user
      response.status = 403
      response.headers['flash'] = 'er-logged'
    end
  end

  def ensure_valid_user
    if @current_user.id != params[:id].to_i
      response.status = 401
      response.headers['flash'] = 'er-auth'
    end
  end
end