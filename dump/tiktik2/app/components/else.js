(function () {
  "use strict"
  // shows when out of initial view port
  angular.module("tiktik").filter("else", [function(){
    return function(checkValue, elseValue){
      return checkValue ? checkValue : elseValue;
    };
  }]);

}).call(this);