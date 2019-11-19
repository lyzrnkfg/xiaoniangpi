Rails.application.routes.draw do

  resources :events do
    collection do
      get :preview
    end
  end

  resources :little_excels do
    collection do
      get :excel_download
      post :excel_download
      get :excel_upload
      post :excel_upload
    end
  end

  resources :little_makuros do
    collection do
      get :excel_upload
      post :excel_upload
    end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root :to => 'welcomes#index'

  get 'markdown', to: 'welcomes#markdown', as: 'markdown'

end
