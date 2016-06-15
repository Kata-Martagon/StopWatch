'use strict';

var StopWatch = function () {

};

StopWatch.prototype.getCurrentTime = function() {
  return Date.now();
};

StopWatch.prototype.start = function () {
  this._startTime = this.getCurrentTime();
};

StopWatch.prototype.stop = function () {
  this._stopTime = this.getCurrentTime();
};

StopWatch.prototype._timeElapsed = function () {
  return this._stopTime - this._startTime;
};

StopWatch.prototype.getTimeElapsed = function () {
  var timeInMillisecond = this._timeElapsed();
  var arrayOfTimeElasped = [];
  var timeInSeconds = timeInMillisecond / 1000;
  arrayOfTimeElasped.push(timeInSeconds);
  return arrayOfTimeElasped;
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
