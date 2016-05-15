(function(){
  "use strict"
  var app = angular.module("amoeba", []);
  window.app = app;
}).call(this);
(function(){
  "use strict"
console.log("routes")
}).call(this);
(function(){
  "use strict"
  var init = function(){
    var lastScrollTop   = 0,
        readingOffset   = 100,
        topBarHeight    = 85,
        introOutAt      = $(window).height() - topBarHeight - 60,
        app             = $("#app"),
        reading = function(){
          app.addClass("reading");
        },
        navigating = function(){
          app.removeClass("reading");
        };


    var handleScroll = function (scollable) {
      var scrollTop = scollable.scrollTop(),
          nearTop = scrollTop < readingOffset,
          doneIntro = introOutAt < scrollTop,
          scrollingDown = scrollTop - lastScrollTop > 0;

      doneIntro ? app.removeClass("intro") : app.addClass("intro");

      (!nearTop && scrollingDown) ? reading() : navigating();
      lastScrollTop = scrollTop;
    };

    $("#top-fixed-bar").on("mouseenter",navigating);

    $(window).on("scroll", function(){
      handleScroll($(this));
    });
  };

  $(document).ready(function(){
    init();
  });

}).call(this);
(function(){
  "use strict"
  app.directive("slate", [function () {
    var select = function (index) {
          var card = $($(".deck > li")[index]),
              offsetPadding = 10,
              offsetY = $(".deck").offset().top - card.offset().top,
              offsetX = $(".deck").offset().left - card.offset().left;

          card.css("transform", "translateY(" + (offsetY + offsetPadding) + "px)" + "translateX(" + (offsetX + offsetPadding) + "px)");
          $("body").css("overflow", "hidden")
        },
        unSelect = function (index) {
          var card = $($(".deck > li")[index]);
          card.css("transform", "");
          $("body").css("overflow", "auto")
        };
    return {
      restrict: "C",
      scope: true,
      transclude: false,
      link: function (scope, element, attrs) {
        scope.$watch("deck.current", function (now, previous) {
          now != -1 && select(now);
          previous != -1 && unSelect(previous);
          setTimeout(function(){
            $("body").stop().animate({scrollTop:$(element).offset().top}, '500', 'swing');
          },100);
        });
      }
    };
  }]);

}).call(this);