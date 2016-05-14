(function(){
  "use strict"
  var init = function(){
    var lastScrollTop   = 0,
        readingOffset   = 100,
        topBarHeight    = 85,
        introOutAt      = $(window).height() - topBarHeight - 60,
        app = $("#app"),
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
console.log("routes")
}).call(this);