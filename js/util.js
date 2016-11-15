var util = {
  fullscreen: function () {
    var el = document.documentElement,
        rfs = el.requestFullscreen
            || el.webkitRequestFullScreen
            || el.mozRequestFullScreen
            || el.msRequestFullscreen;

    rfs.call(el);
  }
};

window.util = util;