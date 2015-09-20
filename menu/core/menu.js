(function () {
  "use strict"
  var Menu = function ($titleBar, $appMenu, $contextMenu, topBarClass, bottomBarClass) {
    this.$menuContainer = new MenuContainer($titleBar);
    this.$topMenu = new MenuBar($appMenu, topBarClass, bottomBarClass);
    this.$bottomMenu = new MenuBar($contextMenu, topBarClass, bottomBarClass);
  };

  Menu.prototype.flip = function (topBar, bottomBar) {
    var menu = this.$menuContainer;
    menu.hide().done(function () {
      return menu.flipBars(topBar, bottomBar);
    }).done(function () {
      menu.show();
      menu.showOnHover(bottomBar)
    });
  };

  Menu.prototype.topNavigation = function () {
    this.flip(this.$topMenu, this.$bottomMenu);
  };

  Menu.prototype.contextNavigation = function () {
    this.flip(this.$bottomMenu, this.$topMenu);
  };

  Menu.prototype.show = function () {
    return this.$menuContainer.show();
  };

  Menu.prototype.hide = function () {
    return this.$menuContainer.hide();
  };

  window.Menu = Menu;

}).call(this);