# frozen_string_literal: true

class CrystalsController < ApplicationController
  before_action :set_crystal, only: [:show, :update, :destroy]
  before_action :authenticate_user, only: [:create, :show, :update, :destroy]

  # GET /crystals
  def index
    @crystals = Crystal.all.order(created_at: :desc)

    render json: @crystals
  end

  # GET /crystals/1
  def show
    render json: @crystal
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
    @crystal.destroy
  end

  private

    # Use callbacks to share common setup or constraints between actions.
    def set_crystal
      @crystal = Crystal.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def crystal_params
      params.require(:crystal).permit(:name).merge!(user_id: @current_user.id)
      # :showcase_id
    end
end
