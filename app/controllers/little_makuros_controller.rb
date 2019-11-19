class LittleMakurosController < ApplicationController

  def index

  end

  def excel_upload
    begin
      if params[:upFile].blank?
        flash.now[:error] = "点击show按钮选择excel文件"
      elsif [".xlsx",".xls",".xlsm"].include? File.extname(params[:upFile].original_filename)
        @excel_result, @error_line = Excel.makuro_upload(params[:upFile])
      else
        flash.now[:error] = "目前只开发excel后缀文件敬请期待...."
      end
    rescue => e
      flash.now[:error] = e.message
    end
    render "index"
  end

end
