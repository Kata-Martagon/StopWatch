var StopWatch = function () {
  // StopWatch constructor function
  // Sets default properties:
  // ::_isActive - state of StopWatch
  // ::_timeStored - time in milliseconds accrued (updated in ::stop() method)
  // ::_lapsArray - nested array of lap intervals (nesting required for lap after stop and restart)
  // ::_startTime - timestamp at last call of ::start() method
  this._isActive = false;
  this._timeStored = 0;
  this._lapsArray = [];
  this._startTime = undefined;
};

StopWatch.prototype.start = function () {
  // Throw error if  this._isActive === true
  if (this._isActive) throw new Error('Cannot start an active stopwatch');

  // Set ::_startTime to current timestamp
  // Set ::_isActive to true
  this._startTime = Date.now();
  this._isActive = true;
};

StopWatch.prototype.stop = function () {
  // Throw error if this._isActive === false
  if (!this._isActive) throw new Error('Cannot stop an in-active stopwatch');

  // Set ::__isActive to false
  // Add accrued time from last start time until now to ::_timeStored
  this._isActive = false;
  this._timeStored += this._timeElapsedfromStart(Date.now());
};

StopWatch.prototype._timeElapsedfromStart = function (endTime) {
  // Return number of milliseconds since ::_startTime
  return endTime - this._startTime;
};

StopWatch.prototype.getTimeElapsed = function () {
  // Timer not started, so return timer of zero
  // if (!this._startTime) return [0, 0, 0];
  if (!this._startTime) return [0, 0, 0];

  // Timer not active, so return _timeStored
  if (!this._isActive) return TimeConverter.convertTimeToArray(this._timeStored);

  // Active timer, so return total time elapsed until now converted to [mins, secs, hundredths]
  return TimeConverter.convertTimeToArray(this._totalTimeElapsedToNow());
};

StopWatch.prototype.recordLap = function () {
  // If ::_isActive === false, cannot record a lap so exit function
  if (!this._isActive) throw new Error('Cannot record lap when inactive');

  var nextLapInterval = this._lapsArray.length === 0 ?
    this._timeIntervalSinceStart() :
    this._timeElapsedSinceLastInterval();

  this._lapsArray.push(nextLapInterval);
};

StopWatch.prototype._timeElapsedSinceLastInterval = function () {
  return this._totalTimeElapsedToNow() - this._totalAccruedLaps();
};

StopWatch.prototype._timeIntervalSinceStart = function () {
  return Date.now() - this._startTime;
};

StopWatch.prototype._totalAccruedLaps = function () {
  return this._lapsArray.reduce((a, b) => a + b);
};

StopWatch.prototype._totalTimeElapsedToNow = function() {
  return this._timeElapsedfromStart(Date.now()) + this._timeStored;
};

StopWatch.prototype.getLaps = function () {
  return this._lapsArray.map(TimeConverter.convertTimeToArray);
};

StopWatch.prototype.getTimeElapsedFromLastLap = function () {
  if (this._lapsArray.length === 0) return this.getTimeElapsed();

  if (!this._isActive) return TimeConverter.convertTimeToArray(this._timeStored - this._totalAccruedLaps());

  return TimeConverter.convertTimeToArray(this._timeElapsedSinceLastInterval());
};
