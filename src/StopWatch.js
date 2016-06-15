var StopWatch = function () {
  this.isActive = false;
  this.timeSaved = 0;
  this._lapsArray = [];
};

StopWatch.prototype.getCurrentTime = function() {
  return Date.now();
};

StopWatch.prototype.start = function () {
  this._startTime = this.getCurrentTime();
  this.isActive = true;
  this._lapsArray.push([]);
};

StopWatch.prototype.stop = function () {
  this._stopTime = this.getCurrentTime();
  this.isActive = false;
  this.timeSaved += this._timeElapsedfromStart(this._stopTime);
};

StopWatch.prototype._timeElapsedfromStart = function (endTime) {
  return endTime - this._startTime;
};


StopWatch.prototype.getTimeElapsed = function () {
  if (!this._startTime) {
    // Timer not started, so return timer of zero
    return [0, 0, 0];
  }
  if (!this.isActive) {
    // Timer not active, so return timeSaved
    return this.convertTimeToArray(this.timeSaved);
  }

  // Active timer, so calc time elaspsed from last start time to now plus saved time
  var timeInMillisecond = this._timeElapsedfromStart(this.getCurrentTime()) + this.timeSaved;

  return this.convertTimeToArray(timeInMillisecond);
};

StopWatch.prototype.getTimeInHundreths = function (milliseconds) {
  return Math.round(milliseconds / 10);
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

StopWatch.prototype.recordLap = function () {
  if (!this.isActive) {
    return;
  }
  var lastSetOfLaps = this._lapsArray[this._lapsArray.length - 1];

  if (lastSetOfLaps.length === 0) {
    lastSetOfLaps.push(this._startTime);
  }
  lastSetOfLaps.push(this.getCurrentTime());
};

StopWatch.prototype.getLaps = function () {
  return [this._lapsArray[0][1] - this._lapsArray[0][0]];
};
