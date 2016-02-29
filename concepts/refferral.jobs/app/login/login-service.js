(function(){
  "use strict"

  app.service("loginService", ["$q","$timeout", "localData", function($q, $timeout, localData){
    var loggedInUser = localData.getUser(),
        login = function(user){
          loggedInUser = user;
          localData.setUser(user);
        };

    return {
      login: function(email, password){
        return $q(function(resolve, error){
          var success = function(user){
                login(user);
                resolve(user);
              };
          $timeout(function(reponse){
            reponse = {user: {name: email, token: email}}
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