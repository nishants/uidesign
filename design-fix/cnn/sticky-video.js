(function () {
  "use strict"
  var leftOffset = function () {
        var collapseWidth     = 250,
            initialLeftOffset = 10;
        return $(window).width() - collapseWidth - initialLeftOffset;
      },
      StickyVideo = function ($container, $video) {
        this.$container = $container;
        this.$video     = $video;
      };

  StickyVideo.prototype.stick = function () {
    this.$container.addClass("fixed");
    this.$container.addClass("resize");
    this.$video.css("transform", "translateX(" + leftOffset() + "px)");
  };


  StickyVideo.prototype.unstick = function () {
    this.$container.removeClass("fixed");
    this.$container.removeClass("resize");
    this.$video.css("transform", "");
  };

  window.StickyVideo = StickyVideo;

}).call(this);