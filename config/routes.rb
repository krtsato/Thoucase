Rails.application.routes.draw do
  # concern
  concern :plus_new_edit do
    get 'new', on: :collection
    get 'edit', on: :member
  end

  # home
  get '/', to: 'home#top'
  get 'about', to: 'home#about'

  # users
  get 'login', to: 'users#login_form'
  post 'login', to: 'users#login'
  post 'logout', to: 'users#logout'
  resources :users, concerns: :plus_new_edit

  # likes
  post 'likes/:fragment_id', to: 'likes#create'
  delete 'likes/:fragment_id', to: 'likes#destroy'

  # index
  get 'showcases/index', to: 'showcases#index'
  get 'crystals/index', to: 'crystals#index'
  get 'fragments/index', to: 'fragments#index'

  shallow do
    # showcases/ crystals
    resources :showcases, concerns: :plus_new_edit, except: :index do
      resources :crystals, concerns: :plus_new_edit, except: :index
    end

    # crystals / fragments
    # only : URL重複回避
    resources :crystals, only: [] do
      resources :fragments, concerns: :plus_new_edit, except: :index
    end
  end
end