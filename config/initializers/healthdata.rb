HEALTHDATA_DB = YAML::load(ERB.new(File.read(Rails.root.join("config","database.yml"))).result)["healthdata"]
