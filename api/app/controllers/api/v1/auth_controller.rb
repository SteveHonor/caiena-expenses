class Api::V1::AuthController < ApplicationController
  skip_before_action :authenticate_user!, only: [:login, :create] 
  

  def login
    user = User.find_by(email: params[:email])

    if user&.valid_password?(params[:password])
      token = Warden::JWTAuth::UserEncoder.new.call(user, :user, nil).first
      
      render json: { token: token, user: user }
    else
      render json: { error: 'Usuário ou Senha Inválido' }, status: :unauthorized
    end
  end

  def logout
    render json: { message: :ok }
  end

  def create
    begin
      user = User.new(user_params)

      if user.save
        render json: {  message: :ok }, status: :created
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end
