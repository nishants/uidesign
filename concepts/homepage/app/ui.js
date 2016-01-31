(function(){
  "use strict"
  app.service("ui",function(config, router, $timeout){

    var ui =  {
      ready : false,
      layout: {views: config.routes},
      router: router
    };

    $timeout(function(){
      ui.ready = true;
    }, 100);

    return ui;
  });
}).call(this);