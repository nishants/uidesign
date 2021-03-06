(function () {
  "use strict"
  var module = angular.module("shutter-menu", []);
  module.service("shutterMenu", [function () {

    var
        init = function (menu) {
          this.menu = menu;
        },
        showAppMenu = function () {
          this.menu.topNavigation();
        },
        showSubMenu = function () {
          this.menu.contextNavigation();
        },
        show = function () {
          this.menu.show();
        },
        hide = function () {
          this.menu.hide();
        };

    return {
      init: init,
      show: show,
      hide: hide,
      showAppMenu: showAppMenu,
      showSubMenu: showSubMenu,
    };
  }]);
  module.directive("shutterMenu", ["shutterMenu", function (shutterMenu) {
    // find the shutter menu elements on dom, pass to to shutterMenu service
    return {
      restrict: 'A',
      transclude: false,
      scope: false,
      link: function (scope, element, attrs) {
        var bottomBarClass = attrs["bottomBarClass"],
            topBarClass = attrs["topBarClass"],
            menuContainer = $(element),
            bars = menuContainer.find("[shutter-menu-bar]"),
            $menu = $(bars[0]),
            $submenu = $(bars[1]),
            menu = new Menu(
                new MenuContainer(menuContainer),
                new MenuBar($menu, topBarClass, bottomBarClass),
                new MenuBar($submenu, topBarClass, bottomBarClass));


        shutterMenu.init(menu);
      }
    };
  }]);


}).call(this);