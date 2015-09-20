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
      totalHeightOf = function($e){
        return $e.height() + parseInt($e.css("padding-bottom")) + parseInt($e.css("padding-top"));
      },
      MenuBar = function($bar, topClass, backClass){
        this.$e = $bar;
        this.topClass = topClass;
        this.backClass = backClass;
      },
      Menu = function ($titleBar, $appMenu, $contextMenu, topBarClass, bottomBarClass) {
        this.$menuContainer = $titleBar;

        this.$topMenu = new MenuBar($appMenu, topBarClass, bottomBarClass);
        this.$bottomMenu = new MenuBar($contextMenu, topBarClass, bottomBarClass);

        this.topBarClass    = topBarClass;
        this.bottomBarClass = bottomBarClass;

        this.containerHeight = $titleBar.height();
      };

  MenuBar.prototype.bringToFront = function() {
    this.$e.removeClass(this.backClass);
    this.$e.addClass(this.topClass);
  };

  MenuBar.prototype.sendToBack = function() {
    this.$e.removeClass(this.topClass);
    this.$e.addClass(this.backClass);
  };

  MenuBar.prototype.moveToOriginalPosition = function() {
    return moveToY(this.$e, 0);
  };

  MenuBar.prototype.hide = function() {
    return moveToY(this.$e, -totalHeightOf(this.$e));
  };


  MenuBar.prototype.getOver = function(otherBar) {
    return this.$e.insertBefore(otherBar.$e);
  };

  Menu.prototype.flip = function(topBar, bottomBar) {
    var self = this;
    self.moveOutOfView().done(function () {
      topBar.moveToOriginalPosition();
      topBar.bringToFront();
      bottomBar.sendToBack();
      return topBar.getOver(bottomBar);
    }).done(function () {
      return bottomBar.hide();
    }).done(function () {
      self.bringInView();
    });
    self.$menuContainer.off();
    self.$menuContainer.hover(function () {
      bottomBar.moveToOriginalPosition();
    }, function () {
      bottomBar.hide();
    });
  }

  Menu.prototype.topNavigation = function () {
    this.flip(this.$topMenu, this.$bottomMenu);
  };

  Menu.prototype.contextNavigation = function () {
    this.flip(this.$bottomMenu, this.$topMenu);
  };


  Menu.prototype.bringInView = function () {
    return moveToY(this.$menuContainer, 0);
  };

  Menu.prototype.moveOutOfView = function () {
    return moveToY(this.$menuContainer, -this.containerHeight);
  };

  window.Menu = Menu;

}).call(this);