(function(){
  "use strict"
  var init = function(){
    var lastScrollTop = 0,
        readingOffset = 50,
        app = $("#app"),
        reading = function(){
          app.addClass("reading");
        },
        navigating = function(){
          app.removeClass("reading");
        };


    $("body").on("scroll", function(){
      var scollable = $(this),
          scrollTop = scollable.scrollTop(),
          nearTop = scrollTop < readingOffset,
          scrollingDown = scrollTop - lastScrollTop > 0;

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