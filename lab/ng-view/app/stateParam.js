(function(){
  "use strict"
  app.service("stateParam",function(){

    var routes = [{
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
        }];

    return {
      parse: function(url){
        var tokens = url.split("/");
        return {
          view: tokens[1],
          state:{
            name :tokens[3],
            pathParam: tokens[2],
          }
        };
      }
    };
  });
}).call(this);