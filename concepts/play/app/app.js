(function(){
  "use strict"

  var app = {
    init: function(){
      $("#loader").hide();
    }
  };

  $(document).ready(function(){
    app.init();
  });

  window.app = app;
}).call(this);