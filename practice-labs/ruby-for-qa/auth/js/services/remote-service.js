auth.service("RemoteService", ["$timeout", "credentials", function ($timeout, credentials) {
  var app = firebase.initializeApp(credentials),
      onSignIn = function () {},
      onSignOut = function () {};

  var
      signIn = function (userEmail, userPassword) {
        return app.auth().signInWithEmailAndPassword(userEmail, userPassword);
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
      writeUserData = function (reference, value) {
        return app.database().ref(reference).set(value);
      },
      currentUser = function(){
        return app.auth().currentUser;
      };

  app.auth().onAuthStateChanged(function (user) {
    $timeout(function () {
      user ?  onSignIn(user) : onSignOut(user);
    });
  });

  return {
    firebase: app,
    signIn: signIn,
    signOut: signOut,
    createAccount: createAccount,
    writeUserData: writeUserData,
    currentUser: currentUser,
    onSignIn: function(callback){
      onSignIn = callback;
    },
    onSignOut: function(callback){
      onSignOut = callback;
    },
    resetPassword: function(emailAddress){
      return app.auth().sendPasswordResetEmail(emailAddress);
    },
    readUserData: function(reference){
        return app.database().ref(reference).once("value");
    }
  };
}]);
