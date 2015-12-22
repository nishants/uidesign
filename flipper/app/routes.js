(function () {
  "use strict"

  Flipper.app.config(["$stateProvider", function ($stateProvider) {
    $stateProvider.state("home", {
      url: "/",
      templateUrl:"app/dress/home.html",
    }).state("dress", {
      url: "/dress",
      template:"<h1>transitioned ? </h1>",
    });
  }]);

}).call(this);