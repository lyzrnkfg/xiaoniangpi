class ExcelForm
  include ActiveModel::Model

  attr_accessor :column_one
  attr_accessor :column_two


  def initialize(column_one, column_two)
    @column_one = column_one
    @column_two = column_two
  end


end
