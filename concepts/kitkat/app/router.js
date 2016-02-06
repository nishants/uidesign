(function(){
  "use strict"
  $(document).ready(function(){
    var states  = {
        undefined: "",
        "google-play" : "show-google-play"
        },
        loadUrl = function (url) {
          var stateName = url.split("/")[1];
          app.reload(states[stateName]);
        },
        init = function () {
          window.location.href = window.location.href + "#/"
        };

    $(window).on("hashchange", function () {
      window.location.hash.length ?  loadUrl(window.location.hash) : init();
    });

    $(window).trigger("hashchange");
  });
}).call(this);