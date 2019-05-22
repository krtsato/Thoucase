# frozen_string_literal: true

class FragmentsController < ApplicationController
  before_action :authenticate_user, only: [:new, :create, :update, :destroy]
  before_action :set_fragment, only: [:show, :update, :destroy]

  # GET /fragments
  def index
    fragments = Fragment.all

    render json: fragments, status: :ok
  end

  # GET /fragments/1
  def show
    render json: @fragment
  end

  # GET /fragments/new
  def new
    crystals = Crystal.where(user_id: @current_user.id).select('id, name')
    render json: crystals, status: :ok
  end

  # POST /fragments
  def create
    fragment = Fragment.new(fragment_params, user_id: @current_user.id)

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
      params.require(:fragment).permit(:name, :content, :crystal_id)
    end
end
