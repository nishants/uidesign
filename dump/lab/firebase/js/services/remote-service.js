app.service("RemoteService", ["credentials", function (credentials) {
  var app = firebase.initializeApp(credentials),
      onAuth = function () {},
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
    firebase: app,
    signIn: signIn,
    signOut: signOut,
    createAccount: createAccount,
    writeUserData: writeUserData,
    onAuth: setAuthCallback,
    currentUser: currentUser,
    resetPassword: function(emailAddress){
      return app.auth().sendPasswordResetEmail(emailAddress);
    }
  };
}]);
