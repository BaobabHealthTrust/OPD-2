class TraditionalAuthority < ActiveRecord::Base
  self.table_name = "traditional_authority"
  self.primary_key = "traditional_authority_id"

	belongs_to :district, optional: true

end
