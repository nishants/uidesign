(function(){
  "use strict"

  app.service("mailService",["$http", "server", function($http, server){
    var url = server.address + "/emails";

    return {
      mailsFor: function(emailId){
        return $http.get(url);
      }
    };
  }])
}).call(this);