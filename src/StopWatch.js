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
