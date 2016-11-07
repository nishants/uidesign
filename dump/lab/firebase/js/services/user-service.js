app.service("UserService", ["RemoteService", "$timeout", function (remoteService, $timeout) {
  var service = {
    id: null,
    name: null,
    email: null,
    picture: null,
    emailVerified: false,
    profile: null,
    setUser: function (user) {
      service.id      = user.uid;
      service.name    = user.displayName;
      service.email   = user.email;

      service.emailVerified = user.emailVerified;
      remoteService.firebase.database().ref('/users/' + user.uid +'/profile').once('value').then(function (snapshot) {
        var profile = snapshot.val();
            $timeout(function () {
              service.profile = profile;
            });
      });
      //remoteService.firebase.database().ref('/users/' + user.uid +'/profile').on('value', function (snapshot) {
      //  var profile = snapshot.val();
      //      $timeout(function () {
      //        service.profile = profile;
      //      });
      //});
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
      return remoteService.writeUserData(service.id, name, picture)
          .then(function () {
            service.name = name;
            service.picture = picture;
          });
    },
    resetPassword: function(){
      return remoteService.resetPassword(service.email).then(function() {
        console.log("password reset mail sent")
      }, function(error) {
        console.error("password reset failed"+ error)
      })
    }
  };

  remoteService.onAuth(function (user) {
    $timeout(function () {
      user    && service.setUser(user);
      !user   && service.reset(user);
    });
  });

  return service;
}]);
