(function(){
  "use strict"
  app.service("router",function(View){
    return {
      load: function (url) {
        var contextName = url.split("/")[1].split("?")[0],
            urlQuery = url.split("/")[1].split("?")[1],
            stateId  = urlQuery ? urlQuery.split("state=")[1] : "";

        View.forName(contextName).load(stateId);
      }
    };
  });
}).call(this);