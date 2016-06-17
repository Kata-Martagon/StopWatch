(function () {
  'use strict';

  var MainTimerDiv = document.getElementById('Timer');
  var LapTimerDiv = document.getElementById('LapTimer');
  var stopWatch;

  reset();

  window.reset = reset;

  // ******** Me

  //attaches start function to  start button

  function attachClickEvent(name, cb) {
  document.getElementById(name).addEventListener('click', cb);
}

  attachClickEvent('StartButton', start);
  attachClickEvent('StopButton', stop);
  attachClickEvent('ResetButton', reset);
  attachClickEvent('LapButton', lap);


// ****

  function reset () {
    clearLapList();

    Animator.clearCallbacks();
    Animator.addCallback(updateTimers);

    stopWatch = new window.StopWatch();
    stopWatch.subscribeToLapUpdate(updateLapList);

    updateTimers();
  }

  function updateTimers() {
    MainTimerDiv.textContent = formatTime(stopWatch.getTimeElapsed());
    LapTimerDiv.textContent = formatTime(stopWatch.getTimeElapsedFromLastLap());
  }

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
})();
