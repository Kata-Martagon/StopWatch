describe("Test environment works", function() {

  var timerCallback;

  // Install jasmine.clock().install
  beforeEach(function() {
    timerCallback = jasmine.createSpy("timerCallback");
    jasmine.clock().install();
  });

  // Uninstall clock
  afterEach(function() {
    jasmine.clock().uninstall();
  });

  it("causes a timeout to be called synchronously", function() {
    setTimeout(function() {
      timerCallback();
    }, 100);

    expect(timerCallback).not.toHaveBeenCalled();

    jasmine.clock().tick(101);

    expect(timerCallback).toHaveBeenCalled();
  });

  it("should create a successful test environment", function() {
    expect(true).toBe(true);
  });
});

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

  it('should return the current time as a timestamp', function() {
    expect(stopWatch.getCurrentTime()).toEqual(Date.now());
  });

  it('should store _startTime on StopWatch object', function() {
    stopWatch.start();
    expect(Date.now()).toEqual(stopWatch._startTime);
  });

  it('should record the _stopTime on the stopWatch object', function () {
    stopWatch.stop();
    expect(Date.now()).toEqual(stopWatch._stopTime);
  });

  // Testing without jasmine.clock().mockDate()
  // it('should record the _timeElapsed on the stopWatch object', function (done) {
  //   var startTime = Date.now();
  //   stopWatch.start();
  //
  //   setTimeout(function() {
  //     stopWatch.stop();
  //     var stopTime = Date.now();
  //     var expected = stopTime - startTime;
  //
  //     expect(stopWatch._timeElapsed()).toEqual(expected);
  //     done();
  //   }, 10);
  // });

  it('should record the _timeElapsed on the stopWatch object', function () {
    stopWatch.start();
    jasmine.clock().tick(50);
    stopWatch.stop();
    expect(stopWatch._timeElapsed()).toEqual(50);
  });

  xdescribe('::getTimeElapsed()', function () {
    it('should return time elapsed in mins,secs,hundreths', function () {
      stopWatch.start();
      jasmine.clock().tick(6500);
      stopWatch.stop();
      expect(stopWatch.getTimeElapsed()).toEqual([6.5]);
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

});
