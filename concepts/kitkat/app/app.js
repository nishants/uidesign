(function(){
  "use strict"
  $(document).ready(function(){
    $("#google-play-window-wrapper").load("app/google-play/window.html", {}, function(){
      new Swiper($(".swiper").first());
    });

    $("#menu-window-wrapper").load("app/menu/menu.html", {}, function(){
      alert("laoded")
    });

    var $app = $("#app"),
        app = {
        showGooglePLay : function(){
          $app.addClass("show-google-play");
          window.location.hash = "#/google-play";
        }
    };

    var $search = $(".google-play > .search > .input").first();
    $search.on("touchstart", app.showGooglePLay);
    app.reload = function(state){
      $app.removeClass();
      $app.addClass(state);
    };
    window.app = app;
  })
}).call(this);