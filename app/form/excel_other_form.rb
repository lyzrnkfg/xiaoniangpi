class ExcelOtherForm
  include ActiveModel::Model

  attr_accessor :row_one
  attr_accessor :row_two


  def initialize(attributes={})
    super(attributes)
  end


end
