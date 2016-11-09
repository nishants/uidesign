auth.service("UserService", ["RemoteService", "$timeout", "uiService", function (remoteService, $timeout, uiService) {
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
      uiService.splash = false;
      return user;

    },
    reset: function (user) {
      service.id      = null;
      service.name    = null;
      service.profile   = null;

      service.emailVerified = false;
      uiService.splash = false;
      return user;
    },
    sendVerificationMail: function(){
      return remoteService.currentUser().sendEmailVerification();
    },
    signIn: function (userEmail, userPassword) {
      return remoteService.signIn(userEmail, userPassword);
    },
    signOut: function () {
      return remoteService.signOut();
    },
    signUp: function (userEmail, userPassword) {
      return remoteService.createAccount(userEmail, userPassword);
    },
    updateProfile: function (name, picture) {
      return remoteService.writeUserData('users/' + service.id + "/profile", {
        name: name,
        picture: picture
      }).then(function () {
        service.name = name;
        service.picture = picture;
      });
    },
    saveTask: function (taskId, value) {
      return remoteService.writeUserData('users/' + service.id + "/tasks/" + taskId, value);
    },
    getTask: function (taskId) {
      return remoteService.readUserData('users/' + service.id + "/tasks/" + taskId).then(function(snapshot){
        return snapshot.val();
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

  remoteService.onSignIn(service.setUser);
  remoteService.onSignOut(service.reset);

  return service;
}]);
