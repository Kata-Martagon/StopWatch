// var lastList = [];

function updateTime() {
  document.getElementById('Timer').textContent = formatTime(stopWatch.getTimeElapsed());
  document.getElementById('LapTimer').textContent = formatTime(stopWatch.getTimeElapsedFromLastLap());
}

var stopWatch = new StopWatch();

stopWatch.subscribeToLapUpdate(updateLapList);

updateTime();

Animator.addCallback(updateTime);


function formatNumber (num) {
  return num < 10 ? '0' + num : num;
}

function start() {
  stopWatch.start();
  hideButton('StartButton');
  hideButton('ResetButton');
  showButton('StopButton');
  showButton('LapButton');
  Animator.start();
}

function stop() {
  stopWatch.stop();
  hideButton('StopButton');
  hideButton('LapButton');
  showButton('StartButton');
  showButton('ResetButton');
  Animator.stop();
}

function reset () {
  stopWatch = new StopWatch();
  Animator.stop();
  updateTime();
  clearLapList();
  stopWatch.subscribeToLapUpdate(updateLapList);
}

function lap() {
  stopWatch.recordLap();
}

function hideButton (elementId) {
  document.getElementById(elementId).style.display = 'none';
}

function showButton (elementId) {
  document.getElementById(elementId).style.display = 'block';
}

function formatTime (timeMS) {
  // if (!Array.isArray(timeArr) || timeArr.length < 3) return;
  var timeArr = TimeConverter.convertTimeToArray(timeMS);
  return formatNumber(timeArr[0]) + '.' + formatNumber(timeArr[1]) + ':' + formatNumber(timeArr[2]);
}

function updateLapList (list) {
  var listNode = document.getElementById('LapTimes');

  clearLapList();
  buildLapList(list);
}

function clearLapList () {
  var listNode = document.getElementById('LapTimes');

  while (listNode.hasChildNodes()) {
    listNode.removeChild(listNode.firstChild);
  }
}

function buildLapList (list) {
  list.reverse().forEach(creatTableRow);
}

function creatTableRow (time, idx, arr) {
  var trNode = document.createElement('tr');
  var tdDescription = document.createElement('td');
  tdDescription.textContent = 'Lap ' + (arr.length - idx);
  var tdTime = document.createElement('td');
  tdTime.textContent = formatTime(time);
  trNode.appendChild(tdDescription);
  trNode.appendChild(tdTime);
  document.getElementById('LapTimes').appendChild(trNode);
}
