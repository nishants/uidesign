(function () {
  "use strict"
// shows when out of initial view port
  module.directive("hideMenuWhileReading", ["shutterMenu", function(shutterMenu){

    //inviewalso if true, scroll event are fired, even when user has not scrolled down below the initial viewport
    var ScrollingOutsideTopPage = function(onScrollUp, onScrollDown){
      var lastPosition = 0,
          lastUp = false,
          onUp = function () {
            lastUp = true;
            onScrollUp();
          },
          onDown = function () {
            lastUp = false;
            onScrollDown();
          },
          doNothing = function (){};

      var scrolledTo = function(position) {
        var goingUp = position < lastPosition
        lastPosition = position;

        goingUp != lastUp ? (goingUp ? onUp()  : onDown()) : doNothing();
      };

      $(window).load(function () {
        $(window).on("scroll", function () {
          if(window.pageYOffset < 100) return;
          scrolledTo(window.pageYOffset);
        });

      });
    };
    return {
      restrict: 'A',
      transclude: false,
      scope: false,
      link: function () {
        new ScrollingOutsideTopPage(function(){
          shutterMenu.show();
        }, function(){
          shutterMenu.hide();
        });
      }
    };
  }]);

}).call(this);