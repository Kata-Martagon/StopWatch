var StopWatch = function () {
  // StopWatch constructor function
  // Sets default properties:
  // ::isActive - state of StopWatch
  // ::timeSaved - time in milliseconds accrued (updated in ::stop() method)
  // ::_lapsArray - nested array of lap intervals (nesting required for lap after stop and restart)
  // ::_startTime - timestamp at last call of ::start() method
  this.isActive = false;
  this.timeSaved = 0;
  this._lapsArray = [];
  this._startTime = undefined;
};

StopWatch.prototype.getCurrentTime = function() {
  // Return current time as timestamp
  return Date.now();
};

// TODO: add check to ensure start doesn't run if ::isActive === true
StopWatch.prototype.start = function () {
  // Set ::_startTime to current timestamp
  // Set ::isActive to true
  // Create new lap array for current ::_startTime
  this._startTime = this.getCurrentTime();
  this.isActive = true;
  this._lapsArray.push([]);
};

// TODO: add check to ensure stop doesn't run if ::isActive === false
// TODO: don't think ::_stopTime used outside of this function so can be converted to var
StopWatch.prototype.stop = function () {
  // Set ::_stopTime to current timestamp
  // Set ::_isActive to false
  // Add accrued time from last start time until current timestamp to ::timeSaved
  this._stopTime = this.getCurrentTime();
  this.isActive = false;
  this.timeSaved += this._timeElapsedfromStart(this._stopTime);
};

// TODO: throw an error if called when no valid ::_startTime
StopWatch.prototype._timeElapsedfromStart = function (endTime) {
  // Return number of milliseconds since ::_startTime
  return endTime - this._startTime;
};


StopWatch.prototype.getTimeElapsed = function () {
  if (!this._startTime) {
    // Timer not started, so return timer of zero
    return [0, 0, 0];
  }

  if (!this.isActive) {
    // Timer not active, so return timeSaved
    return TimeConverter.convertTimeToArray(this.timeSaved);
  }

  // Active timer, so calculate time elaspsed from last start time to now plus saved time
  // And return as [mins, secs, hundredths]
  var timeInMillisecond = this._timeElapsedfromStart(this.getCurrentTime()) + this.timeSaved;

  return TimeConverter.convertTimeToArray(timeInMillisecond);
};

StopWatch.prototype.recordLap = function () {
  // If ::isActive === false, cannot record a lap so exit function
  if (!this.isActive) {
    return;
  }

  // Get lastSetOfLaps (i.e. last array of laps since last ::start() call)
  var lastSetOfLaps = this._lapsArray[this._lapsArray.length - 1];

  // If lastSetOfLaps is an empty array, then add last ::_startTime timestamp
  if (lastSetOfLaps.length === 0) {
    lastSetOfLaps.push(this._startTime);
  }

  // Add current timestamp
  lastSetOfLaps.push(this.getCurrentTime());
};

// TODO: complete functionality
StopWatch.prototype.getLaps = function () {
  return [this._lapsArray[0][1] - this._lapsArray[0][0]];
};
