(function () {
  "use strict"

  Flipper.app.config(function ($stateProvider) {
    $stateProvider.state("home", {
          url: "",
          templateUrl:"app/dress/home.html",
        });
  });

}).call(this);