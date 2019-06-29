# frozen_string_literal: true

class ShowcasesController < ApplicationController
  include Auth
  before_action :authenticate_current_user, only: [:create, :show, :update, :destroy]
  before_action :set_showcase, only: [:show, :update, :destroy]
  before_action -> {ensure_owner(@showcase)}, only: [:update, :destroy]

  # GET /showcases
  def index
    showcases = Showcase.latest(20)
    users = showcases.includes_map_user
    render json: {showcases: showcases, users: users}, status: :ok
  end

  # GET /showcases/1
  def show
    usr_id = params[:user_id]

    if usr_id.blank?
      # do this, if comes from URL query or Redirect by delete action
      # do nothing and @crystal = nil, if comes from Link, Redirect except delete action
      # which have already kept showcase data
      set_showcase
      usr_id = @showcase[:user_id]
    end
    is_self = self_bool(usr_id)
    usr_name = User.find_name(usr_id)
    crystals = Crystal.by_showcase_id_latest(params[:id], 20)

    render json: {showcase: @showcase, crystals: crystals, usr_name: usr_name, is_self: is_self}, status: :ok
  end

  # POST /showcases
  def create
    showcase = Showcase.new(showcase_params)

    if showcase.save
      render json: showcase, status: :created
    else
      render json: showcase.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /showcases/1
  def update
    if @showcase.update(showcase_params)
      response.headers['flash'] = 'ok-udshw'
      render json: @showcase, status: :ok
    else
      response.headers['flash'] = 'er-udshw'
      render json: @showcase.errors, status: :unprocessable_entity
    end
  end

  # DELETE /showcases/1
  def destroy
    if @showcase.destroy
      response.headers['flash'] = 'ok-dlshw'
      render status: :no_content
    else
      response.headers['flash'] = 'er-dlshw'
      render status: :internal_server_error
    end
  end

  private

    # Use callbacks to share common setup or constraints between actions.
    def set_showcase
      @showcase = Showcase.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def showcase_params
      params.require(:showcase).permit(:name).merge!(user_id: @current_user.id)
    end
end
