Rails.application.routes.draw do
  # home
  root to: 'home#root'

  # likes
  post 'likes/:fragment_id', to: 'likes#create'
  delete 'likes/:fragment_id', to: 'likes#destroy'

  # users
  resources :users
  post 'signin', to: 'users#signin'
  post 'signout', to: 'users#signout'

  # showcases
  resources :showcases

  # fragment index, new
  get 'fragments', to: 'fragments#index'
  get 'fragments/new', to: 'fragments#new'

  # crystals / fragments
  resources :crystals do
    get 'edit', on: :collection
    resources :fragments, shallow: true, except: :index
  end
end
