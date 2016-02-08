(function(){
  "use strict"

  var init = function(){
    $("#navigation").html($("#top-bar").html());
    var scrollableContainer = $(window);
    scrollableContainer.on("scroll", function(){
      var toggleTopBar = $("#navigation").offset().top - $(window).scrollTop();
      toggleTopBar >= 0  ? $("#blog").removeClass("scrolled") : $("#blog").addClass("scrolled");
    })
  };

  window.app.NavBar = {
    init: init
  };
}).call(this);