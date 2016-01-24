(function () {
  "use strict"
  app.directive("layout", function ($timeout) {


    return {
      restrict: "A",
      scope: true,
      transclude: false,
      link: function(scope, element){
        var resize = function () {
          var viewWidth = $("#app").width(),
              routeContainers = element.find("[view]");
          element.css("width", viewWidth * routeContainers.length);
          for (var i = 0; i < routeContainers.length; i++) {
            var routeContainer = $(routeContainers[i]);
            routeContainer.width(viewWidth);
          }
        };

        $(window).on("resize", resize);

        scope.render = function(index){
          if (index == scope.ui.routes.length - 1){
            resize();
          }
        }
      }
    };
  });
}).call(this);