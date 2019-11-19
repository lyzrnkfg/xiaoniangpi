class LittleExcelsController < ApplicationController

  def index

  end

  def excel_upload
    begin
      if params[:upFile].blank?
        flash.now[:error] = "点击show按钮选择excel文件"
      elsif File.extname(params[:upFile].original_filename) == ".xlsx"
        @excel_result = Excel.excel_upload(params[:upFile])
      else
        flash.now[:error] = "目前只开发xlsx后缀文件敬请期待...."
      end
    rescue => e
      flash.now[:error] = e.message
    end
    render "index"
  end

  def excel_download
    begin
      Axlsx::Package.new do |p|
        p.workbook.add_worksheet(name: "text") do |sheet|
          styles = p.workbook.styles
          title = styles.add_style(bg_color: 'c0c0c0', b: true)
          header = styles.add_style(bg_color: 'e0e0e0', b: true)

          sheet.add_row ["1", "1"], style: title
          sheet.add_row %w(2 1), style: header
          sheet.add_row %w(3 6), style: header
          sheet.add_row %w(1 7), style: header
          sheet.add_row ["", "8"], style: header
          sheet.add_row ["", "2"], style: header
          sheet.add_row ["", "3"], style: header
          sheet.add_row ["4", "2"], style: header
          sheet.add_row ["6", "2"], style: header
          sheet.add_row ["", "2"], style: header
          sheet.add_row ["", "2"], style: header
          file_name = "text" + "#{Time.now.to_s(:datetime)}.xlsx"
          send_data(p.to_stream.read,
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    filename: file_name.encode(Encoding.find('CP932')))
        end
      end
    rescue => e
      flash[:error] = e.message
      redirect_to little_excels_path, flash: {error: "e.message"}
    end
  end

end
