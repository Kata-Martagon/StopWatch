describe('TimeConverter', function () {
  var timeConverter;
  
  beforeEach(function()

    // jasmine.clock().install();
    // baseTime = Date.now();
    // jasmine.clock().mockDate(baseTime);
    timeConverter = new TimeConverter();
  });

  afterEach(function () {
    jasmine.clock().uninstall();
  });

describe('::convertTimeToArray', function () {
  it('should return time in array [mins, secs, hundredths]', function () {
    expect(timeConverter.convertTimeToArray(60000)).toEqual([1, 0, 0]);
  });

  it('should return time in array [mins, secs, hundredths]', function () {
    var mins = 2 * 60 * 1000;
    var secs = 30 * 1000;
    expect(timeConverter.convertTimeToArray(mins + secs)).toEqual([2, 30, 0]);
  });

  it('should return time in array [mins, secs, hundredths]', function () {
    var mins = 20 * 60 * 1000;
    var secs = 15 * 1000;
    var milliseconds = 444;
    expect(timeConverter.convertTimeToArray(mins + secs + milliseconds)).toEqual([20, 15, 44]);
  });
});
});
