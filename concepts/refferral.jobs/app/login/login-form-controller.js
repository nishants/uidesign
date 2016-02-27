(function(){
  "use strict"

  app.controller("loginFormController", ['$scope', 'loginService', function($scope, loginService){
    var loginForm = {
      email: null,
      password: null,
      submit: function(){
        var loginSuccess = function(user){
              console.log("logged in as " + user.name);
            },
            loginFailed  = function(){
              console.error("invalid credentials");
            };

        loginService.login(this.email, this.password).then(loginSuccess, loginFailed);
      }
    };

    $scope.loginForm = loginForm;

  }])

}).call(this);