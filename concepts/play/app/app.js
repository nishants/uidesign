(function(){
  "use strict"

  var app = {
    init: function(){
      app.player = app.Player.init($("#player"));
      app.player.play(1000);
    }
  };

  $(document).ready(function(){
    app.init();
  });

  window.app = app;
}).call(this);