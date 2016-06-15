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

  beforeEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100;
    stopWatch = new StopWatch();
  });

  afterEach(function () {
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

  it('should record the _timeElapsed on the stopWatch object', function (done) {
    var startTime = Date.now();
    stopWatch.start();

    setTimeout(function() {
      stopWatch.stop();
      var stopTime = Date.now();
      var expected = stopTime - startTime;

      expect(stopWatch._timeElapsed()).toEqual(expected);
      done();
    }, 10);
  });

  describe('stopWatch.getTimeElapsed()', function () {
    it('should return time elapsed in mins,secs,hundreths', function (done) {
      var startTime = Date.now();
      stopWatch.start();

      setTimeout(function() {
        stopWatch.stop();
        var stopTime = Date.now();
        var expected = stopTime - startTime;

        expect(stopWatch._timeElapsed()).toEqual(expected);
        done();
      }, 130);
    });
  });
});
