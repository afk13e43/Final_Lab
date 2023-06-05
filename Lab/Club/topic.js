let topic = ["尚未開學","國定假日","環境準備","隨機性","重複性"];
let stopD=["2/26","2/27","2/28","4/3","4/4","4/5"]
var startDate= new Date();
function setMonthAndDay(startMonth, startDay)
{//一次設定好月份與日期
    startDate.setMonth(startMonth-1,startDay);
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
}
setMonthAndDay(2,14);
