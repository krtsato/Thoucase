# frozen_string_literal: true

class FragmentsController < ApplicationController
  before_action :authenticate_user, only: [:new, :create, :update, :destroy]
  before_action :set_fragment, only: [:show, :update, :destroy]

  # GET /fragments
  def index
    fragments = Fragment.all.order(created_at: :desc)
    users = fragments.includes(:user).map(&:user)
    render json: {fragments: fragments, users: users}, status: :ok
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
