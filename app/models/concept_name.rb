class ConceptName < ActiveRecord::Base
  self.table_name = "concept_name"
  self.primary_key = "concept_name_id"

  has_many :concept_name_tag_maps # no default scope
  has_many :tags, :through => :concept_name_tag_maps, :class_name => 'ConceptNameTag'
  belongs_to :concept, -> { where retired: 0 }, optional: true

  scope :tagged, ->(tags) {tags.blank? ? {} :  joins(:tags).where('concept_name_tag.tag IN (?)', Array(tags)) }
  scope :typed, ->(tags) {tags.blank? ? {} :  where('concept_name_type IN (?)', Array(tags)) }

  default_scope {joins(:concept).where("concept_name.voided = 0 AND concept.retired = 0 AND concept_name.name != ''")}

	#TODO Need
  # This method gets the collection of all short forms of frequencies as used into make this method a lot more generic
  # the Diabetes Module and returns only no-empty values or an empty array if none
  # exist
  def self.drug_frequency
    self.find_by_sql("SELECT name FROM concept_name WHERE concept_id IN \
                        (SELECT answer_concept FROM concept_answer c WHERE \
                        concept_id = (SELECT concept_id FROM concept_name \
                        WHERE name = 'DRUG FREQUENCY CODED')) AND concept_name_id \
                        IN (SELECT concept_name_id FROM concept_name_tag_map \
                        WHERE concept_name_tag_id = (SELECT concept_name_tag_id \
                        FROM concept_name_tag WHERE tag = 'preferred_dmht'))").collect {|freq|
                            freq.name rescue nil
                        }.compact rescue []
  end

end

