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
            $titleBar = $(element),
            $appBar = $titleBar.find("#app-menu"),
            $contextMenu = $titleBar.find("#context-menu");

        shutterMenu.init(new Menu($titleBar, $appBar, $contextMenu, topBarClass, bottomBarClass));
      }
    };
  }]);
}).call(this);