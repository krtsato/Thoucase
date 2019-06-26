# frozen_string_literal: true

class ShowcasesController < ApplicationController
  include Auth
  before_action :authenticate_user, only: [:create, :update, :destroy]
  before_action :set_showcase, only: [:show, :update, :destroy]
  before_action -> {ensure_owner(@showcase)}, only: [:update, :destroy]

  # GET /showcases
  def index
    showcases = Showcase.latest(20)
    render json: showcases, status: :ok
  end

  # GET /showcases/1
  def show
    render json: @showcase
  end

  # POST /showcases
  def create
    @showcase = Showcase.new(showcase_params)

    if @showcase.save
      render json: @showcase, status: :created
    else
      render json: @showcase.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /showcases/1
  def update
    if @showcase.update(showcase_params)
      render json: @showcase, status: :ok
    else
      render json: @showcase.errors, status: :unprocessable_entity
    end
  end

  # DELETE /showcases/1
  def destroy
    @showcase.destroy
  end

  private

    # Use callbacks to share common setup or constraints between actions.
    def set_showcase
      @showcase = Showcase.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def showcase_params
      params.require(:showcase).permit(:name, :user_id)
    end
end
