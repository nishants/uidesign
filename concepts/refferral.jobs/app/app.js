(function(){
  "use strict"

  var app = angular.module("referral.jobs", []);
  app.value("server", {address: "referral-jobs.herokuapp.com"});
  window.app = app;

}).call(this);