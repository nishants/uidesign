(function () {
  "use strict"
  // shows when out of initial view port
  module.directive("sticky", [function(){
    return {
      restrict: 'A',
      transclude: false,
      scope: false,
      link: function(scope, element, attrs){
        $(window).bind("scroll", function () {
          this.pageYOffset > 100 ? element.show() : element.hide();
        });
      }
    }
  }]);

}).call(this);