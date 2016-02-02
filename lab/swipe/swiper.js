(function(){
  "use strict"

  var Wrapper = function($e, index, params){
    this.$e = $e;
    var threshold = params.threshold ? params.threshold : 100;
    var wrapper = this;
    var swipable = $e.find(".swipable").first();

    var swipedOut = function($wrapper){
      $wrapper.addClass("swiped-out");
      params.onSwipeOut();
    };

    var swipingOut = function($e){
      $e.addClass("swiping-out");
      params.whileSwipingOut(index);
    };
    var notSwipingOut = function($e){
      $e.removeClass("swiping-out");
      params.onSwipeCancel(index);
    };
    var swipeEnds = function(wrapper, target){
      target.css("transform", "" );// allow transfrom through css class to apply
      wrapper.removeClass("swiping-out");
    };

    var touchedAt = function (e) {
      return e.originalEvent.touches[0].pageX
    };

    $e.on('touchstart', function (e) {
      wrapper.startAt = touchedAt(e);
    });

    $e.on('touchmove', function (e) {
      wrapper.swipedTo = touchedAt(e);
      var swipeDistance = wrapper.startAt - wrapper.swipedTo;
      swipable.css("transform", "translateX(-"+ swipeDistance + "px)" );
      swipeDistance > threshold ? swipingOut(wrapper.$e) : notSwipingOut(wrapper.$e);
    });

    $e.on('touchend', function (e) {
      var swipeDistance = wrapper.startAt - wrapper.swipedTo;
      swipeDistance > threshold ? swipedOut(wrapper.$e) : "";
      swipeEnds(wrapper.$e, $(swipable));
    });
  };

  var Swiper = function($e, params){
    $e.find("li").each(function(index, swipable){
      new Wrapper($(swipable), index, params);
    });
  };

  var swiper = angular.module("swiper", []);
  angular.module("swiper").directive("swiper", function(){
    return {
      restrict     : "C",
      scope        : true,
      transclude   : false,
      link : function(scope, element, attrs){
        scope.swiper = {
          actionIndex: -1
        };
        new Swiper($(element), {
          threshold: 100,
          onSwipeCancel : function(){
            scope.$eval(attrs.onSwipeCancel);
          },
          whileSwipingOut: function(index){
            scope.swiper.actionIndex = index;
            scope.$eval(attrs.whileSwipingOut);
          },
          onSwipeOut : function(){
            scope.$eval(attrs.onSwipeOut)
          },
        });
      }
    };
  });
}).call(this);