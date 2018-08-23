class Patient < ActiveRecord::Base
  before_save :before_save
  before_create :before_create
  self.table_name = "patient"
  self.primary_key ="patient_id"
  include Openmrs

  has_one :person, ->{where(voided: 0)},foreign_key: :person_id
  has_many :patient_identifiers,-> {where(voided: 0)}, foreign_key: :patient_id, dependent: :destroy
  has_many :patient_programs,-> {where(voided:0)}
  has_many :programs, through: :patient_programs
  has_many :relationships,->{where(voided: 0)}, foreign_key: :person_a, dependent: :destroy
  has_many :orders, ->{where(voided:0)}
  #belongs_to :person, ->{where(voided:0)}, foreign_key: :person_id
  has_many :encounters,->{where(voided:0)} do

    def find_by_date(encounter_date)
      encounter_date = Date.today unless encounter_date
      where("encounter_datetime BETWEEN ? AND ?",
        encounter_date.to_date.strftime('%Y-%m-%d 00:00:00'),
        encounter_date.to_date.strftime('%Y-%m-%d 23:59:59')
      ) # Use the SQL DATE function to compare just the date part
    end
  end

  def after_void(reason = nil)
    self.person.void(reason) rescue nil
    self.patient_identifiers.each {|row| row.void(reason) }
    self.patient_programs.each {|row| row.void(reason) }
    self.orders.each {|row| row.void(reason) }
    self.encounters.each {|row| row.void(reason) }
  end

  def self.merge(patient_id, secondary_patient_id)
    patient = Patient.includes([:patient_identifiers, :patient_programs, {:person => [:names]}]).find(patient_id)
    secondary_patient = Patient.includes([:patient_identifiers, :patient_programs, {:person => [:names]}]).find(secondary_patient_id)

    national_ids = PatientIdentifier.where(["patient_id =? AND identifier_type =?", secondary_patient_id,
        PatientIdentifierType.find_by_name('National id').id]).map(&:identifier) rescue []

    old_id = PatientIdentifierType.find_by_name("Old Identification Number").id
    national_id = PatientIdentifierType.find_by_name("National id").id

    unless national_ids.blank?
      ActiveRecord::Base.connection.execute("
          UPDATE patient_identifier SET identifier_type = #{old_id}, patient_id = #{patient_id} WHERE patient_id = #{secondary_patient_id}
          AND identifier_type = #{national_id}")
    end
    
  ActiveRecord::Base.transaction do
    secondary_patient.patient_identifiers.each {|r|
      if patient.patient_identifiers.map(&:identifier).each{| i | i.upcase }.include?(r.identifier.upcase)
        ActiveRecord::Base.connection.execute("
          UPDATE patient_identifier SET voided = 1, date_voided=NOW(),voided_by=#{User.current.user_id},
          void_reason = 'merged with patient #{patient_id}'
          WHERE patient_id = #{secondary_patient_id}
          AND identifier_type = #{r.identifier_type}
          AND identifier = '#{r.identifier}'")
      else
        ActiveRecord::Base.connection.execute <<EOF
UPDATE patient_identifier SET patient_id = #{patient_id}
WHERE patient_id = #{secondary_patient_id}
AND identifier_type = #{r.identifier_type}
AND identifier = "#{r.identifier}"
EOF
      end
    }

    secondary_patient.person.names.each {|r|
      if patient.person.names.map{|pn| "#{pn.given_name.upcase rescue ''} #{pn.family_name.upcase rescue ''}"}.include?("#{r.given_name.upcase rescue ''} #{r.family_name.upcase rescue ''}")
      ActiveRecord::Base.connection.execute("
        UPDATE person_name SET voided = 1, date_voided=NOW(),voided_by=#{User.current.user_id},
        void_reason = 'merged with patient #{patient_id}'
        WHERE person_id = #{secondary_patient_id}
        AND person_name_id = #{r.person_name_id}")
      end
    }

    secondary_patient.person.addresses.each {|r|
      if patient.person.addresses.map{|pa| "#{pa.city_village.upcase rescue ''}"}.include?("#{r.city_village.upcase rescue ''}")
      ActiveRecord::Base.connection.execute("
        UPDATE person_address SET voided = 1, date_voided=NOW(),voided_by=#{User.current.user_id},
        void_reason = 'merged with patient #{patient_id}'
        WHERE person_id = #{secondary_patient_id}")
      else
        ActiveRecord::Base.connection.execute <<EOF
UPDATE person_address SET person_id = #{patient_id}
WHERE person_id = #{secondary_patient_id}
AND person_address_id = #{r.person_address_id}
EOF
      end
    }

    secondary_patient.patient_programs.each {|r|
      if patient.patient_programs.map(&:program_id).include?(r.program_id)
      ActiveRecord::Base.connection.execute("
        UPDATE patient_program SET voided = 1, date_voided=NOW(),voided_by=#{User.current.user_id},
        void_reason = 'merged with patient #{patient_id}'
        WHERE patient_id = #{secondary_patient_id}
        AND patient_program_id = #{r.patient_program_id}")
      else
        ActiveRecord::Base.connection.execute <<EOF
UPDATE patient_program SET patient_id = #{patient_id}
WHERE patient_id = #{secondary_patient_id}
AND patient_program_id = #{r.patient_program_id}
EOF
      end
    }

    ActiveRecord::Base.connection.execute("
        UPDATE patient SET voided = 1, date_voided=NOW(),voided_by=#{User.current.user_id},
        void_reason = 'merged with patient #{patient_id}'
        WHERE patient_id = #{secondary_patient_id}")

    ActiveRecord::Base.connection.execute("UPDATE person_attribute SET person_id = #{patient_id} WHERE person_id = #{secondary_patient_id}")
    ActiveRecord::Base.connection.execute("UPDATE person_address SET person_id = #{patient_id} WHERE person_id = #{secondary_patient_id}")
    ActiveRecord::Base.connection.execute("UPDATE encounter SET patient_id = #{patient_id} WHERE patient_id = #{secondary_patient_id}")
    ActiveRecord::Base.connection.execute("UPDATE obs SET person_id = #{patient_id} WHERE person_id = #{secondary_patient_id}")
    ActiveRecord::Base.connection.execute("UPDATE note SET patient_id = #{patient_id} WHERE patient_id = #{secondary_patient_id}")
    #ActiveRecord::Base.connection.execute("UPDATE person SET person_id = #{patient_id} WHERE person_id = #{secondary_patient_id}")
  end
end

end
