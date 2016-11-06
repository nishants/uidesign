app.controller("SignUpController", ["$scope", "RemoteService", "UserService", "$timeout", function ($scope, remoteService, userService, $timeout) {
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

  $scope.signup = {
    form: signupForm
  };

  $scope.user = userService;
}]);
