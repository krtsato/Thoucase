# frozen_string_literal: true

class CrystalsController < ApplicationController
  before_action :authenticate_user, only: [:create, :show, :update, :destroy]
  before_action :ensure_valid_user, only: [:update, :destroy]
  before_action :set_crystal, only: [:update, :destroy]

  # GET /crystals
  def index
    @crystals = Crystal.all.order(created_at: :desc)

    render json: @crystals
  end

  # GET /crystals/1
  def show
    usr_id = params[:user_id]
    shw_id = params[:showcase_id]
    is_self = @current_user ? @current_user.id == usr_id.to_i : false
    fragments = Fragment.where(crystal_id: params[:id]).order(created_at: :desc)

    if usr_id.blank?
      # from direct URL
      set_crystal()
      set_usr_shw_name(@crystal.user_id, @crystal.showcase_id)
      render json: {crystal: @crystal, fragments: fragments, shw_name: @shw_name, usr_name: @usr_name, is_self: is_self}, status: :ok
    else
      # from Link or Redirect
      set_usr_shw_name(usr_id, shw_id)
      render json: {fragments: fragments, shw_name: @shw_name, usr_name: @usr_name, is_self: is_self}, status: :ok
    end
  end

  # POST /crystals
  def create
    crystal = Crystal.new(crystal_params)

    if crystal.save
      response.headers['flash'] = 'ok-crcrs'
      crystals = Crystal.where(user_id: @current_user.id).select('id, name')
      render json: crystals, status: :created
    else
      response.headers['flash'] = 'er-crcrs'
      render json: crystal.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /crystals/1
  def update
    if @crystal.update(crystal_params)
      render json: @crystal
    else
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

    # For show action
    def set_usr_shw_name(usr_id, shw_id)
      @usr_name = User.find(usr_id).name
      @shw_name = shw_id.present? ? Showcase.find(shw_id).name : nil

    end

    # Only allow a trusted parameter "white list" through.
    def crystal_params
      params.require(:crystal).permit(:name).merge!(user_id: @current_user.id)
      # :showcase_id
    end
end
