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
      Menu = function ($titleBar, $appMenu, $contextMenu, topBarClass, bottomBarClass) {
        this.$menuContainer = $titleBar;
        this.$topMenu = $appMenu;
        this.$bottomMenu = $contextMenu;

        this.topBarClass    = topBarClass;
        this.bottomBarClass = bottomBarClass;

        this.containerHeight = $titleBar.height();
      };

  Menu.prototype.topNavigation = function () {
    var self = this;
    self.hide().done(function () {
      self.$topMenu.removeClass(self.bottomBarClass);
      self.$topMenu.addClass(self.topBarClass);

      self.$bottomMenu.removeClass(self.topBarClass);
      self.$bottomMenu.addClass(self.bottomBarClass);
      return self.$topMenu.insertBefore(self.$bottomMenu);
    }).done(function () {
      return moveToY(self.$bottomMenu, -totalHeightOf(self.$bottomMenu));
    }).done(function () {
      self.show();
    });

    self.$bottomMenu.off();
    self.$topMenu.off();

    this.$menuContainer.hover(function(){
      moveToY(self.$bottomMenu, 0)
    }, function(){
      moveToY(self.$bottomMenu, -totalHeightOf(self.$bottomMenu))
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