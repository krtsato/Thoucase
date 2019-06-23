# frozen_string_literal: true

class FragmentsController < ApplicationController
  include Auth
  before_action :authenticate_user, only: [:new, :create, :update, :destroy]
  before_action :set_fragment, only: [:update, :destroy]
  before_action -> {ensure_owner(@fragment)}, only: [:update, :destroy]

  # GET /fragments
  def index
    fragments = Fragment.all.order(created_at: :desc)
    users = fragments.includes(:user).map(&:user)
    render json: {fragments: fragments, users: users}, status: :ok
  end

  # GET /fragments/1
  def show
    usr_id = params[:user_id]
    crs_id = params[:crystal_id]
    is_self = @current_user ? @current_user.id == usr_id.to_i : false

    if usr_id.blank? || crs_id.blank?
      # from direct URL
      set_fragment
      set_usr_crs_name(@fragment.user_id, @fragment.crystal_id)
      render json: {fragment: @fragment, crs_name: @crs_name, usr_name: @usr_name, is_self: is_self}, status: :ok
    else
      # from Link or Redirect
      set_usr_crs_name(usr_id, crs_id)
      render json: {crs_name: @crs_name, usr_name: @usr_name, is_self: is_self}, status: :ok
    end
  end

  # GET /fragments/new
  def new
    crystals = Crystal.where(user_id: @current_user.id).select('id, name')
    render json: crystals, status: :ok
  end

  # POST /fragments
  def create
    fragment = Fragment.new(post_params)

    if fragment.save
      response.headers['flash'] = 'ok-crfrg'
      render json: fragment, status: :created
    else
      response.headers['flash'] = 'er-crfrg'
      render json: fragment.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /fragments/1
  def update
    if @fragment.update(patch_params)
      response.headers['flash'] = 'ok-udfrg'
      render json: @fragment, status: :ok
    else
      response.headers['flash'] = 'er-udfrg'
      render json: @fragment.errors, status: :unprocessable_entity
    end
  end

  # DELETE /fragments/1
  def destroy
    if @fragment.destroy
      response.headers['flash'] = 'ok-dlfrg'
      render status: :no_content
    else
      response.headers['flash'] = 'er-dlfrg'
      render status: :internal_server_error
    end
  end

  private

    # Use callbacks to share common setup or constraints between actions.
    def set_fragment
      @fragment = Fragment.find(params[:id])
    end

    # For show action
    def set_usr_crs_name(usr_id, crs_id)
      @usr_name = User.find(usr_id).name
      @crs_name = Crystal.find(crs_id).name
    end

    # Only allow a trusted parameter "white list" through.
    def post_params
      params.require(:fragment).permit(:name, content: {}).merge!(user_id: @current_user.id, crystal_id: params[:crystal_id])
    end

    def patch_params
      params.require(:fragment).permit(:name, :crystal_id, content: {}).merge!(user_id: @current_user.id)
    end
end
