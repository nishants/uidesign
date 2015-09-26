(function () {
  "use strict"
  // shows when out of initial view port
  module.directive("stickTo", [function(){
    return {
      restrict: 'A',
      transclude: false,
      scope: false,
      link: function(scope, element, attrs){
        var target = $("#" + attrs.stickTo);
        target.hide();
        target.html("");
        target.append($(element).clone());

        $(window).bind("scroll", function () {
          this.pageYOffset > 100 ? target.show() : target.hide();
        });
      }
    }
  }]);

}).call(this);