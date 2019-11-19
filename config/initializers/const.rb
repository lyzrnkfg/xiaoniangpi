class Const < Settingslogic
  source "#{Rails.root}/config/constants.yml"
  namespace Rails.env
  
  # 配下のエントリーをOpenStructのインスタンスの配列で返却する
  # OpenStructのインスタンスなら、プロパティアクセスが可能となる
  #
  # 例）
  # Const.GENDER.entries
  #  => [#<OpenStruct id="M", name="男", order="1">,
  #      #<OpenStruct id="F", name="女", order="2">,
  #      #<OpenStruct id="U", name="不明", order="3">]
  # Const.GENDER.entries.each do |e| p e.name end
  #  => 
  #  "男"
  #  "女"
  #  "不明"
  #
  def entries
    result = []
    self.each do |key, val|
      result << OpenStruct.new(val)
    end
    result
  end

  #
  # idの値が引数idと一致するエントリを返却する
  # 簡易メソッド
  #
  # 例）
  # Const.GENDER.find('M')
  #  => {"id"=>"M", "name"=>"男", "order"=>1}
  #
  def find(id)
    find_by(:id, id) 
  end

  #
  # 引数keyの値が引数valueと一致するエントリを返却する
  #
  # 例）
  # Const.GENDER.find_by(:id, 'M')
  #  => {"id"=>"M", "name"=>"男", "order"=>1}
  #
  # Const.GENDER.find_by(:order, 3)
  #  => {"id"=>"U", "name"=>"不明", "order"=>3}
  #
  def find_by(key, value)
    self.each_value do |entry|
      return OpenStruct.new(entry) if entry[key.to_s] == value
    end
    nil
  end

  #
  # idの値が一致するエントリの、key='name'における値を返却する
  # 簡易メソッド
  #
  # 例）
  # Const.GENDER.get('F')
  #  => "女"
  #
  def get(id)
    get_for(id, :name)
  end

  #
  # idの値が一致するエントリの、keyに対応した値を返却する
  #
  # 例）
  # Const.GENDER.get_for('F', :order)
  #  => 2
  #
  def get_for(id, key)
    self.each_value do |entry|
      return entry[key.to_s] if entry['id'] == id
    end
    nil
  end

  #
  # 全エントリに対して、keysを展開した各keyに対応した値を配列として返却する
  #
  # 例）
  # Const.GENDER.pluck(:id, :name)
  #  => [["M", "男"], ["F", "女"], ["U", "不明"]]
  #
  # Const.GENDER.pluck(:order, :id)
  #  => [[1, "M"], [2, "F"], [3, "U"]]
  #
  def pluck(*keys)
    result = []
    self.each_value.map { |entry|
      ary = []
      keys.each do |key|
        ary << entry[key.to_s]
      end
      result << ary
    }
    result
  end

  #
  # 全エントリに対して、key => valueのhashにして返却する
  #
  # 例）
  # Const.GENDER.to_hash(:id, :name)
  #  => {"M"=>"男", "F"=>"女", "U"=>"不明"}
  #
  # Const.GENDER.to_hash(:name, :order)
  #  => {"男"=>1, "女"=>2, "不明"=>3} 
  #
  def to_hash(key, value)
    result = {}
    self.each_value.map { |entry|
      result[entry[key.to_s]] = entry[value.to_s]
    }
    result
  end

  #
  # key_to_orderの値にてエントリをソートする
  #
  # 例）
  # Const.GENDER.sort_by(:order)
  # => [ {"id"=>"M", "name"=>"男", "order"=>1},
  #      {"id"=>"F", "name"=>"女", "order"=>2},
  #      {"id"=>"U", "name"=>"不明", "order"=>3}]
  #
  # Const.GENDER.sort_by(:id)
  # => [{"id"=>"F", "name"=>"女", "order"=>2},
  #     {"id"=>"M", "name"=>"男", "order"=>1},
  #     {"id"=>"U", "name"=>"不明", "order"=>3}]
  #
  def sort_by(key_to_order)
    values.sort{|entry_1, entry_2| entry_1[key_to_order.to_s] <=> entry_2[key_to_order.to_s] }
  end
end
