(function(){
  "use strict"
  app.service("router",function(View){
    return {
      load: function (url) {
        var viewName      = url.split("/")[1].split("?")[0],
            urlQuery      = url.split("/")[1].split("?")[1],
            stateParamID  = urlQuery ? urlQuery.split("state=")[1] : "{}",
            stateParams   = JSON.parse(decodeURIComponent(stateParamID)) ;

        View.forName(viewName).load(stateParams);
      }
    };
  });
}).call(this);