# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path.
# Rails.application.config.assets.paths << Emoji.images_path
# Add Yarn node_modules folder to the asset load path.
Rails.application.config.assets.paths << Rails.root.join('node_modules')

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in the app/assets
# folder are already added.
# Rails.application.config.assets.precompile += %w( admin.js admin.css )
Rails.application.config.assets.precompile += %w( barcode.js )
Rails.application.config.assets.precompile += %w( touch-fancy.css )
Rails.application.config.assets.precompile += %w( dashboard.css )
Rails.application.config.assets.precompile += %w( prototype.js )
Rails.application.config.assets.precompile += %w( touch-fancy.css )
Rails.application.config.assets.precompile += %w( jquery.js )
Rails.application.config.assets.precompile += %w( extra_buttons.css )
Rails.application.config.assets.precompile += %w( jquery_data_table.js )
Rails.application.config.assets.precompile += %w( jquery.dataTables.css )
Rails.application.config.assets.precompile += %w( jquery.table2CSV.min.js )
Rails.application.config.assets.precompile += %w( Highcharts/js/jquery.min.js )
Rails.application.config.assets.precompile += %w( Highcharts/js/highcharts.js )
