(function(){
  "use strict"
  $(document).ready(function(){
    $("#google-play-window-wrapper").load("app/google-play/window.html");

    var $app = $("#app"),
        app = {
        showGooglePLay : function(){
          $app.addClass("show-google-play");
          window.location.hash = "#/google-play";
        }
    };

    var $search = $(".google-play > .search > .input").first();
    $search.on("click", app.showGooglePLay);
    app.reload = function(state){
      $app.addClass(state);
    };
    window.app = app;
  })
}).call(this);