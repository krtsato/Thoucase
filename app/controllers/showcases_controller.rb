# frozen_string_literal: true

class ShowcasesController < ApplicationController
  before_action :set_showcase, only: [:show, :edit, :update, :destroy]

  # GET /showcases
  def index
    @showcases = Showcase.all

    render json: @showcases
  end

  # GET /showcases/1
  def show
    render json: @showcase
  end

  # GET /fragments
  def new
    @showcase = Showcase.new
  end

  # POST /showcases
  def create
    @showcase = Showcase.new(showcase_params)

    if @showcase.save
      render json: @showcase, status: :created, location: @showcase
    else
      render json: @showcase.errors, status: :unprocessable_entity
    end
  end

  # GET /fragments/1
  def edit; end

  # PATCH/PUT /showcases/1
  def update
    if @showcase.update(showcase_params)
      render json: @showcase
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
