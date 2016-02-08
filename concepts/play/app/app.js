(function(){
  "use strict"

  var app = {
    init: function(){
      app.player = app.Player.init($("#player"));
    }
  };

  $(document).ready(function(){
    app.init();
  });

  window.app = app;
}).call(this);