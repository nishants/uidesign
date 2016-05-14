(function(){
  "use strict"
  var init = function(){
    var lastScrollTop = 0,
        readingOffset = 100,
        topBarHeight = 85,
        introOutAt = $(window).height() - topBarHeight - 60,
        app = $("#app"),
        reading = function(){
          app.addClass("reading");
        },
        navigating = function(){
          app.removeClass("reading");
        };


    $(window).on("scroll", function(){
      var scollable    = $(this),
          scrollTop     = scollable.scrollTop(),
          nearTop       = scrollTop < readingOffset,
          doneIntro     = introOutAt < scrollTop,
          scrollingDown = scrollTop - lastScrollTop > 0;

      doneIntro ? app.removeClass("intro") : app.addClass("intro");

      (!nearTop && scrollingDown) ? reading() : navigating();
      lastScrollTop = scrollTop;
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