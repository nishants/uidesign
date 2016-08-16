(function(){
  "use strict"
  app.directive("whiteSpaceDiff", [function(){

    var formatWhiteSpace = function(value){
          return "<span>" + JSON.stringify(value).split(" ").join('</span><span class="white-space"></span><span>') + "</span>"
        },
        noWhiteSpace = function(value){
          return JSON.stringify(value).split(" ").join("");
        };

    return {
      restrict: "A",
      scope   : true,
      link    : function(scope, element, attrs){
        var whiteSpaceDiff = {};
        scope.$watch(attrs.whiteSpaceDiff, function(scenario){
          if(!scenario) return;
          var diffFound      = !scenario.success,
              expected       = scenario.expected,
              actual         = scenario.actual,
              whiteDiffFound = diffFound && (noWhiteSpace(expected) === noWhiteSpace(actual));

          if(whiteDiffFound){
            expected = formatWhiteSpace(expected);
            actual   = formatWhiteSpace(actual);
          }

          whiteSpaceDiff.expected = expected;
          whiteSpaceDiff.actual   = actual;
        });

        scope.whiteSpaceDiff = whiteSpaceDiff;
      }
    };
  }]);

}).call(this);