Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
 devise_for :users
 #get '/location', controller: :sessions, action: :location
 get '/location', to: "sessions#location"
 get '/user/programs/:id', to: 'user#programs'
 get '/programs/status/:id', to: 'programs#status'
 get  '/admin', controller: 'admin', action: 'index'
 get  '/login', controller: 'sessions', action: 'new'
 post '/logout', controller:  'sessions', action:  'destroy'
 get  '/clinic', controller: 'clinic', action: 'index'
 get '/encounters/new/:encounter_type', controller:  'encounters', action: 'new'
 post '/encounters/new/:encounter_type', controller:  'encounters', action: 'new'
 get '/encounters/new/:encounter_type/:id', controller: 'encounters', action: 'new'
 post '/encounters/new/:encounter_type/:id', controller: 'encounters', action: 'new'
 get '/:controller/:action/:id'
 get '/:controller/:action'
 post '/:controller/:action'
 get '/logout', controller: 'sessions', action: 'destroy'
 get '/render_date_enrolled_in_art', controller: 'patients', action: 'render_date_enrolled_in_art'
 post '/:controller/:action/:id'
 get '/malaria_dashboard',  controller: 'clinic', action: 'malaria_dashboard'
 get '/:controller/:action/:id'
 get '/:controller/:action'
 post '/:controller/:action'
 resources :dispensations, collection: {quantities: :get, dispense_non_prescribed_drugs: :get, change_amount_dispensed: :get}
 resources :barcodes, collection: {label: :get}
 resources :relationships, collection: {search: :get}
 resources :programs, collection: {locations: :get, workflows: :get, states: :get}
 resources :encounter_types
 resource :session
 root "people#index"
end
