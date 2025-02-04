class Tag < ApplicationRecord
  has_many :expense_tags, dependent: :destroy
  has_many :expenses, through: :expense_tags
end
