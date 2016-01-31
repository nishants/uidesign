(function(){
  "use strict"
  app.service("ui",function(routesConfig, router, $timeout){

    var ui =  {
      ready : false,
      layout: {views: routesConfig.routes},
      router: router
    };

    $timeout(function(){
      ui.ready = true;
    }, 1000);

    return ui;
  });
}).call(this);