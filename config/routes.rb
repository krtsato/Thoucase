Rails.application.routes.draw do
  # showcases / crystals
  resources :showcases do
    resources :crystals, shallow: true
  end
  
  # crystals / fragments
  resources :crystals do
    resources :fragments, shallow: true
  end
end
