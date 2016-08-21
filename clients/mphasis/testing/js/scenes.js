(function(){
  "use strict"
  app.config(["$stateProvider",  "$urlRouterProvider",function($stateProvider,   $urlRouterProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider.state("scene", {
      url: "/scenes/:scene",
    });

  }])
}).call(this);