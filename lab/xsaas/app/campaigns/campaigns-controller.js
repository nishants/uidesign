(function(){
  "use strict"
  app.controller("CampaignsController", function($scope, Campaigns){
    $scope.ui = {
      section  : 'show-campaigns',
      showMenu :  '',

      state    : function(){
        var state = "";
        state += this.section +" "   || "";
        state += this.showMenu  ? (this.showMenu + " show-menu ") : "";

        return state;
      },
      showCampaigns: function(){
        this.showMenu == 'show-campaigns-filter' ?this.showMenu = null : this.showMenu = 'show-campaigns-filter';
      },
      showAdsets: function(){
        this.showMenu == 'show-adsets-filter' ? this.showMenu = null : this.showMenu = 'show-adsets-filter';
      },
      showAds: function(){
        this.showMenu == 'show-ads-filter' ?this.showMenu = null : (this.showMenu = 'show-ads-filter');
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