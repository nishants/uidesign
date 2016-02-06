(function(){
  "use strict"
  $(document).ready(function(){
    var states  = {
      undefined: "",
      "google-play" : "show-google-play"
    };
    var route = function () {
      if (window.location.hash.length) {
        var stateName = window.location.hash.split("/")[1];
        app.reload(states[stateName]);
      }
    };
    $(window).on("hashchange", route);
    $(window).trigger("hashchange", route);
  });
}).call(this);