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
