(function () {
  "use strict"

  module.directive("rowOptionsFor", ["RowOption", function (RowOption) {

    return {
      restrict: 'A',
      transclude: false,
      scope: false,
      link: function (scope, element, attrs) {
        var $e = $(element);

        $e.on("click", function () {
          scope.$apply(function () {
            scope.dataTable.showOptionsFor(RowOption.new(scope.$eval(attrs.rowOptionsFor), $e));
          });
        });
      }
    }
  }]);

}).call(this);