var TimeConverter = {
  _getTimeInHundreths: function (milliseconds) {
    return Math.round(milliseconds / 10);
  },

  _getTimeInMinutes: function (milliseconds) {
    var minInMilliseconds = 1000 * 60;
    var mins = Math.floor(milliseconds / minInMilliseconds);
    var remainder = milliseconds % minInMilliseconds;
    return [mins, remainder];
  },

  _getTimeInSeconds: function (milliseconds) {
    var secs = Math.floor(milliseconds / 1000);
    var remainderMiliseconds = milliseconds % 1000;
    return [secs, remainderMiliseconds];
  },

  convertTimeToArray: function (milliseconds) {
    var mins = TimeConverter._getTimeInMinutes(milliseconds);
    var secs = TimeConverter._getTimeInSeconds(mins[1]);
    var hundredths = TimeConverter._getTimeInHundreths(secs[1]);
    return [mins[0], secs[0], hundredths];
  }
};
