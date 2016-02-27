(function(){
  "use strict"

  var app = angular.module("referral.jobs", []);
  var production = "http://referral-jobs.herokuapp.com",
      dev        = "http://localhost:5000";
  app.value("server", {address: dev});
  window.app = app;

}).call(this);