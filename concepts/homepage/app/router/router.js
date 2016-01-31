(function(){
  "use strict"
  app.service("router",function(View){
    return {
      load: function (url) {
        var viewName = url.split("/")[1].split("?")[0],
            urlQuery = url.split("/")[1].split("?")[1],
            stateId  = urlQuery ? urlQuery.split("state=")[1] : "";

        View.forName(viewName).load(stateId);
      }
    };
  });
}).call(this);