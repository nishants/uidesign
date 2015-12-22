(function () {
  "use strict"

  Flipper.app.config(["$stateProvider", function ($stateProvider) {
    $stateProvider.state("home", {
      url: "",
      templateUrl:"app/dress/home.html",
    }).state("upload", {
      url: "/upload",
      templateUrl:"app/upload/upload.html",
      controller: "UploadController"
    });
  }]);

}).call(this);