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

      Menu = function ($titleBar, $appMenu, $contextMenu) {
        this.$menuContainer = $titleBar;
        this.$topMenu = $appMenu;
        this.$bottomMenu = $contextMenu;
        this.containerHeight = $titleBar.height();
      };

  Menu.prototype.topNavigation = function () {
    var self = this;
    self.hide().done(function () {
      return self.$topMenu.insertBefore(self.$bottomMenu);
    }).done(function () {
      self.show();
    });
  };

  Menu.prototype.contextNavigation = function () {
    var self = this;
    self.hide().done(function () {
      return self.$bottomMenu.insertBefore(self.$topMenu);
    }).done(function () {
      self.show();
    });
  };


  Menu.prototype.show = function () {
    return moveToY(this.$menuContainer, 0);
  };

  Menu.prototype.hide = function () {
    return moveToY(this.$menuContainer, -this.containerHeight);
  };

  window.Menu = Menu;

}).call(this);