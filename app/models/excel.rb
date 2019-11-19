class Excel < ApplicationRecord

  def self.excel_upload(file)
    ods = Roo::Excelx.new(file.path)
    array_one = ods.sheet(0).column(1)
    array_two = ods.sheet(0).column(2)
    hash = {}
    array_one.each_with_index do |value_one, i|
      line = "第1列第#{i + 1}行"
      next if value_one.blank?
      value = "值：#{value_one}"
      hash[[line, value]] = [] if hash[[line, value]].blank?
      array_two.each_with_index do |value_two, j|
        if value_one == value_two
          hash[[line, value]].push "第2列第#{j + 1}行"
        end
      end
    end
    hash
  end

  def self.makuro_upload(file)
    ods = Roo::Excelx.new(file.path)
    test1_name = ods.sheet("test1").column("A")
    test1_money = ods.sheet("test1").column("H")
    test1_consumpation = ods.sheet("test1").column("C")
    test1_summary = ods.sheet("test1").column("D")

    test2_name = ods.sheet("test2").column("D")
    test2_money = ods.sheet("test2").column("P")
    test2_consumpation = ods.sheet("test2").column("G")
    test2_summary = ods.sheet("test2").column("J")

    test2_hash = {}
    test2_name.each_with_index do |name, i|
      key = find_test(name, test2_money[i], array_check(test2_consumpation[i]), test2_summary[i])
      test2_hash[key] = i + 1
    end

    result = []
    error_line = ""
    test1_name.each_with_index do |name, i|
      key = find_test(name, test1_money[i], test1_consumpation[i], test1_summary[i])
      if test2_hash[key].present?
        result.push ods.sheet("test2").row(test2_hash[key])
      else
        result.push [key]
        error_line = "errorLine: 102line,118line,119line,120line,121line,122line,123line,124line," if error_line.blank?
        error_line += (i+1).to_s + "line,"
      end
    end

    return result, error_line
  end

  def self.find_test(name, money, consumpation, summary)
    summary = Moji.zen_to_han(summary)
    summary = summary.upcase
    result = name + money.to_i.to_s + consumpation + summary
    result.gsub!(" ","")
    result.gsub!("　","")
    result
  end

  def self.array_check(consumpation)
    arr = consumpation.split("-")
    arr.size == 3 ? arr[2] + arr[1] + arr[0] : consumpation
  end

end
