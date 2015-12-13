(function () {
  "use strict"

  Flipper.app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when("", "/book/nglarily");
     Flipper.pages.forEach(function(page){
       $stateProvider
           .state(page.name, {
             url: page.url,
             templateUrl:page.html,
             controller: page.controller
           });
     });
  });

}).call(this);