class Concept < ActiveRecord::Base
  self.table_name = "concept"
  self.primary_key = "concept_id"

  #include Openmrs

  belongs_to :concept_class, -> { where retired: 0 }, optional: true
  belongs_to :concept_datatype, -> { where retired: 0 }, optional: true
  has_one :concept_numeric, :foreign_key => :concept_id, :dependent => :destroy
  #has_one :name, :class_name => 'ConceptName'
  has_many :answer_concept_names, -> { where voided: 0 }, :class_name => 'ConceptName'
  has_many :concept_names, -> { where voided: 0 }
  has_many :concept_maps # no default scope
  has_many :concept_sets  # no default scope
  has_many :concept_answers do # no default scope
    def limit(search_string)
      return self if search_string.blank?
      map{|concept_answer|
        concept_answer if concept_answer.name.match(search_string)
      }.compact
    end
  end

  has_many :drugs#, :conditions => {:retired => 0}
  has_many :concept_members, :class_name => 'ConceptSet', :foreign_key => :concept_set

  def self.find_by_name(concept_name)
    Concept.joins(:concept_names).where(["concept_name.name =?", "#{concept_name}"]).first
  end

  def shortname
    name = self.concept_names.typed('SHORT').first.name rescue nil
    return name unless name.blank?
    return self.concept_names.first.name rescue nil
  end

  def fullname
    name = self.concept_names.typed('FULLY_SPECIFIED').first.name rescue nil
    return name unless name.blank?
    return self.concept_names.first.name rescue nil
  end

end
