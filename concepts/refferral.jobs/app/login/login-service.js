(function(){
  "use strict"

  app.service("loginService", ["$q", function($q){
    return {
      authenticate: function(){
        return $q(function(resolve, error){
          var email = "nishant.singh87@gmail.com";
          resolve(email);
        });
      }
    };
  }]);

}).call(this);