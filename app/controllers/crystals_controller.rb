# frozen_string_literal: true

class CrystalsController < ApplicationController
  include Auth
  include ShowcaseOrNil
  before_action :authenticate_current_user, only: [:create, :show, :edit, :update, :destroy]
  before_action :set_crystal, only: [:update, :destroy]
  before_action -> {ensure_owner(@crystal)}, only: [:update, :destroy]

  # GET /crystals
  def index
    crystals = Crystal.latest(20)
    users = crystals.includes_map_user
    render json: {crystals: crystals, users: users}, status: :ok
  end

  # GET /crystals/1
  def show
    usr_id = params[:user_id]
    shw_id = params[:showcase_id]

    if usr_id.blank?
      # do this, if comes from URL query or Redirect by delete action
      # do nothing and @crystal = nil, if comes from Link, Redirect except delete action
      # which have already kept crystal data
      set_crystal
      usr_id = @crystal[:user_id]
      shw_id = @crystal[:showcase_id]
    end
    is_self = self_bool(usr_id)
    usr_name = User.find_name(usr_id)
    shw_name = showcase_name_or_nil(shw_id)
    fragments = Fragment.by_crystal_id_latest(params[:id], 20)

    render json: {crystal: @crystal, fragments: fragments, shw_name: shw_name, usr_name: usr_name, is_self: is_self}, status: :ok
  end

  # POST /crystals
  def create
    crystal = Crystal.new(crystal_params)

    if crystal.save
      response.headers['flash'] = 'ok-crcrs'
      crystals = Crystal.by_user_id_select_id_name_latest(@current_user.id, 50)
      render json: crystals, status: :created
    else
      response.headers['flash'] = 'er-crcrs'
      render json: crystal.errors, status: :unprocessable_entity
    end
  end

  # GET /fragments/new
  def edit
    showcases = Showcase.by_user_id_select_id_name_latest(@current_user.id, 50)
    render json: showcases, status: :ok
  end

  # PATCH/PUT /crystals/1
  def update
    if @crystal.update(crystal_params)
      response.headers['flash'] = 'ok-udcrs'
      render json: @crystal, status: :ok
    else
      response.headers['flash'] = 'er-udcrs'
      render json: @crystal.errors, status: :unprocessable_entity
    end
  end

  # DELETE /crystals/1
  def destroy
    if @crystal.destroy
      response.headers['flash'] = 'ok-dlcrs'
      render status: :no_content
    else
      response.headers['flash'] = 'er-dlcrs'
      render status: :internal_server_error
    end
  end

  private

    # Use callbacks to share common setup or constraints between actions.
    def set_crystal
      @crystal = Crystal.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def crystal_params
      params.require(:crystal).permit(:name, :showcase_id).merge!(user_id: @current_user.id)
    end
end
