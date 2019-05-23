# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :authenticate_user, only: [:update, :destroy]
  before_action :forbid_signin_user, only: [:create, :signin]
  before_action :ensure_valid_user, only: [:update, :destroy]
  before_action :set_user, only: [:show, :update, :destroy]
  before_action :set_snin_params, only: [:signin]

  # POST /signin
  def signin
    snin_user = User.find_by(email: @email)
    if snin_user &.authenticate(@password)
      response.headers['authorization'] = snin_user.token
      response.headers['flash'] = 'ok-snin'
      render status: :no_content
    else
      response.headers['flash'] = 'er-snin'
      render json: {email: @email, password: @password}, status: :unauthorized
    end
  end

  def signout
    response.headers['authorization'] = nil
    response.headers['flash'] = 'ok-snout'
    render status: :no_content
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

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

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

    def set_snin_params
      @email = params.require(:user)[:email]
      @password = params.require(:user)[:password]
    end
end
