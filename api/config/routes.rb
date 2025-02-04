Rails.application.routes.draw do
  devise_for :users

  namespace :api do
    namespace :v1 do
      post '/login', to: 'auth#login'
      post '/register', to: 'auth#create'

      resources :refunds
      resources :expenses, only: [:index, :create]
      resources :tags, only: [:index]
    end
  end
end
