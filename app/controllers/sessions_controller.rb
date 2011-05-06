class SessionsController < ApplicationController
  def create
    if user = User.authenticate(params[:email], params[:password])
      session[:user_id] = user.id
      redirect_to "/", :notice => "Logged in successfully"
    else
      flash.now[:alert] = "Invalid login/password combination"
      render :action => 'new'
    end
  end
  
  def destroy
    remove_user
    reset_session
    redirect_to "/", :notice => "You successfully logged out"
  end

end