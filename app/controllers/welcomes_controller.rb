class WelcomesController < ApplicationController

  layout "application_backround"

  def index
    @flg = params[:back]
=begin
    flash[:info] = "info"
    flash[:success] = "success"
    flash[:warning] = "warning"
    flash[:error] = "error"
=end
  end

  def markdown

  end

end
