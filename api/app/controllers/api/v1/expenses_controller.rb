class Api::V1::ExpensesController < ApplicationController
  before_action :authenticate_user!

  def index
    @expenses = Expense.all.order(id: :desc)

    expenses_with_images = @expenses.map do |expense|
      expense_attributes = expense.attributes
      expense_attributes['receipt_image_url'] = rails_blob_path(expense.receipt_image, only_path: true) if expense.receipt_image.attached?
      expense_attributes['ticket_image_url'] = rails_blob_path(expense.ticket_image, only_path: true) if expense.ticket_image.attached?
      expense_attributes['tags'] = expense.tags.map { |tag| tag.name }

      expense_attributes
    end

    render json: expenses_with_images
  end

  def create
    expense = current_user.expenses.create(expense_params)

    if params[:expense][:tags].present?
      tags = params[:expense][:tags].split(',').map(&:strip).uniq
      tags.each do |tag_name|
        tag = Tag.find_or_create_by(name: tag_name)
        expense.tags << tag
      end
    end
    
    if expense.save
      render json: expense, status: :created
    else
      render json: expense.errors, status: :unprocessable_entity
    end
  end

  def show
    expense = current_user.expenses.find(params[:id])
    render json: expense
  end

  private

  def expense_params
    params.require(:expense).permit(:amount, :description, :date, :receipt_image, :ticket_image)
  end
end