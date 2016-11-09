auth.controller("SignUpController", ["$scope", "RemoteService", "UserService", "$timeout", function ($scope, remoteService, userService, $timeout) {
  var signupForm = {
    email: "",
    password: "",
    cpassword: "",
    error: null,
    errors: {},
    onSignUpError: function (error) {
      $timeout(function () {
        signupForm.error = error.message;
        //console.error(JSON.stringify(error.message));
      });
    },
    onSuccess: function (user) {
      $timeout(function () {
        //console.log("Registered User : " + JSON.stringify(user));
      });
    },
    submit: function () {
      signupForm.error = "";
      userService.signUp(signupForm.email, signupForm.password)
          .then(userService.sendVerificationMail)
          .then(signupForm.onSuccess)
          .catch(signupForm.onSignUpError);
    },
    validate: function(){
      signupForm.errors = {
        passwordMismatch: (signupForm.cpassword != signupForm.password)  && !$scope.signUpForm.cpassword.$pristine,
      };
    }
  };

  $scope.signup = {
    form: signupForm
  };

  $scope.user = userService;
}]);
