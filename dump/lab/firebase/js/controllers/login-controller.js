app.controller("LoginController", ["$scope", "RemoteService", "UserService", "$timeout", function ($scope, remoteService, userService, $timeout) {
  var loginForm = {
    email: "nishant.singh87@gmail.com",
    password: "123456",
    onSuccess: function (user) {
      $timeout(function () {
        console.log("logged in" + JSON.stringify(user));
      });
    },
    submit: function () {
      userService.signIn(loginForm.email, loginForm.password).then(loginForm.onSuccess);
    }
  };
  $scope.login = {
    form: loginForm
  };
}]);
