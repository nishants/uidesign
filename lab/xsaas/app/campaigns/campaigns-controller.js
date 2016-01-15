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

      __showSection: function(section){
        this.__split = false;
        this.section = section;
      },

      __showFilter: function(filter){
        this.showMenu == filter ? this.showMenu = '' : this.showMenu = filter;
      },

      showCampaigns: function(){
        this.__showSection('show-campaigns');
      },

      showAdsets: function(){
        this.__showSection('show-adsets');
      },

      showAds: function(){
        this.__showSection('show-ads');
      },

      showCampaignsFilter: function(){
        this.__showFilter('show-campaigns-filter');
      },
      showAdsetsFilter: function(){
        this.__showFilter('show-adsets-filter');
      },
      showAdsFilter: function(){
        this.__showFilter('show-ads-filter');
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