(function () {
  "use strict"

  var onStateChange = function () {
    var url = $location.url();


  };

  $(window).on("hashchange", onStateChange);
}).call(this);