(function(){
  "use strict"
  var states  = {
    undefined: "",
    "google-play" : "show-google-play"
  };
  $(window).on("hashchange", function(){
    if(window.location.hash.length){
      var stateName = window.location.hash.split("/")[1];
      app.reload(states[stateName]);
    }
  });
}).call(this);