(function(){
  "use strict"

  app.service("loginService", ["$q","$timeout", function($q, $timeout){
    var loggedInUser = localStorage.user && JSON.parse(localStorage.user);

    return {
      login: function(email, password){
        return $q(function(resolve, error){
          var success = function(user){
                loggedInUser = user;
                resolve(user);
              };
          $timeout(function(reponse){
            reponse = {user: {name: "loggedIn"}}
            email ? success(reponse.user) : error();
          }, 100)
        });
      },
      lastSession: function(){
        return $q(function(resolve, error){
          $timeout(function(){
            loggedInUser ? resolve(loggedInUser) : error();
          }, 100)
        });
      }
    };
  }]);

}).call(this);