var stopWatch = new StopWatch();
var intervalRef;

function updateTime() {
  var timeArray = stopWatch.getTimeElapsed();
  document.getElementById('timer').textContent = timeArray[0] + ':' + timeArray[1] + ':' + timeArray[2];
}

updateTime();

Animator.addCallback(updateTime);

function startButton() {
  stopWatch.start();
  Animator.start();
}

function stopButton() {
  stopWatch.stop();
  Animator.stop();
}

function resetButton() {
  stopWatch = new StopWatch();
  Animator.stop();
  updateTime();
}

// function lapButton () {
//   var lapTimes = [];
// }
