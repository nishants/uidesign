(function () {
  "use strict"
  var
      animationDuration = 250,
      moveToY = function ($e, yPosition) {
        return $e.animate({
          left: 0,
          top: yPosition,
        }, animationDuration).promise();
      },
      totalHeightOf = function ($e) {
        return $e.height() + parseInt($e.css("padding-bottom")) + parseInt($e.css("padding-top"));
      },
      MenuContainer = function ($container) {
        this.$e = $container;
        this.$e.css("position", "fixed");
      };
  MenuContainer.prototype.hide = function () {
    return moveToY(this.$e, -totalHeightOf(this.$e));
  };

  MenuContainer.prototype.flipBars = function (topBar, bottomBar) {
    topBar.show();
    topBar.bringToFront();
    bottomBar.sendToBack();
    bottomBar.hide();
    return topBar.insertBefore(bottomBar);
  };

  MenuContainer.prototype.show = function () {
    return moveToY(this.$e, 0);
  };

  MenuContainer.prototype.showOnHover = function (bar) {
    this.$e.off();
    this.$e.hover(function () {
      bar.show();
    }, function () {
      bar.hide();
    });
  };


  window.MenuContainer = MenuContainer;

}).call(this);