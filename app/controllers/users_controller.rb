# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :authenticate_user, only: [:edit, :update, :destroy]
  before_action :forbid_login_user, only: [:new, :create, :login_form, :login]
  before_action :ensure_correct_user, only: [:edit, :update, :destroy]
  before_action :set_user, only: [:show, :update, :destroy]

  # GET /login
  def login_form
    render status: :ok
  end

  # POST /login
  def login
    email = params[:email]
    password = params[:password]
    login_user = User.find_by(email: email)
    if login_user && login_user.authenticate(password)
      @token = login_user.token
      @flash_msg = 'ログインしました'
      @login_data = {
        token: @token,
        flash: @flash_msg
      }
    else
      @login_data = {
        error: 'メールアドレスまたはパスワードが間違っています',
        email: email,
        password: password
      }
    end
    redirect_to('/fragments/index')
  end

  def logout
    @token = nil
    @flash_msg = 'ログアウトしました'
    render json: @flash_msg
  end

  # GET /users
  def index
    @users = User.all
    render json: @users
  end

  # GET /users/1
  def show
    render json: @user
  end

  # GET /fragments
  def new; end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # GET /fragments/1
  def edit; end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private

    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:name, :email, :password_digest)
    end
end
