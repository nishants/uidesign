(function(){
  "use strict"

  angular.module("select", []).directive("select", function(){
    return {
      restrict: 'C',
      scope: true,
      template: "<div class='select-cover' ng-transclude></div><div class='mask'><div class='value' ng-bind='select.value'></div><div class='icon fa fa-chevron-down'></div>",
      transclude: true,
      link: function(scope, element){
        var select = element.find("select");
        scope.$watch(select.attr("ng-model"), function(val){
          scope.select = {value : val[element.attr("display")]};
        })
      }
    }
  })

}).call(this);