var Animator = {
  _ticking: false,

  _callbacks: [],

  addCallback: function (cb) {
    Animator._callbacks.push(cb);
  },

  clearCallbacks: function () {
    Animator._callbacks = [];
  },

  start: function () {
    if (Animator._ticking) return;
    Animator._ticking = true;
    window.requestAnimationFrame(Animator._runAnimation);
  },

  stop: function () {
    Animator._ticking = false;
  },

  _runAnimation: function () {
    // Run callbacks
    Animator._callbacks.forEach(function (cb) { cb(); });

    // If ticking then set to run on next ticking
    if (Animator._ticking) window.requestAnimationFrame(Animator._runAnimation);
  }
};
