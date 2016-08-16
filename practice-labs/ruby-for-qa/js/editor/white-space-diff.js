(function(){
  "use strict"
  app.directive("whiteSpaceDiff", [function(){

    var formatWhiteSpace = function(value){
      return "<span>" + JSON.stringify(value).split(" ").join('</span><span class="white-space"></span><span>') + "</span>"
    };

    return {
      restrict: "A",
      scope   : true,
      link    : function(scope, element, attrs){
        var whiteSpaceDiff = {};
        scope.$watch(attrs.whiteSpaceDiff, function(scenario){
          if(!scenario) return;
          var isDifferent    = !scenario.success,
              expected       = isDifferent ? JSON.stringify(scenario.expected).split(" ").join("") : scenario.expected,
              actual         = isDifferent ? JSON.stringify(scenario.actual).split(" ").join("")   : scenario.actual,
              whiteDiffFound = (expected === actual);

          if(whiteDiffFound){
            expected = formatWhiteSpace(scenario.expected);
            actual   = formatWhiteSpace(scenario.actual);
          }

          whiteSpaceDiff.expected = expected;
          whiteSpaceDiff.actual   = actual;
        });

        scope.whiteSpaceDiff = whiteSpaceDiff;
      }
    };
  }]);

}).call(this);