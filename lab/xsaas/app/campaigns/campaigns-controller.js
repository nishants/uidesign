(function(){
  "use strict"
  app.controller("CampaignsController", function($scope, Campaigns){
    $scope.ui = {
      section  : 'show-campaigns',
      showMenu :  '',
      showCampaigns: function(){
        this.showMenu == 'show-campaigns-filter' ?this.showMenu = null : this.showMenu = 'show-campaigns-filter';
      }
    };

    $scope.Campaigns = {
      data : [],
    };
    Campaigns.next().then(function(campaigns){
      $scope.campaigns = campaigns;
    });

  })
}).call(this);