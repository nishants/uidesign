(function(){
  "use strict"

  angular.module("select", []).directive("select", function(){
    return {
      restrict: 'C',
      scope: false,
      template: "<div class='select-cover' ng-transclude></div><div class='mask'> </div>",
      transclude: true,
      link: function(scope, element){
        var select = element;
        scope.$watch(select.attr("ng-model"), function(val){
          val ? element.addClass("active") : element.removeClass("active");
        })
      }
    }
  })

}).call(this);