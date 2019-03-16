Rails.application.routes.draw do

  # concern
  concern :plus_new_edit do
    get :new, on: :collection
    get :edit, on: :member
  end

  shallow do
    # showcases / crystals
    resources :showcases, concerns: :plus_new_edit do
      resources :crystals, concerns: :plus_new_edit
    end

    # crystals / fragments
    # only : URL重複回避
    resources :crystals, only: [] do
      resources :fragments, concerns: :plus_new_edit
    end
  end
end