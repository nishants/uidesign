(function(){
  "use strict"
  app.controller("CampaignsTable", function($http, $scope){

    var campaigns = {
      all: []
    };

    $http.get("api/campaigns.json").then(function(response){
      campaigns.all =  response.data;
    });

    $scope.campaigns = campaigns;
  })
}).call(this);