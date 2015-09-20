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
    return {
      restrict: 'A',
      transclude: false,
      scope: false,
      link: function (scope, element, attrs) {
        var bottomBarClass = attrs["bottomBarClass"],
            topBarClass = attrs["topBarClass"],
            $menu = $(element),
            bars = $menu.find("[shutter-menu-bar]"),
            $appBar = $(bars[0]),
            $contextMenu = $(bars[1]);

        shutterMenu.init(new Menu($menu, $appBar, $contextMenu, topBarClass, bottomBarClass));
      }
    };
  }]);
}).call(this);