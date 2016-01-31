(function(){
  "use strict"
  app.service("ui",function(routesConfig, router, $timeout){

    var ui =  {
      ready : false,
      views: routesConfig.routes,
      router: router
    };

    $timeout(function(){
      ui.ready = true;
    }, 1000);

    return ui;
  });
}).call(this);