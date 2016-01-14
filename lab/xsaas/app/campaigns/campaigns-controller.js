(function(){
  "use strict"
  app.controller("CampaignsController", function($scope, Campaigns){
    $scope.Campaigns = {
      data : [],
    };
    Campaigns.next().then(function(campaigns){
      $scope.campaigns = campaigns;
    });

  })
}).call(this);