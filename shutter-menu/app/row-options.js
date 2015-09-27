(function () {
  "use strict"

  module.directive("rowOptions", [function(){
    var RowOption = function(rowItem, $e){
      this.rowItem = rowItem;
      this.$e = $e;
    };
    RowOption.prototype.positionFromTop = function () {
      return this.$e.position().top;
    };

    return {
      restrict: 'A',
      transclude: false,
      scope: false,
      link: function(scope, element, attrs){
        var $e = $(element);

        $e.on("click", function(){
          scope.$apply(function(){
            scope.dataTable.showOptionsFor(new RowOption(scope.$eval(attrs.rowItem), $e));
          });
        });

      }
    }
  }]);

}).call(this);