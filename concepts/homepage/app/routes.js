(function(){
  "use strict"
  var router =  {routes: [
    {
      name: "home",
      url : "home/"
    },
    {
      name: "campaigns",
      url : "campaigns/",
      sections : [
        {
          url : "",
          controller: "CampaignsController",
          template  : "app/campaigns/power-access.html"
        },
        {
          url : ":id/publish",
          controller: "PublishCampaignController",
          template  : "app/campaigns/publish.html"
        },
        {
          url : ":id/view",
          controller: "ViewCampaignController",
          template  : "app/campaigns/view.html"
        }
      ]
    },
    {
      name: "audiences",
      url : "audiences/"
    },
    {
      name: "assets",
      url : "assets/"
    },
    {
      name: "reports",
      url : "reports/"
    },
    {
      name: "settings",
      url : "settings/"
    }
  ]};
  app.value("router", router);
}).call(this);