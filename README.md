1. Install ruby version 2.5.0 and mysql on your ubuntu machine

2. Clone the application by running the following command;
   
    * git clone https://github.com/BaobabHealthTrust/OPD-2

3. cd into the application and create configuratin files as follows; 
   
4. Run 'gem install bundler'

5  Run 'bundle install'

6. Copy configuration files as follows;

   * cp config/database.yml.example config/database.yml cp config/application.yml.example config/application.yml cp config/dashboard.yml.example config/dashboard.yml

7. Edit config/database.yml file to have correct mysql database settings

8. On the root of the application run './bin/initial_database_setup.sh [environment] mpc'
   =======================================================================================================
   NB: Please run the command in step8 only if there is no existing openmrs database. 
       Otherwise the above command can be catastrophic by dropping your openmrs database.

       When you have an existing openmrs database just load eidr concepts as follows; 
         * mysql [username] [password] [database] < db/eidsr_concepts_with_symptom_syndrome_sets.sql
  =========================================================================================================

9 Run user activation script 'rails r bin/load_user_activation_table.rb'

10. Run the application with passenger

