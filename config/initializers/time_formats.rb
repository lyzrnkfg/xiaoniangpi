# 日付書式デフォルト設定
#
# Time.now.to_s => "2014/03/03 15:22"
# Time.now.to_s(:date) => "2014/03/03"
# Time.now.to_s(:datetime) => "2014/03/03 15:23"
# Time.now.to_s(:time) => "15:23:07"
Time::DATE_FORMATS[:default] = '%Y/%m/%d %H:%M:%S'
Time::DATE_FORMATS[:datetime] = '%Y%m%d'
Time::DATE_FORMATS[:date] = '%Y/%m/%d'
Time::DATE_FORMATS[:year_day_ja] = '%Y年%m月'
Time::DATE_FORMATS[:year_day] = '%Y%m'
Time::DATE_FORMATS[:time] = '%H:%M:%S'

Date::DATE_FORMATS[:default] = '%Y/%m/%d'
Date::DATE_FORMATS[:date] = '%Y/%m/%d'
Date::DATE_FORMATS[:year_day_ja] = '%Y年%m月'
Date::DATE_FORMATS[:year_day] = '%Y%m'
Date::DATE_FORMATS[:datetime] = '%Y%m%d'