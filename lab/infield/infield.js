(function(){
  "use strict"

  angular.module("infield", []).directive("infield", function(){
    return {
      restrict: 'C',
      scope: false,
      transclude: false,
      link: function(scope, element){
        var select = element.find("select");
        var input = element.find("input");
        var target = input.length ? input : select;

        target.attr("required") ? element.addClass("required") : "";

        scope.$watch(target.attr("ng-model"), function(val){
          val ? element.addClass("active") : element.removeClass("active");
        })
      }
    }
  })

}).call(this);