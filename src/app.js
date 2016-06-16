
function updateTime() {
  document.getElementById('Timer').textContent = formatTime(stopWatch.getTimeElapsed());
  updateLapList(stopWatch.getLaps());
}

var stopWatch = new StopWatch();

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

function formatTime (timeArr) {
  if (!Array.isArray(timeArr) || timeArr.length < 3) return;
  return formatNumber(timeArr[0]) + '.' + formatNumber(timeArr[1]) + ':' + formatNumber(timeArr[2]);
}

function updateLapList (list) {
  var listNode = document.getElementById('LapTimes');

  if (list.length === 0 || list.length <= listNode.childNodes.length - 1) return;

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
  var listNode = document.getElementById('LapTimes');

  list.reverse().forEach(function (timeArr) {
    var lapNode = document.createElement("li");
    lapNode.textContent = formatTime(timeArr);
    listNode.appendChild(lapNode);
  });
}
