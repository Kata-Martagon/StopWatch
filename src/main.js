var stopWatch = new StopWatch();
var intervalRef;

function updateTime() {
  console.log('updating time');
  var timeArray = stopWatch.getTimeElapsed();
  document.getElementById('timer').textContent = timeArray[0] + ':' + timeArray[1] + ':' + timeArray[2];
}

updateTime();

function startButton() {
  stopWatch.start();
  intervalRef = setInterval(updateTime, 10);
}

function stopButton() {
  stopWatch.stop();
  clearInterval(intervalRef);
}
