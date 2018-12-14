var timeBar = document.getElementById("timeBar")
var showTime = document.getElementById("timeShow")
var now = new Date()
var hour = now.getHours() > 0 ? now.getHours() : now.getHours() + 24
var minute = now.getMinutes()

showTime.innerHTML = `${hour}` + ":" + `${minute}`
timeBar.max = hour * 60 + minute + 60
timeBar.min = hour * 60 + minute - 60
timeBar.value = hour * 60 + minute

function timeChangeBar() {
  var value = timeBar.value
  var m0 = ('00' + parseInt(value%60).toString()).slice(-2);
  console.log(m0);
  
  var input = `${parseInt(parseInt(value)/60)}` + ":" + `${m0}`
  showTime.innerHTML = input
  colorSet()
}