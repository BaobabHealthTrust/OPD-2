class Privilege < ActiveRecord::Base
  self.table_name = "privilege"
  self.primary_key = "privilege"
  include Openmrs

  has_many :role_privileges, foreign_key: :privilege, dependent: :delete_all # no default scope
  has_many :roles, through: :role_priviles # no default scope

  # NOT USES
  def self.create_privileges_and_attach_to_roles
    Privilege.all.each{|p|puts "Destroying #{p.privilege}";p.destroy}
    tasks = EncounterType.all.collect{|e|e.name}
    tasks.delete("Barcode scan")
    tasks << "Enter past visit"
    tasks << "View reports"

    tasks.each{|task|
      puts "Adding task: #{task}"
      p = Privilege.new
      p.privilege = task
      p.save
      Role.all.each{|role|
        rp = RolePrivilege.new
        rp.role = role
        rp.privilege = p
        rp.save
      }
    }
  end

end


### Original SQL Definition for privilege ####
#   `privilege` varchar(50) NOT NULL default '',
#   `description` varchar(250) NOT NULL default '',
#   PRIMARY KEY  (`privilege_id`)
