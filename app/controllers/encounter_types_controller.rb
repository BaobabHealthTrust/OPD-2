class EncounterTypesController < GenericEncounterTypesController

  def index
  #raise current_user_roles.to_yaml
    @patient = Patient.find(params[:patient_id])
    role_privileges = RolePrivilege.where(["role IN (?)", current_user_roles])
    privileges = role_privileges.each.map{ |role_privilege_pair| role_privilege_pair["privilege"].humanize }

    @show_tasks_button = CoreService.get_global_property_value('show.tasks.button').to_s == "true" rescue false

    if @show_tasks_button
      @encounter_privilege_map = CoreService.get_global_property_value("encounter_privilege_map").to_s rescue ''
    else
      @encounter_privilege_map = CoreService.get_global_property_value("outcome_privilege_map").to_s rescue ''
    end

    @encounter_privilege_map = @encounter_privilege_map.split(",")
    @encounter_privilege_hash = {}

    @encounter_privilege_map.each do |encounter_privilege|
        @encounter_privilege_hash[encounter_privilege.split(":").last.squish.humanize] = encounter_privilege.split(":").first.squish.humanize
    end

    roles_for_the_user = []

    privileges.each do |privilege|
      roles_for_the_user  << @encounter_privilege_hash[privilege] if !@encounter_privilege_hash[privilege].nil?
    end
    roles_for_the_user = roles_for_the_user.uniq

    # TODO add clever sorting
    @encounter_types = EncounterType.all.map{|enc|enc.name.gsub(/.*\//,"").gsub(/\..*/,"").humanize}
    @available_encounter_types = Dir.glob(Rails.root.to_s+"/app/views/encounters/*.erb").map{|file|file.gsub(/.*\//,"").gsub(/\..*/,"").humanize}
    @available_encounter_types -= @available_encounter_types - @encounter_types

    @available_encounter_types = ((@available_encounter_types) - ((@available_encounter_types - roles_for_the_user) + (roles_for_the_user - @available_encounter_types)))
    @available_encounter_types << "Referral"
    @available_encounter_types = @available_encounter_types.sort

  end

  def show
  redirect_to "/encounters/new/#{params["encounter_type"].downcase.gsub(/ /,"_")}?#{params.permit!.to_param}" and return
  end

end
