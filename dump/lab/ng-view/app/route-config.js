(function(){
  "use strict"
  var config =  {routes: [
    {
      name: "home",
      url : "home/",
      states: []
    },
    {
      name: "campaigns",
      url : "campaigns/",
      states : [
        {
          name : "",
          controller: "CampaignsController",
          template  : "app/campaigns/power-access.html"
        },
        {
          name : "publish",
          controller: "PublishCampaignController",
          template  : "app/campaigns/publish.html"
        },
        {
          name : "view",
          controller: "ViewCampaignController",
          template  : "app/campaigns/view.html"
        }
      ]
    },
    {
      name: "audiences",
      url : "audiences/",
      states: []
    },
    {
      name: "assets",
      url : "assets/",
      states: []
    },
    {
      name: "reports",
      url : "reports/",
      states: []
    },
    {
      name: "settings",
      url : "settings/",
      states: []
    }
  ]};
  app.value("routesConfig", config);
}).call(this);