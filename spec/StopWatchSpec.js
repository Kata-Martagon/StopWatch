(function () {
  'use strict';

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
      expect(stopWatch._isActive).toBe(false);
    });

    describe('::start()', function () {
      it('should store _startTime on StopWatch object', function() {
        stopWatch.start();
        expect(Date.now()).toEqual(stopWatch._startTime);
      });

      it('should change _isActive status to true', function () {
        stopWatch.start();
        expect(stopWatch._isActive).toBe(true);
      });

      it('should throw an error if _isActive status is true', function () {
        stopWatch.start();
        var fn = function () { stopWatch.start(); };
        expect(fn).toThrowError();
      });
    });

    describe('::stop()', function () {
      it('should change _isActive status to false', function () {
        stopWatch.start();
        expect(stopWatch._isActive).toBe(true);
        stopWatch.stop();
        expect(stopWatch._isActive).toBe(false);
      });

      it('should throw an error if _isActive status is false', function () {
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
      it('should return time elapsed in ms', function () {
        stopWatch.start();
        jasmine.clock().tick(6500);
        stopWatch.stop();
        expect(stopWatch.getTimeElapsed()).toEqual(6500);
      });

      it('should return time elapsed in ms without stopping', function () {
        stopWatch.start();
        jasmine.clock().tick(6500);
        expect(stopWatch.getTimeElapsed()).toEqual(6500);
      });

      it('should return 0 when timer not started', function () {
        expect(stopWatch.getTimeElapsed()).toEqual(0);
      });

      it('should return correct time after multiple start stops', function () {
        stopWatch.start();
        jasmine.clock().tick(6500);
        stopWatch.stop();
        jasmine.clock().tick(300);
        stopWatch.start();
        jasmine.clock().tick(500);
        stopWatch.stop();
        expect(stopWatch.getTimeElapsed()).toEqual(7000);
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
        expect(stopWatch.getTimeElapsed()).toEqual(67000);
      });
    });

    describe('::recordLap', function () {
      it('should be empty when StopWatch is inactive', function () {
        var fn = function () { stopWatch.recordLap(); };
        expect(fn).toThrowError();
      });

      it('should record the difference in milliseconds from start', function () {
        stopWatch.start();
        jasmine.clock().tick(500);
        stopWatch.recordLap();
        expect(stopWatch._lapsArray).toEqual([500]);
      });

      it('should have startTime and lapTimes for multiple laps', function () {
        stopWatch.start();
        jasmine.clock().tick(500);
        stopWatch.recordLap();
        jasmine.clock().tick(300);
        stopWatch.recordLap();
        jasmine.clock().tick(600);
        stopWatch.recordLap();
        expect(stopWatch._lapsArray).toEqual([500, 300, 600]);
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

        expect(stopWatch._lapsArray).toEqual([500, 400, 600]);
      });
    });
  });
})();
