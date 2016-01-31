(function(){
  "use strict"
  app.service("router",function(View){
    return {
      load: function (url) {
        var viewName = url.split("/")[1].split("?")[0],
            urlQuery = url.split("/")[1].split("?")[1],
            stateParam  = urlQuery ? urlQuery.split("state=")[1] : "";

        View.forName(viewName).load(stateParam);
      }
    };
  });
}).call(this);