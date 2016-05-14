(function () {
  "use strict"

  var remote = {
        "localhost": "http://localhost:5000",
        "amoeba.social": "http://referral-jobs.herokuapp.com",
      },
      app = angular.module("referral.jobs", []);

  app.value("server", {address: remote[window.location.hostname]});
  window.app = app;

}).call(this);