(function () {
  "use strict"

  angular.module("tiktik").controller("TopMenuController", ["$scope", function($scope){

    $scope.menu = {
      sectionByUrl : "campaigns",
      tabByUrl : "campaigns",
      sectionByHover : null,

      section: function (name) {
        var userIsHovering = !!this.sectionByHover,
            isHovered = this.sectionByHover == name,
            isByUrl = this.sectionByUrl == name;

        return isHovered || (!userIsHovering && isByUrl);
      },

      tab: function (name) {
        var userIsHovering = this.sectionByHover,
            userIsHoveringCurrentSection = this.sectionByHover == this.sectionByUrl,
            isSectionByUrl = name == this.tabByUrl;

        return (!userIsHovering || userIsHoveringCurrentSection) && isSectionByUrl;
      },

      showByUrl: function () {
        this.sectionByHover = null;
      },
      showMenuFor: function (name) {
        this.sectionByHover = name;
      },
      showHoveredOptions: function(){console.log("show hovering options")},
    };

  }]);

}).call(this);