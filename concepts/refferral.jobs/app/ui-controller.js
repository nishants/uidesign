(function(){
  "use strict"

  app.controller("UIController", ['$scope', 'loginService', function($scope, loginService){

    var ui = {
      ready: false,
      login: false,
      state: "",
      loadSession: function () {
        var ui = this,
            sessionFound = function (user) {
              ui.user  = user;
              ui.ready = true;
              ui.state = "ready";
            },
            noSession = function () {
              ui.state = "login";
            };

        loginService.authenticate().then(sessionFound, noSession);
      },
    };
    $scope.ui = ui;
  }])

}).call(this);