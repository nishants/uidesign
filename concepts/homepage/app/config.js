(function(){
  "use strict"
  var config =  {routes: [
    {
      name: "home",
      url : "home/",
      states: [{
        name : "",
        controller: "CampaignsController",
        html  : ""
      }]
    },
    {
      name: "campaigns",
      url : "campaigns/",
      states : [
        {
          name : "",
          controller: "CampaignsController",
          html  : "app/campaigns/turbo-editor.html"
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
      states: [{name : "",}]
    },
    {
      name: "assets",
      url : "assets/",
      states: [{name : "",}]
    },
    {
      name: "reports",
      url : "reports/",
      states: [{name : "",}]
    },
    {
      name: "settings",
      url : "settings/",
      states: [{name : "",}]
    }
  ]};
  app.value("config", config);
}).call(this);