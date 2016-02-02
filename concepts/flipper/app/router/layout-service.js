(function () {
  "use strict"

  app.service("layout", function(config){
    var resize = function(){
            var layout       = $(".views").first();
            var viewHeight   = $("#app").height() - $("#top-bar").height();
            var viewWidth    = $("#app").width();
            var views        = $(".views > .view");

            layout.height( viewHeight);
            layout.width(config.routes.length * viewWidth);
            views.width(viewWidth);

            // resize the current view to app width
            $(window).trigger("hashchange");
          },
        positionNavigationIndicator = function(name){
          var target = $(".navigation > li." + name).first(),
              pointer = $(".navigation-pointer").first(),
              padding  = 20,
              show = function () {
                pointer.css("opacity", "1");
                pointer.css("transform", "translateX(" + (target.position().left + padding/2) + "px)");
                pointer.width(target.innerWidth() - padding);
              },
              hide = function () {
                pointer.css("opacity", "0");
              };
          target.length ? show(): hide();

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
          positionNavigationIndicator(config.routes[viewIndex].name);
        };

    return {
      resize : resize,
      switchTo: switchTo }
  });
}).call(this);