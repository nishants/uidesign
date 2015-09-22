(function () {
  "use strict"
  var Menu = function (container, topBar, bottomBar) {
    this.container = container;
    this.topBar = topBar;
    this.bottomBar = bottomBar;
  };

  Menu.prototype.flip = function (topBar, bottomBar) {
    var container = this.container;
    container.hide().done(function () {
      return container.flipBars(topBar, bottomBar);
    }).done(function () {
      container.show();
      container.showOnHover(bottomBar)
    });
  };

  Menu.prototype.topNavigation = function () {
    this.flip(this.topBar, this.bottomBar);
  };

  Menu.prototype.contextNavigation = function () {
    this.flip(this.bottomBar, this.topBar);
  };

  Menu.prototype.show = function () {
    return this.container.show();
  };

  Menu.prototype.hide = function () {
    return this.container.hide();
  };

  window.Menu = Menu;

}).call(this);