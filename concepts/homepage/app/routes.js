(function(){
  "use strict"
  var router =  {routes: [
    {
      name: "campaigns",
      url : "campaigns/"
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