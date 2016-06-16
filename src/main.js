var Animator = {
  _ticking: false,

  _callbacks: [],

  addCallback: function (cb) {
    Animator._callbacks.push(cb);
  },

  start: function () {
    if (Animator._ticking) return;
    Animator._ticking = true;
    window.requestAnimationFrame(Animator._runAnimation);
  },

  stop: function () {
    Animator._ticking = false;
  },

  _runAnimation: function () {
    // Run callbacks
    Animator._callbacks.forEach(function (cb) { cb(); });

    // If ticking then set to run on next ticking
    if (Animator._ticking) window.requestAnimationFrame(Animator._runAnimation);
  }
};


var stopWatch = new StopWatch();
var intervalRef;

function updateTime() {
  console.log('updating time');
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

function lapButton () {
  stopWatch.getLaps();
}
