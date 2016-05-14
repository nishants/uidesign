(function(){
  "use strict"
  $(document).ready(function(){

    var $app = $("#app"),
        app = {
        showGooglePLay : function(){
          app.reload("show-google-play");
          window.location.hash = "#/google-play";
        }
    };

    var $search = $(".google-play > .search > .input").first();
    $search.on("touchstart", app.showGooglePLay);
    app.reload = function(state){
      $app.removeClass();
      $app.addClass(state);
    };

    $("#google-play-window-wrapper").load("app/google-play/window.html", {}, function(){
      new Swiper($(".swiper").first());
    });

    $("#menu-window-wrapper").load("app/menu/menu.html", {}, function(){
      $("#menu-button").on("touchstart", function(){
        app.reload("show-menu");
        window.location.hash = "#/menu";
      });
    });

    window.app = app;
  })
}).call(this);