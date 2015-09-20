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
      MenuContainer = function($container){
        this.$e = $container;
      },
      Menu = function ($titleBar, $appMenu, $contextMenu, topBarClass, bottomBarClass) {
        this.$menuContainer = new MenuContainer($titleBar);
        this.$topMenu = new MenuBar($appMenu, topBarClass, bottomBarClass);
        this.$bottomMenu = new MenuBar($contextMenu, topBarClass, bottomBarClass);
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

  MenuContainer.prototype.hide = function() {
    return moveToY(this.$e, -totalHeightOf(this.$e));
  };

  MenuContainer.prototype.show = function() {
    return moveToY(this.$e, 0);
  };

  MenuContainer.prototype.showOnHover = function(bar) {
    this.$e.off();
    this.$e.hover(function () {
      bar.moveToOriginalPosition();
    }, function () {
      bar.hide();
    });
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
    self.$menuContainer.showOnHover(bottomBar);
  }

  Menu.prototype.topNavigation = function () {
    this.flip(this.$topMenu, this.$bottomMenu);
  };

  Menu.prototype.contextNavigation = function () {
    this.flip(this.$bottomMenu, this.$topMenu);
  };

  Menu.prototype.bringInView = function () {
    return this.$menuContainer.show();
  };

  Menu.prototype.moveOutOfView = function () {
    return this.$menuContainer.hide();
  };

  window.Menu = Menu;

}).call(this);