(function(){
  "use strict"

  app.controller("UIController", ['$scope', 'loginService', function($scope, loginService){

    var ui = {
      ready: false,
      login: false,
      loadSession: function () {
        var ui = this,
            sessionFound = function (user) {
              ui.user  = user;
              ui.ready = true;
            },
            noSession = function () {};

        loginService.authenticate().then(sessionFound, noSession);
      },
    };
    $scope.ui = ui;
  }])

}).call(this);