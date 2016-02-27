(function(){
  "use strict"

  app.service("loginService", ["$q", function($q){
    var user = function(){
      return localStorage.user && JSON.parse(localStorage.user);
    };

    return {
      authenticate: function(){
        return $q(function(resolve, error){
          var email = user();
          email ? resolve(email) : error();
        });
      }
    };
  }]);

}).call(this);