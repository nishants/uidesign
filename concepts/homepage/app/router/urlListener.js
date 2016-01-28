(function(){
  "use strict"
  app.service("urlListener",function(routes, $location, router){
    $(window).on("hashchange", function(url){
      router.load($location.url());
      update();
    });

    $(window).trigger("hashchange");
  });
}).call(this);