drugs_given_encounter_type = EncounterType.find_by_name("DRUGS GIVEN")
drugs_given_encounters = Encounter.where(["encounter_type =? AND DATE(encounter_datetime) >= ?",
                                          drugs_given_encounter_type.encounter_type_id, "01-01-2019".to_date])
User.current = User.first
Location.current_location = Location.current_health_center
# LA1 = 236  6 tabs
# LA2 = 237  12 tabs
# LA3 = 238  18 tabs
# LA4 = 239  24 tabs
la_drug_ids = ["236", "237", "238", "239"]
drugs_given_concept_name = Concept.find_by_name("GIVEN DRUGS").concept_id
provider = 1
puts "Total drugs given encounters: #{drugs_given_encounters.count}"
data = []
drugs_given_encounters.each do |drugs_given_encounter|
  drugs_given_observations = drugs_given_encounter.observations.where(["concept_id =? AND value_drug IN (?)",
                                                                       drugs_given_concept_name, la_drug_ids])
  next if drugs_given_observations.blank?
  type = EncounterType.find_by_name("TREATMENT")
  patient = drugs_given_encounter.patient
  date = drugs_given_encounter.encounter_datetime
  encounter = patient.encounters.where(["encounter_datetime BETWEEN ? AND ? AND encounter_type = ?",
                                        date.to_date.strftime('%Y-%m-%d 00:00:00'),
                                        date.to_date.strftime('%Y-%m-%d 23:59:59'),
                                        type.id]).first

  start_date = date

  puts "Processing #{drugs_given_observations.count} observations"
  if encounter.blank?
    encounter = patient.encounters.create(:encounter_type => type.id, :encounter_datetime => date, :provider_id => provider)
  end

  drugs_given_observations.each do |observation|
    value_drug = observation.value_drug
    drug = Drug.find(value_drug)
    units = drug.units
    dose = drug.dose_strength.to_f

    value_numeric = observation.value_numeric.to_f
    if value_numeric == 0
      value_numeric = 6 if value_drug.to_i == 236
      value_numeric = 12 if value_drug.to_i == 237
      value_numeric = 18 if value_drug.to_i == 238
      value_numeric = 24 if value_drug.to_i == 239
    end

    auto_expire_date = start_date + (value_numeric / dose).to_i.days
    duration = (auto_expire_date.to_date - start_date.to_date).to_i
    frequency = "BD"
    instructions = "#{drug.name}: #{dose} #{units} #{frequency} for #{duration} days"
    prn = 0

    equivalent_daily_dose = 2 * dose

    puts "Creating an order of #{drug.name} - units = #{units} - total amount = #{value_numeric} duration = #{duration}"

    #ActiveRecord::Base.transaction do
    order = encounter.orders.create(
        :order_type_id => 1,
        :concept_id => drug.concept_id,
        :orderer => provider,
        :patient_id => patient.id,
        :start_date => start_date,
        :auto_expire_date => auto_expire_date,
        :instructions => instructions
    )

    drug_order = DrugOrder.create(
        :drug_inventory_id => drug.id,
        :dose => dose,
        :frequency => frequency,
        :prn => prn,
        :units => units,
        :equivalent_daily_dose => equivalent_daily_dose,
        :order_id => order.id
    )

    #end
    puts "Created drug_order #{drug_order.id}"
    data << [patient.patient_id, encounter.encounter_datetime.to_s]
  end
end
