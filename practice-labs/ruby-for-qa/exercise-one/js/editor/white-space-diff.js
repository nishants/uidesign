(function(){
  "use strict"
  app.directive("whiteSpaceDiff", [function(){

    var formatWhiteSpace = function(json){
          return "<span>" + json.split(" ").join('</span><span class="white-space"></span><span>') + "</span>"
        },
        noWhiteSpace = function(json){
          return json.split(" ").join("");
    };

    return {
      restrict: "A",
      scope   : true,
      link    : function(scope, element, attrs){
        var whiteSpaceDiff = {};
        scope.$watch(attrs.whiteSpaceDiff, function(scenario){
          if(!scenario) return;
          var diffFound      = !scenario.success,
              expected       = JSON.stringify(scenario.expected),
              actual         = JSON.stringify(scenario.actual),
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