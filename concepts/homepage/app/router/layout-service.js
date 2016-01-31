(function () {
  "use strict"

  app.service("layout", function(config){
    var resize = function(){
            var layout       = $(".views").first();
            var viewHeight   = $("#app").height() - $("#top-bar").height();
            var viewWidth    = $("#app").width();

            layout.height( viewHeight);
            layout.width(config.routes.length * viewWidth);

            // resize the current view to app width
            $(window).trigger("hashchange");
          },
        switchTo = function (viewIndex, stateIndex) {
          var views = $(".views").first(),
              states = $(".view" + viewIndex + " > .states").first(),

              viewHeight = $("[layout]").first().height(),
              viewWidth = $("[layout]").first().width(),

              offsetView = viewIndex * viewWidth,
              offsetState = stateIndex * viewHeight;

          views.css("transform", "translateX(-" + offsetView + "px)");
          states.css("transform", "translateY(-" + offsetState + "px)");
        };

    return {
      resize : resize,
      switchTo: switchTo }
  });
}).call(this);