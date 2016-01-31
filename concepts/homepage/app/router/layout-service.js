(function () {
  "use strict"

  app.service("layout", function(){
    return {
      switchTo: function (viewIndex, stateIndex) {
        var views = $(".views").first(),
            states = $(".view" + viewIndex + " > .states").first(),

            viewHeight = $("[layout]").first().height(),
            viewWidth = $("[layout]").first().width(),

            offsetView = viewIndex * viewWidth,
            offsetState = stateIndex * viewHeight;

        views.css("transform", "translateX(-" + offsetView + "px)");
        states.css("transform", "translateY(-" + offsetState + "px)");
      }
    }
  });
}).call(this);