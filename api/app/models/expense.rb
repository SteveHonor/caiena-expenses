class Expense < ApplicationRecord
  belongs_to :user

  has_many :expense_tags, dependent: :destroy
  has_many :tags, through: :expense_tags

  has_one_attached :receipt_image
  has_one_attached :ticket_image

  validates :receipt_image, presence: true, content_type: ['image/png', 'image/jpeg']
  validates :ticket_image, presence: true, content_type: ['image/png', 'image/jpeg']

  validates :amount, :description, :date, presence: true
end
