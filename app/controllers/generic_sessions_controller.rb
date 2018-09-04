class GenericSessionsController < ApplicationController
	skip_before_action :authenticate_user!, :except => [:location, :update]
	skip_before_action :location_required


end
