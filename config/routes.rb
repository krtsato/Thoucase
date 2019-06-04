Rails.application.routes.draw do
  # home
  root to: 'home#root'

  # likes
  post 'likes/:fragment_id', to: 'likes#create'
  delete 'likes/:fragment_id', to: 'likes#destroy'

  # users
  post 'signin', to: 'users#signin'
  post 'signout', to: 'users#signout'
  resources :users

  # index
  get 'crystals', to: 'crystals#index'
  get 'fragments', to: 'fragments#index'

  # new
  get 'fragments/new', to: 'fragments#new'

  shallow do
    # showcases / crystals
    resources :showcases do
      resources :crystals, except: :index
    end

    # crystals / fragments
    # only : URL重複回避
    resources :crystals, only: [] do
      resources :fragments, except: :index
    end
  end
end
