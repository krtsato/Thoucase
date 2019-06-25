# frozen_string_literal: true

class FragmentsController < ApplicationController
  include Auth
  before_action :authenticate_user, only: [:new, :create, :show, :update, :destroy]
  before_action :set_fragment, only: [:update, :destroy]
  before_action -> {ensure_owner(@fragment)}, only: [:update, :destroy]

  # GET /fragments
  def index
    fragments = Fragment.latest(20)
    users = fragments.includes_map_user
    render json: {fragments: fragments, users: users}, status: :ok
  end

  # GET /fragments/1
  def show
    usr_id = params[:user_id]
    crs_id = params[:crystal_id]

    if usr_id.blank? || crs_id.blank?
      # do this, if comes from URL query
      # do nothing and @fragment = nil, if comes from Link or Redirect
      # which have already kept fragment data
      set_fragment
      usr_id = @fragment[:user_id]
      crs_id = @fragment[:crystal_id]
    end
    is_self = self_bool(usr_id)
    usr_name = User.find_name(usr_id)
    crs_name = Crystal.find_name(crs_id)

    render json: {fragment: @fragment, crs_name: crs_name, usr_name: usr_name, is_self: is_self}, status: :ok
  end

  # GET /fragments/new
  def new
    crystals = Crystal.by_user_id_select_id_name_latest(@current_user.id, 50)
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

    # Only allow a trusted parameter "white list" through.
    def post_params
      params.require(:fragment).permit(:name, content: {}).merge!(user_id: @current_user.id, crystal_id: params[:crystal_id])
    end

    def patch_params
      params.require(:fragment).permit(:name, :crystal_id, content: {}).merge!(user_id: @current_user.id)
    end
end
