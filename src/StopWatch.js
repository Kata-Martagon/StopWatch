'use strict';

var StopWatch = function () {
  this.isActive = false;
};

StopWatch.prototype.getCurrentTime = function() {
  return Date.now();
};

StopWatch.prototype.start = function () {
  this._startTime = this.getCurrentTime();
  this.isActive = true;
};

StopWatch.prototype.stop = function () {
  this._stopTime = this.getCurrentTime();
  this.isActive = false;
};

StopWatch.prototype._timeElapsedfromStart = function (endTime) {
  return endTime - this._startTime;
};


StopWatch.prototype.getTimeElapsed = function () {
  if (!this._startTime) {
    return [0, 0, 0];
  }
  var endTime = this.isActive ? Date.now() : this._stopTime;
  var timeInMillisecond = this._timeElapsedfromStart(endTime);
  return this.convertTimeToArray(timeInMillisecond);
};

StopWatch.prototype.getTimeInHundreths = function (milliseconds) {
  return Math.round(milliseconds / 10);
};

StopWatch.prototype.getTimeInSeconds = function (milliseconds) {
  return Math.floor(milliseconds / 1000);
};

StopWatch.prototype.getTimeInMinutes = function (milliseconds) {
  var minInMilliseconds = 1000 * 60;
  var mins = Math.floor(milliseconds / minInMilliseconds);
  var remainder = milliseconds % minInMilliseconds;
  return [mins, remainder];
};

StopWatch.prototype.getTimeInSeconds = function (milliseconds) {
  var secs = Math.floor(milliseconds / 1000);
  var remainderMiliseconds = milliseconds % 1000;
  return [secs, remainderMiliseconds];
};


StopWatch.prototype.convertTimeToArray = function (milliseconds) {
  var mins = this.getTimeInMinutes(milliseconds);
  var secs = this.getTimeInSeconds(mins[1]);
  var hundredths = this.getTimeInHundreths(secs[1]);
  return [mins[0], secs[0], hundredths];
};
