(function(){
  "use strict"

  angular.module("infield", []).directive("infield", function(){
    return {
      restrict: 'C',
      scope: false,
      transclude: false,
      link: function(scope, element){
        var target = element.find("input");
        target.attr("required") ? element.addClass("required") : "";

        scope.$watch(target.attr("ng-model"), function(val){
          val ? element.addClass("active") : element.removeClass("active");
        })
      }
    }
  })

}).call(this);