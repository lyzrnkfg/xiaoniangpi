class Const < Settingslogic
  source "#{Rails.root}/config/constants.yml"
  namespace Rails.env
  
  # �z���̃G���g���[��OpenStruct�̃C���X�^���X�̔z��ŕԋp����
  # OpenStruct�̃C���X�^���X�Ȃ�A�v���p�e�B�A�N�Z�X���\�ƂȂ�
  #
  # ��j
  # Const.GENDER.entries
  #  => [#<OpenStruct id="M", name="�j", order="1">,
  #      #<OpenStruct id="F", name="��", order="2">,
  #      #<OpenStruct id="U", name="�s��", order="3">]
  # Const.GENDER.entries.each do |e| p e.name end
  #  => 
  #  "�j"
  #  "��"
  #  "�s��"
  #
  def entries
    result = []
    self.each do |key, val|
      result << OpenStruct.new(val)
    end
    result
  end

  #
  # id�̒l������id�ƈ�v����G���g����ԋp����
  # �ȈՃ��\�b�h
  #
  # ��j
  # Const.GENDER.find('M')
  #  => {"id"=>"M", "name"=>"�j", "order"=>1}
  #
  def find(id)
    find_by(:id, id) 
  end

  #
  # ����key�̒l������value�ƈ�v����G���g����ԋp����
  #
  # ��j
  # Const.GENDER.find_by(:id, 'M')
  #  => {"id"=>"M", "name"=>"�j", "order"=>1}
  #
  # Const.GENDER.find_by(:order, 3)
  #  => {"id"=>"U", "name"=>"�s��", "order"=>3}
  #
  def find_by(key, value)
    self.each_value do |entry|
      return OpenStruct.new(entry) if entry[key.to_s] == value
    end
    nil
  end

  #
  # id�̒l����v����G���g���́Akey='name'�ɂ�����l��ԋp����
  # �ȈՃ��\�b�h
  #
  # ��j
  # Const.GENDER.get('F')
  #  => "��"
  #
  def get(id)
    get_for(id, :name)
  end

  #
  # id�̒l����v����G���g���́Akey�ɑΉ������l��ԋp����
  #
  # ��j
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
  # �S�G���g���ɑ΂��āAkeys��W�J�����ekey�ɑΉ������l��z��Ƃ��ĕԋp����
  #
  # ��j
  # Const.GENDER.pluck(:id, :name)
  #  => [["M", "�j"], ["F", "��"], ["U", "�s��"]]
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
  # �S�G���g���ɑ΂��āAkey => value��hash�ɂ��ĕԋp����
  #
  # ��j
  # Const.GENDER.to_hash(:id, :name)
  #  => {"M"=>"�j", "F"=>"��", "U"=>"�s��"}
  #
  # Const.GENDER.to_hash(:name, :order)
  #  => {"�j"=>1, "��"=>2, "�s��"=>3} 
  #
  def to_hash(key, value)
    result = {}
    self.each_value.map { |entry|
      result[entry[key.to_s]] = entry[value.to_s]
    }
    result
  end

  #
  # key_to_order�̒l�ɂăG���g�����\�[�g����
  #
  # ��j
  # Const.GENDER.sort_by(:order)
  # => [ {"id"=>"M", "name"=>"�j", "order"=>1},
  #      {"id"=>"F", "name"=>"��", "order"=>2},
  #      {"id"=>"U", "name"=>"�s��", "order"=>3}]
  #
  # Const.GENDER.sort_by(:id)
  # => [{"id"=>"F", "name"=>"��", "order"=>2},
  #     {"id"=>"M", "name"=>"�j", "order"=>1},
  #     {"id"=>"U", "name"=>"�s��", "order"=>3}]
  #
  def sort_by(key_to_order)
    values.sort{|entry_1, entry_2| entry_1[key_to_order.to_s] <=> entry_2[key_to_order.to_s] }
  end
end
