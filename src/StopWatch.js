var StopWatch = function () {
  // StopWatch constructor function
  // Sets default properties:
  // ::_isActive - state of StopWatch
  // ::_timeStored - time in milliseconds accrued (updated in ::stop() method)
  // ::_lapsArray - nested array of lap intervals (nesting required for lap after stop and restart)
  // ::_startTime - timestamp at last call of ::start() method
  // ::_lapsCallbacks - array to hold callbacks for lap updates
  this._isActive = false;
  this._timeStored = 0;
  this._lapsArray = [];
  this._startTime = undefined;
  this._lapUpdateCallbacks = [];
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
  // Timer not started, so return zero ms
  if (!this._startTime) return 0;

  // Timer not active, so return _timeStored
  if (!this._isActive) return this._timeStored;

  // Active timer, so return total time elapsed until now in ms
  return this._totalTimeElapsedToNow();
};

// TODO: update tests
StopWatch.prototype.recordLap = function () {
  // If ::_isActive === false, cannot record a lap so throw error
  if (!this._isActive) throw new Error('Cannot record lap when inactive');

  var nextLapInterval = this._lapsArray.length === 0 ?
    this._timeIntervalSinceStart() :
    this._timeElapsedSinceLastInterval();

  this._lapsArray.push(nextLapInterval);

  this._publishLapUpdate();
};

// TODO: Add tests
StopWatch.prototype.subscribeToLapUpdate = function (cb) {
  this._lapUpdateCallbacks.push(cb);
};

// TODO: Add tests
StopWatch.prototype._publishLapUpdate = function () {
  var lapsArray = this._lapsArray.slice();
  this._lapUpdateCallbacks.forEach(function (cb) { return cb(lapsArray); });
};

StopWatch.prototype._timeElapsedSinceLastInterval = function () {
  return this._totalTimeElapsedToNow() - this._totalAccruedLaps();
};

StopWatch.prototype._timeIntervalSinceStart = function () {
  return Date.now() - this._startTime;
};

StopWatch.prototype._totalAccruedLaps = function () {
  return this._lapsArray.reduce(function (a, b) { return a + b; });
};

StopWatch.prototype._totalTimeElapsedToNow = function() {
  return this._timeElapsedfromStart(Date.now()) + this._timeStored;
};

// TODO: Add tests
StopWatch.prototype.getLaps = function () {
  return this._lapsArray;
};

// TODO: Add tests
StopWatch.prototype.getTimeElapsedFromLastLap = function () {
  if (this._lapsArray.length === 0) return this.getTimeElapsed();

  if (!this._isActive) return this._timeStored - this._totalAccruedLaps();

  return this._timeElapsedSinceLastInterval();
};

window.StopWatch = StopWatch;
