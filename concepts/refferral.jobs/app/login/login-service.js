(function(){
  "use strict"

  app.service("loginService", ["$q","$timeout", function($q, $timeout){
    var user = function(){
      return localStorage.user && JSON.parse(localStorage.user);
    };

    return {
      authenticate: function(){
        return $q(function(resolve, error){
          var email = user();
          $timeout(function(){
            email ? resolve(email) : error();
          }, 100)
        });
      }
    };
  }]);

}).call(this);