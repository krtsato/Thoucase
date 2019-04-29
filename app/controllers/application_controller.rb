# frozen_string_literal: true

class ApplicationController < ActionController::API
  include ActionController::ImplicitRender
  include ActionView::Layouts

  before_action :set_current_user

  def set_current_user
    if @token
      @current_user = User.find_by(token: @token)
    end
  end

  def authenticate_user
    if @current_user == nil
      @flash_msg = 'ログインするかアカウントを作成して下さい'
      render json: @flash_msg, template: 'users/login_form'
    end
  end

  def forbid_login_user
    if @current_user
      @flash_msg = 'すでにログインしています'
      render json: @flash_msg, template: 'fragments/index'
    end
  end

  def ensure_valid_user
    if @current_user.id != params[:id].to_i
      @flash_msg = '権限がありません'
      render json: @flash_msg, template: 'fragments/index'
    end
  end
end