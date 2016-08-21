(function(){
  "use strict"
  app.config(["$stateProvider",  "$urlRouterProvider",function($stateProvider,   $urlRouterProvider){
    $urlRouterProvider.otherwise('/');
    $stateProvider.state("show-app-flow", {
      url: "/dev-view",
    });
    $stateProvider.state("show-blackbox-tester-view", {
      url: "/blackbox-tester-view",
    });

  }])
}).call(this);