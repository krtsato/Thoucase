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
  get 'fragments', to: 'fragments#index'

  # new
  get 'fragments/new', to: 'fragments#new'

  # showcases
  resources :showcases

  # crystals / fragments
  resources :crystals do
    resources :fragments, shallow: true, except: :index
  end
end
