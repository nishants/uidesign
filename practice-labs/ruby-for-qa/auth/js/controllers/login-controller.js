auth.controller("LoginController", ["$scope", "RemoteService", "UserService", "$timeout", function ($scope, remoteService, userService, $timeout) {
  var loginForm = {
    email   : "",
    password: "",
    error   : "",
    onSuccess: function (user) {
      $timeout(function () {
        //console.log("logged in" + JSON.stringify(user));
      });
    },
    onError: function(error){
      $timeout(function () {
        loginForm.error = error.message;
      });
    },
    submit: function () {
      loginForm.error = "";
      userService.signIn(loginForm.email, loginForm.password).then(loginForm.onSuccess).catch(loginForm.onError);
    }
  };
  $scope.login = {
    form: loginForm
  };
}]);
