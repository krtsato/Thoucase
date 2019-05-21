# frozen_string_literal: true

class LikesController < ApplicationController
  before_action :set_fragment, only: [:create, :destroy]

  # POST /likes/1(:fragment_id)
  def create
    # @like = Like.new(user_id: @current_user.id, fragment_id: @fragment.id)
    # redirect_to("/crystals/#{@crystal.id}/fragmets/#{@fragment.id}")
    # if @like.save
    # render json: @like, status: :created, location: @like
    # else
    # render json: @like.errors, status: :unprocessable_entity
    # end
  end

  # DELETE /likes/1(:fragment_id)
  def destroy
    # @like = Like.find_by(user_id: @current_user.id, fragment_id: @fragment.id)
    # @like.destroy
    # redirect_to("/crystals/#{@crystal.id}/fragments/#{@fragment.id}")
  end

  private

    # Use callbacks to share common setup or constraints between actions.
    def set_fragment
      @fragment = Fragment.find(params[:fragment_id])
    end

    # Only allow a trusted parameter "white list" through.
    def like_params
      params.require(:like).permit(:user_id, :fragment_id)
    end
end
