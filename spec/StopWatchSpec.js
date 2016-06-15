// 'use strict';

describe('StopWatch', function () {

  var stopWatch;
  var baseTime;

  beforeEach(function() {
    jasmine.clock().install();
    baseTime = Date.now();
    jasmine.clock().mockDate(baseTime);
    stopWatch = new StopWatch();
  });

  afterEach(function () {
    jasmine.clock().uninstall();
  });

  it('should have a default state of stopped', function () {
    expect(stopWatch.isActive).toBe(false);
  });

  describe('::getCurrentTime()', function () {
    it('should return the current time as a timestamp', function() {
      expect(stopWatch.getCurrentTime()).toEqual(Date.now());
    });
  });

  describe('::start()', function () {
    it('should store _startTime on StopWatch object', function() {
      stopWatch.start();
      expect(Date.now()).toEqual(stopWatch._startTime);
    });

    it('should change isActive status to true', function () {
      stopWatch.start();
      expect(stopWatch.isActive).toBe(true);
    });
  });

  describe('::stop()', function () {
    it('should record the _stopTime on the stopWatch object', function () {
      stopWatch.stop();
      expect(Date.now()).toEqual(stopWatch._stopTime);
    });

    it('should change isActive status to false', function () {
      stopWatch.start();
      expect(stopWatch.isActive).toBe(true);
      stopWatch.stop();
      expect(stopWatch.isActive).toBe(false);
    });
  });

  describe('::_timeElapsedfromStart()', function () {
    it('should record the _timeElapsedfromStart on the stopWatch object', function () {
      stopWatch.start();
      jasmine.clock().tick(50);
      stopWatch.stop();
      expect(stopWatch._timeElapsedfromStart(Date.now())).toEqual(50);
    });
  });

  describe('::getTimeElapsed()', function () {
    it('should return time elapsed in mins,secs,hundreths', function () {
      stopWatch.start();
      jasmine.clock().tick(6500);
      stopWatch.stop();
      expect(stopWatch.getTimeElapsed()).toEqual([0, 6, 50]);
    });

    it('should return time elapsed in mins,secs,hundreths', function () {
      stopWatch.start();
      jasmine.clock().tick(6500);
      expect(stopWatch.getTimeElapsed()).toEqual([0, 6, 50]);
    });

    it('should return [0,0,0] when timer not started', function () {
      expect(stopWatch.getTimeElapsed()).toEqual([0,0,0]);
    });
    it('should return correct time after multiple start stops', function () {
      stopWatch.start();
      jasmine.clock().tick(6500);
      stopWatch.stop();
      jasmine.clock().tick(300);
      stopWatch.start();
      jasmine.clock().tick(500);
      stopWatch.stop();
      expect(stopWatch.getTimeElapsed()).toEqual([0, 7, 0]);
    });
    it('should return correct time after multiple start stops', function () {
      stopWatch.start();
      jasmine.clock().tick(6500);
      stopWatch.stop();
      jasmine.clock().tick(300);
      stopWatch.start();
      jasmine.clock().tick(500);
      stopWatch.stop();
      jasmine.clock().tick(2000);
      stopWatch.start();
      jasmine.clock().tick(60000);
      stopWatch.stop();
      expect(stopWatch.getTimeElapsed()).toEqual([1, 7, 0]);
    });
  });

  describe('::getTimeInHundreths()', function () {
    it('should return time elapsed hundreths of a second', function () {
      expect(stopWatch.getTimeInHundreths(6500)).toEqual(650);
    });

    it('should return time rounded to nearest whole hundredth of a second', function () {
      expect(stopWatch.getTimeInHundreths(6505)).toEqual(651);
    });
  });

  describe('::getTimeInSeconds()', function () {
    it('should return time elapsed in completed seconds', function () {
      expect(stopWatch.getTimeInSeconds(6500)).toEqual([6, 500]);
    });

    it('should return time elapsed in seconds and remainder milliseconds', function () {
      expect(stopWatch.getTimeInSeconds(500)).toEqual([0, 500]);
    });
  });

  describe('::getTimeInMinutes()', function () {
    it('should return time elapsed in completed minutes', function () {
      expect(stopWatch.getTimeInMinutes(60000)).toEqual([1, 0]);
    });

    it('should return remainders', function () {
      expect(stopWatch.getTimeInMinutes(56000)).toEqual([0,56000]);
    });
  });

  describe('::convertTimeToArray', function () {
    it('should return time in array [mins, secs, hundredths]', function () {
      expect(stopWatch.convertTimeToArray(60000)).toEqual([1, 0, 0]);
    });

    it('should return time in array [mins, secs, hundredths]', function () {
      var mins = 2 * 60 * 1000;
      var secs = 30 * 1000;
      expect(stopWatch.convertTimeToArray(mins + secs)).toEqual([2, 30, 0]);
    });

    it('should return time in array [mins, secs, hundredths]', function () {
      var mins = 20 * 60 * 1000;
      var secs = 15 * 1000;
      var milliseconds = 444;
      expect(stopWatch.convertTimeToArray(mins + secs + milliseconds)).toEqual([20, 15, 44]);
    });
  });

  describe('::recordLap', function () {
    it('should be empty when StopWatch is inactive', function () {
      stopWatch.recordLap();
      expect(stopWatch._lapsArray).toEqual([]);
    });

    it('should add the startTime and the current time to laps array when stopWatch is active', function () {
      stopWatch.start();
      jasmine.clock().tick(500);
      stopWatch.recordLap();
      expect(stopWatch._lapsArray).toEqual([[baseTime, baseTime + 500]]);
    });

    it('should have startTime and lapTimes for multiple laps', function () {
      stopWatch.start();
      jasmine.clock().tick(500);
      stopWatch.recordLap();
      jasmine.clock().tick(300);
      stopWatch.recordLap();
      jasmine.clock().tick(600);
      stopWatch.recordLap();
      expect(stopWatch._lapsArray).toEqual([[baseTime, baseTime + 500, baseTime + 500 + 300, baseTime + 500 + 300 + 600]]);
    });

    it('should have startTime and lapTimes for multiple laps and start stops', function () {
      stopWatch.start();

      jasmine.clock().tick(500);
      stopWatch.recordLap();

      jasmine.clock().tick(300);
      stopWatch.stop();

      jasmine.clock().tick(500);
      stopWatch.start();

      jasmine.clock().tick(100);
      stopWatch.recordLap();

      jasmine.clock().tick(600);
      stopWatch.recordLap();

      var firstStart = baseTime;
      var firstLap = firstStart + 500;
      var secondStart = baseTime + 500 + 300 + 500;
      var secondLap = secondStart + 100;
      var thirdLap = secondLap + 600;

      expect(stopWatch._lapsArray).toEqual([[firstStart, firstLap], [secondStart, secondLap, thirdLap]]);
    });
  });

  describe('::getLaps', function () {
    it('should have an array of lap times in milliseconds', function () {
      stopWatch.start();

      jasmine.clock().tick(500);
      stopWatch.recordLap();

      expect(stopWatch.getLaps()).toEqual([500]);
    });
  });
});
