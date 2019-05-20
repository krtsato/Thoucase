# frozen_string_literal: true

class FragmentsController < ApplicationController
  before_action :authenticate_user, only: [:create, :update, :destroy]
  before_action :set_fragment, only: [:show, :update, :destroy]

  # GET /fragments
  def index
    fragments = Fragment.all

    render json: fragments
  end

  # GET /fragments/1
  def show
    render json: @fragment
  end

  # POST /fragments
  def create
    @fragment = Fragment.new(fragment_params)

    if @fragment.save
      render json: @fragment, status: 201, location: @fragment
    else
      render json: @fragment.errors, status: 422
    end
  end

  # PATCH/PUT /fragments/1
  def update
    if @fragment.update(fragment_params)
      render json: @fragment
    else
      render json: @fragment.errors, status: :unprocessable_entity
    end
  end

  # DELETE /fragments/1
  def destroy
    @fragment.destroy
  end

  private

    # Use callbacks to share common setup or constraints between actions.
    def set_fragment
      @fragment = Fragment.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def fragment_params
      params.require(:fragment).permit(:name, :content, :user_id, :crystal_id)
    end
end
