// 'use strict';

describe('StopWatch', function () {

  var stopWatch;
  var baseTime;
  var TimeConverter;

  beforeEach(function() {
    jasmine.clock().install();
    baseTime = Date.now();
    jasmine.clock().mockDate(baseTime);
    TimeConverter = jasmine.createSpy("TimeConverter");
    stopWatch = new StopWatch(TimeConverter);
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

    it('should throw an error if isActive status is true', function () {
      stopWatch.start();
      var fn = function () { stopWatch.start(); };
      expect(fn).toThrowError();
    });
  });

  describe('::stop()', function () {
    it('should record the _stopTime on the stopWatch object', function () {
      stopWatch.start();
      var stopTime = stopWatch.stop();
      expect(Date.now()).toEqual(stopTime);
    });

    it('should change isActive status to false', function () {
      stopWatch.start();
      expect(stopWatch.isActive).toBe(true);
      stopWatch.stop();
      expect(stopWatch.isActive).toBe(false);
    });

    it('should throw an error if isActive status is false', function () {
      var fn = function () { stopWatch.stop(); };
      expect(fn).toThrowError();
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

  describe('::_getLapIntervals', function () {
    it('should have an array of lap times in milliseconds', function () {
      stopWatch.start();

      jasmine.clock().tick(500);
      stopWatch.recordLap();

      expect(stopWatch._getLapIntervals()).toEqual([500]);
    });

    it('should handle multiple lap times', function () {
      stopWatch.start();
      jasmine.clock().tick(500);
      stopWatch.recordLap();
      jasmine.clock().tick(1000);
      stopWatch.recordLap();
      jasmine.clock().tick(2000);
      stopWatch.recordLap();

      expect(stopWatch._getLapIntervals()).toEqual([500, 1000, 2000]);
    });

    it('should handle multiple laps across start and stop', function () {
      stopWatch.start();
      jasmine.clock().tick(500);
      stopWatch.recordLap();
      jasmine.clock().tick(1000);
      stopWatch.recordLap();
      stopWatch.stop();
      jasmine.clock().tick(5000);
      stopWatch.start();
      jasmine.clock().tick(2000);
      stopWatch.recordLap();

      expect(stopWatch._getLapIntervals()).toEqual([500, 1000, 2000]);
    });
  });

  describe('::getLaps', function () {

    it('should handle multiple laps across start and stop', function () {
      stopWatch.start();
      jasmine.clock().tick(500);
      stopWatch.recordLap();
      jasmine.clock().tick(1000);
      stopWatch.recordLap();
      stopWatch.stop();
      jasmine.clock().tick(5000);
      stopWatch.start();
      jasmine.clock().tick(2000);
      stopWatch.recordLap();

      expect(stopWatch.getLaps()).toEqual([[0, 0, 50], [0, 1, 0], [0, 2, 0]]);
    });
  });
});
