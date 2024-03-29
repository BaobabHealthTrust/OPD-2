require 'digest/sha1'
require 'digest/sha2'

class RawUser < ActiveRecord::Base
  self.table_name = "users"
  self.primary_key = "user_id"
  include Openmrs

  before_save :set_password, :before_create

  cattr_accessor :current_user
  attr_accessor :plain_password

  belongs_to :person, ->{where(voided:0)}, foreign_key: :person_id, optional: true
  has_many :user_properties,foreign_key: :user_id # no default scope
  has_many :user_roles, foreign_key: :user_id, dependent: :delete_all # no default scope
  #has_many :names, :class_name => 'PersonName', :foreign_key => :person_id, :dependent => :destroy, :order => 'person_name.preferred DESC', :conditions => {:voided =>  0}


   has_one :activities_property, ->{where(voided:0)}, class_name: 'UserProperty',foreign_key: :user_id


  def first_name
    self.person.names.first.given_name rescue ''
  end

  def last_name
    self.person.names.first.family_name rescue ''
  end

  def name
    name = self.person.names.first
    "#{name.given_name} #{name.family_name}"
  end

  def try_to_login
    User.authenticate(self.username,self.password)
  end

  def set_password
    # We expect that the default OpenMRS interface is used to create users
    self.password = encrypt(self.plain_password, self.salt) if self.plain_password
  end

  def self.authenticate(login, password)
    u = where(username: login).first
    u && u.authenticated?(password) ? u : nil
  end

  def authenticated?(plain)
    encrypt(plain, salt) == password || Digest::SHA1.hexdigest("#{plain}#{salt}") == password || Digest::SHA512.hexdigest("#{plain}#{salt}") == password
  end

  def admin?
    admin = user_roles.map{|user_role| user_role.role }.include? 'Informatics Manager'
    admin = user_roles.map{|user_role| user_role.role }.include? 'System Developer' unless admin
    admin = user_roles.map{|user_role| user_role.role }.include? 'Superuser' unless admin
    admin
  end

  # Encrypts plain data with the salt.
  # Digest::SHA1.hexdigest("#{plain}#{salt}") would be equivalent to
  # MySQL SHA1 method, however OpenMRS uses a custom hex encoding which drops
  # Leading zeroes
  def encrypt(plain, salt)
    encoding = ""
    digest = Digest::SHA1.digest("#{plain}#{salt}")
    (0..digest.size-1).each{|i| encoding << digest[i] }
    encoding
  end

   def before_create
    super
    self.salt = User.random_string(10) if !self.salt?
    self.password = User.encrypt(self.password,self.salt)
  end

   def self.random_string(len)
    #generat a random password consisting of strings and digits
    chars = ("a".."z").to_a + ("A".."Z").to_a + ("0".."9").to_a
    newpass = ""
    1.upto(len) { |i| newpass << chars[rand(chars.size-1)] }
    return newpass
  end

  def self.encrypt(password,salt)
    Digest::SHA1.hexdigest(password+salt)
  end

  def activities
    a = activities_property
    return [] unless a
    a.property_value.split(',')
  end

  # Should we eventually check that they cannot assign an activity they don't
  # have a corresponding privilege for?
  def activities=(arr)
    prop = activities_property || UserProperty.new
    prop.property = 'Activities'
    prop.property_value = arr.join(',')
    prop.user_id = self.id
    prop.save
  end

end
