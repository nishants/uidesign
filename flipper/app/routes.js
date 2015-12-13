(function () {
  "use strict"

  Flipper.app.config(function ($stateProvider) {
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