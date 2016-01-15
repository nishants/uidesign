(function(){
  "use strict"
  app.controller("CampaignsController", function($scope, Campaigns){
    $scope.ui = {
      section  : 'show-campaigns',
      showMenu :  '',
      __split  : false,

      split    : function(){
        this.__split = !this.__split;
      },

      state    : function(){
        var state = "";
        state += this.section +" "   || "";
        state += this.showMenu  ? (this.showMenu + " show-menu ") : "";

        return this.__split ? "split" : state;
      },
      showCampaignsFilter: function(){
        this.showMenu == 'show-campaigns-filter' ?this.showMenu = null : this.showMenu = 'show-campaigns-filter';
      },
      showAdsetsFilter: function(){
        this.showMenu == 'show-adsets-filter' ? this.showMenu = null : this.showMenu = 'show-adsets-filter';
      },
      showAdsFilter: function(){
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