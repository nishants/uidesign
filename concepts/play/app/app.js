(function(){
  "use strict"

  var app = {
    init: function(){
      app.player = app.Player.init($("#player"));
      app.player.play(2000);
      $("#loader").hide();
      window.app.NavBar.init();
    }
  };

  $(document).ready(function(){
    app.init();
  });

  window.app = app;
}).call(this);