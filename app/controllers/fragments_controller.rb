# frozen_string_literal: true

class FragmentsController < ApplicationController
  before_action :set_fragment, only: [:show, :edit, :update, :destroy]

  # GET /fragments
  def index
    respond_to do |format|
      format.html
      format.json {
        @fragments = Fragment.all
        puts("JSON ｷﾏｼﾀﾜ~")
        render json: @fragments
      }
    end
  end

  # GET /fragments/1
  def show
    render json: @fragment
  end

  # GET /fragments
  def new
    @fragment = Fragment.new
  end

  # POST /fragments
  def create
    @fragment = Fragment.new(fragment_params)

    if @fragment.save
      render json: @fragment, status: :created, location: @fragment
    else
      render json: @fragment.errors, status: :unprocessable_entity
    end
  end

  # GET /fragments/1
  def edit; end

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
