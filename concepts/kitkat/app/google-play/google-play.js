
var swipedOut = function($wrapper){
  $wrapper.addClass("swiped-out");
}, threshold = 100;

var swipingOut = function($e){
  $e.addClass("swiping-out")
};
var notSwipingOut = function($e){
  $e.removeClass("swiping-out")
};
var swipeEnds = function(wrapper, target){
  target.css("transform", "" );// allow transfrom through css class to apply
  wrapper.removeClass("swiping-out");
};

var touchedAt = function (e) {
  return e.originalEvent.touches[0].pageX
};

var Wrapper = function($e){
  this.$e = $e;
  var wrapper = this;
  var swipable = $e.find(".swipable").first();
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

var Swiper = function($e){
  $e.find("li").each(function(i, swipable){
    new Wrapper($(swipable));
  });
};
$(document).ready(function(){
  new Swiper($(".swiper").first());
});
