

var app = angular.module("fired-up", []);

app.value("credentials", {
  apiKey: "AIzaSyAt3rD67xE5KvwyAk645-tRrKDAG3KH_jY",
  authDomain: "programmers-4d280.firebaseapp.com",
  databaseURL: "https://programmers-4d280.firebaseio.com",
  storageBucket: "programmers-4d280.appspot.com",
  messagingSenderId: "188124641306"
})

app.service("RemoteService", ["credentials", function (credentials) {
  var app = firebase.initializeApp(credentials),
      onAuth = function () {
      },
      setAuthCallback = function (callback) {
        onAuth = callback;
      };

  app.auth().onAuthStateChanged(function (user) {
    onAuth(user)
  });

  var
      signIn = function (userEmail, userPassword) {
        return app.auth().signInWithEmailAndPassword(userEmail, userPassword)
            .catch(function (error) {
              console.error(error.message);
            });
      },
      signOut = function (userEmail, userPassword) {
        return app.auth().signOut()
            .catch(function (error) {
              console.error(error.message);
            });
      },
      createAccount = function (userEmail, userPassword) {
        return app.auth().createUserWithEmailAndPassword(userEmail, userPassword);
      },
      writeUserData = function (userId, name, picture) {
        return app.database().ref('users/' + userId + "/profile").set({
          name: name,
          picture: picture
        });
      },
      currentUser = function(){
        return app.auth().currentUser;
      };

  return {
    signIn: signIn,
    signOut: signOut,
    createAccount: createAccount,
    writeUserData: writeUserData,
    onAuth: setAuthCallback,
    currentUser: currentUser,
  };
}]);

app.service("UserService", ["RemoteService", function (remoteService) {
  var service = {
    id: null,
    name: null,
    email: null,
    picture: null,
    emailVerified: false,
    setUser: function (user) {
      service.id      = user.uid;
      service.name    = user.displayName;
      service.email   = user.email;

      service.emailVerified = user.emailVerified;
      return user;
    },
    reset: function (user) {
      service.id      = null;
      service.name    = null;
      service.email   = null;
      service.picture = null;

      service.emailVerified = false;
      return user;
    },
    sendVerificationMail: function(){
      return remoteService.currentUser().sendEmailVerification();
    },
    signIn: function (userEmail, userPassword) {
      return remoteService.signIn(userEmail, userPassword).then(service.setUser);
    },
    signOut: function () {
      return remoteService.signOut().then(service.reset);
    },
    signUp: function (userEmail, userPassword) {
      return remoteService.createAccount(userEmail, userPassword).then(service.setUser);
    },
    updateProfile: function (name, picture) {
      return remoteService.writeUserData(user.id, name, picture)
          .then(function () {
            user.name = name;
            user.picture = picture;
          });
    }
  };
  return service;
}]);

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

