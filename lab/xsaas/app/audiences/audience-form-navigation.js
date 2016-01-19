(function () {
  "use strict"
  app.directive("editor", function () {

    return {
      restrict: "C",
      scope: false,
      transclude: false,
      link: function(scope, element){
        var scrollable = $(element).find(".scrollable").first();
        scope.goto = function(targetId){
          var target = scrollable.find("#" + targetId);
          var scrollTop = scrollable.scrollTop() ? target.offset().top - target.height() + scrollable.scrollTop() : target.offset().top - target.height();
          console.log("scrollable.scrollTop(): "+scrollable.scrollTop() +", target.offset().top: "+ target.offset().top);
          scrollable.animate({scrollTop: scrollTop}, 500);
        }
      }
    };
  });
}).call(this);