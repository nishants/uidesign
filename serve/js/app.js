(function(){
  "use strict"
  var app = angular.module("amoeba", []);
  window.app = app;
}).call(this);
(function(){
  "use strict"
console.log("routes")
}).call(this);
(function(){
  "use strict"
  app.directive("slate", [function () {
    var select = function (index) {
          var cardContainer = $($(".deck > li")[index]),
              card          = cardContainer.find(".card").first(),
              offsetPadding = 10,
              offsetY = $(".deck").offset().top - cardContainer.offset().top,
              offsetX = $(".deck").offset().left - cardContainer.offset().left;

          card.css("transform", "translateY(" + (offsetY + offsetPadding) + "px)" + "translateX(" + (offsetX + offsetPadding) + "px)");
          $("body").css("overflow", "hidden")
        },
        unSelect = function (index) {
          var card = $($(".deck > li")[index]);
          card.css("transform", "");
          $("body").css("overflow", "auto")
        };
    return {
      restrict: "C",
      scope: true,
      transclude: false,
      link: function (scope, element, attrs) {
        scope.$watch("deck.current", function (now, previous) {
          now != -1 && select(now);
          previous != -1 && unSelect(previous);
          setTimeout(function(){
            $("body").stop().animate({scrollTop:$(element).offset().top}, '500', 'swing');
          },100);
        });
      }
    };
  }]);

}).call(this);
(function () {
  "use strict"

  var App = function($state, states, grid){
    this.$state = $state;
    this.states = states;
    this.grid   = grid;
    var app = this;
    $(window).on("hashchange", function(e){
      app.loadUrl(e.originalEvent.newURL.split("#")[1]);
    });
  };

  App.prototype.loadUrl = function(url){
    var state = this.states.parse(url);

    this.$state.removeClass();
    this.$state.addClass("state");
    this.$state.addClass(state.name);

    this.grid.showState(state);
  };

  $(document).ready(function(){
    var grid    = new Grid($(".grid").first(), 300),
        states  = new States([{name: "all", id: "all"},{name: "home", id: "home"}, {name: "dashboard", id: "dashboard"}]),
        $state  = $(".state").first(),
        app = new App($state, states, grid);
    app.loadUrl(window.location.hash);
  });

}).call(this);
(function () {
  "use strict"

  var GridBox = function($gridbox){
    this.$gridbox = $gridbox;
    var offsetX = parseInt($gridbox.css("left"));
    var offsetY = parseInt($gridbox.css("top"));
    this.offset = {
      x: offsetX ||0 ,
      y: offsetY ||0}
  };

  GridBox.prototype.setPosition = function(x,y){
    this.xPosition = x;
    this.yPosition = y;
  };

  GridBox.prototype.height = function(){
    return this.$gridbox.height();
  };

  GridBox.prototype.visibleFor = function(stateName){
    return this.$gridbox.hasClass(stateName);
  };

  GridBox.prototype.applyPosition = function(){
    var x = this.xPosition - this.offset.x,
        y = this.yPosition - this.offset.y;

    this.$gridbox.css("transform", "translateX("+x+"px)" + " translateY("+y+"px)")
  };

  window.GridBox = GridBox;
}).call(this);
(function () {
  "use strict"
  var readFrom = function ($grid) {
    var boxes = $grid.find(".grid-box"), result = [];
    for (var i = 0; i < boxes.length; i++) {
      result.push(new GridBox($(boxes[i])));
    }
    return result;
  };

  var Grid = function($grid, colWidth){
    this.$grid      = $grid;
    this.gridBoxes  = [];
    this.colWidth   = colWidth;
    this.columns    = [];
    this.height     = 0;
    this.keeper     = null;
    var self        = this ;
    this.$grid.css("overflow", "hidden");
    this.$grid.on("DOMNodeInserted", function(){
      self.__setGridBoxes(readFrom($grid));
      self.__collect(self, self.__showState.name);
      self._arrange();
    });
  };

  Grid.prototype.__setGridBoxes = function(boxes){
    this.gridBoxes = boxes;
  }

  Grid.prototype.showState = function(state){
    this.__showState  = state;
    this.$grid.trigger("DOMNodeInserted");
  }

  Grid.prototype._arrange = function(){
    this.__viewableBoxes.forEach(function(box){
      box.applyPosition();
    });
    this.$grid.height(this.height);
  };

  Grid.prototype.__collect = function(grid, stateName){
    var
        columnCount   = Math.floor(grid.$grid.width()/grid.colWidth),
        gridHeight    = 0,
        nextColumn    = 0,
        viewableBoxes = grid.gridBoxes.filter(function(box){return box.visibleFor(stateName);});


    for(var i = 0; i < columnCount; i++){
      grid.columns[i] = {nexPosition: 0};
    }

    viewableBoxes.forEach(function(box){
      var
          column = grid.columns[nextColumn],
          x = nextColumn * grid.colWidth,
          y = column.nexPosition;

      box.setPosition(x, y);

      column.nexPosition += box.height();
      gridHeight          = Math.max(gridHeight, column.nexPosition);
      nextColumn          = (nextColumn + 1) % columnCount;
    });

    grid.height = gridHeight;
    this.__viewableBoxes = viewableBoxes;

  };

  window.Grid = Grid;
}).call(this);
(function () {
  "use strict"

  var States = function(list){
    this.__defaultState = list[0];
    this.__states = {};
    for(var i=0; i < list.length; i++){
      this.__states[list[i].id] = list[i];
    }
  };

  States.prototype.parse = function(url){
    var stateId    = url.length && url.split("/")[1],
        stateByUrl = (stateId && this.__states[stateId]);

    return stateByUrl || this.__defaultState;
  };

  window.States = States;
}).call(this);
(function(){
  "use strict"
  var init = function(){
    var lastScrollTop   = 0,
        readingOffset   = 100,
        topBarHeight    = 85,
        introOutAt      = $(window).height() - topBarHeight - 60,
        app             = $("#app"),
        reading = function(){
          app.addClass("reading");
        },
        navigating = function(){
          app.removeClass("reading");
        };


    var handleScroll = function (scollable) {
      var scrollTop = scollable.scrollTop(),
          nearTop = scrollTop < readingOffset,
          doneIntro = introOutAt < scrollTop,
          scrollingDown = scrollTop - lastScrollTop > 0;

      doneIntro ? app.removeClass("intro") : app.addClass("intro");

      (!nearTop && scrollingDown) ? reading() : navigating();
      lastScrollTop = scrollTop;
    };

    $("#top-fixed-bar").on("mouseenter",navigating);

    $(window).on("scroll", function(){
      handleScroll($(this));
    });
  };

  $(document).ready(function(){
    init();
  });

}).call(this);