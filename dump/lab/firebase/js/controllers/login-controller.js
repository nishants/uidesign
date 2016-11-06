app.controller("LoginController", ["$scope", "RemoteService", "UserService", "$timeout", function ($scope, remoteService, userService, $timeout) {

  remoteService.onAuth(function (user) {
    $timeout(function () {
      user    && userService.setUser(user);
      !user   && userService.reset(user);
    });
  });

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
  var signupForm = {
    email: "nishant.singh87@gmail.com",
    password: "123456",
    error: null,
    onSignUpError: function (error) {
      $timeout(function () {
        signupForm.error = error.message;
        console.error(JSON.stringify(error.message));
      });
    },
    onSuccess: function (user) {
      $timeout(function () {
        console.log("Registered User : " + JSON.stringify(user));
      });
    },
    submit: function () {
      userService.signUp(signupForm.email, signupForm.password)
          .then(userService.sendVerificationMail)
          .then(signupForm.onSuccess)
          .catch(signupForm.onSignUpError);
    }
  };
  $scope.login = {
    form: loginForm
  };
  $scope.signup = {
    form: signupForm
  };

  $scope.user = userService;
}]);
