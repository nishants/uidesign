(function(){
  "use strict"
  app.factory("Campaigns", function($http){
    return {
      next: function(){
        return $http.get("api/campaigns.json").then(function(response){
          return response.data;
        });
      }
    };
  })
}).call(this);