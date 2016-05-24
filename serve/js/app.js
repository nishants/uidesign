(function(){
  "use strict"
  var app = angular.module("amoeba", ['editor']);
  window.app = app;
  app.run(["snippetService", function(snippetService){
    console.log("hoyaa");
  }])
}).call(this);
(function(){
  "use strict"

  var files = {
    "controller" : ["request"]
  }

  app.service("snippetService", ["$http", function($http){
    var
        template = "../code/<name>/<file>",
        cache = {};

    for(var name in files){
      var fileNames     = files[name],
          fileTemplate  = template.replace("<name>", name);
      cache[name] = {};
      fileNames.forEach(function(file){
            var fileUrl = fileTemplate.replace("<file>", file);
            $http.get(fileUrl).then(function(response){
              cache[name][file] = response.data;
            }, function(err){
              console.error("File not found : " + err);
            });
          }
      );
    }

    return {
      load: function(){

      }
    };
  }]);

}).call(this);
(function(){
  "use strict"
console.log("routes")
}).call(this);
(function(){
  "use strict"
  app.directive("slate", [function () {
    return {
      restrict: "C",
      scope: true,
      transclude: false,
      link: function (scope, element, attrs) {
      }
    };
  }]);

}).call(this);
(function(){
  "use strict"
  var app = angular.module("editor", []);
  app.directive("code", function($log){
    var
        defaultOptions = {
          //remove default red dots for unknown character(linefeed, etc)
          specialCharPlaceholder: function(){return document.createElement("span")},
          readOnly: true,

          // show line numbers in editor
          lineNumbers: true,

          // renders whole document at once (else only part in view is rendered, and text searches wont work)
          //viewportMargin: Infinity,

          // syntax highlighter mode
          mode: "htmlmixed"
        },


        showError = function (err) {
          $log.error(err);
        },

        initializeCodeMirror = function (textArea, editorOptions) {
          return CodeMirror.fromTextArea(textArea, editorOptions);
        };

    return {
      scope: false,
      transclude: false,
      restrict: 'C',
      link : function(scope, element, attrs){
        var editorOptions = angular.extend(defaultOptions, {});
        editorOptions.mode = attrs.mode || editorOptions.mode;

        var editor = initializeCodeMirror(element[0], editorOptions);
        editor.on("change", function(){
          editor.save();
        })
        ;
      }
    };
  })
})();
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

  var GridBox = function($grid, $gridbox){
    this.$grid    = $grid;
    this.$gridbox = $gridbox;
    var offsetX = parseInt($gridbox.css("left"));
    var offsetY = parseInt($gridbox.css("top"));
    this.offset = {
      x: offsetX ||0 ,
      y: offsetY ||0}

    var self      = this,
        toggleSelect = function(box){
          self.$gridbox.attr("data-grid-selected") ? self.unselect() : self.select()
        };

    $gridbox.click(toggleSelect);
  };

  GridBox.prototype.unselect = function(){
    this.applyPosition();
    this.$gridbox.attr("data-grid-selected", null);
    $("body").css("overflow", "auto");
    $("#app").removeClass("show-modal");
  };

  GridBox.prototype.select = function(){
    var self      = this,
        $window   = $(window),
        scroll    = $window.scrollTop() < self.$grid.offset().top,
        selectBox = function(){
          $("body").css("overflow", "hidden")
          var y = (self.yPosition - self.offset.y) - (self.$gridbox.offset().top - $window.scrollTop()),
              x = 0;
          self.__applyPosition(x,y);
          self.$gridbox.attr("data-grid-selected","true");
          $("#app").addClass("show-modal");
        };

        scroll && $('html, body').animate({scrollTop : this.$gridbox.offset().top}, 250, selectBox);
        scroll || selectBox();
  };

  GridBox.prototype.setPosition = function(x,y){
    this.xPosition = x;
    this.yPosition = y;
    this.__selected = true;
  };

  GridBox.prototype.height = function(){
    return this.$gridbox.height();
  };

  GridBox.prototype.visibleFor = function(stateName){
    return this.$gridbox.hasClass(stateName);
  };

  GridBox.prototype.__applyPosition = function(x,y){
    this.$gridbox.css("transform", "translateX("+x+"px)" + " translateY("+y+"px)")
  }

  GridBox.prototype.applyPosition = function(){
    var x = this.xPosition - this.offset.x,
        y = this.yPosition - this.offset.y;
    this.__applyPosition(x,y);
  };

  window.GridBox = GridBox;
}).call(this);
(function () {
  "use strict"
  // if element has data-grid-id, ignore,
  // if it doesn't, create gidbox for it, and add to map

  var ids = 0,
      readFrom = function ($grid, map) {
        var boxes = $grid.find(".grid-box"),
            result = [];

        for (var i = 0; i < boxes.length; i++) {
          var $box = $(boxes[i]);
          $box.attr("data-grid-id") || function(){
            var id = ids++;
            $box.attr("data-grid-id", id);
            map[id] = new GridBox($grid, $box)
          }();
        }

        for(var id in map){
          result.push(map[id]);
        }
        return result;
      };

  var Grid = function($grid, colWidth){
    this.$grid      = $grid;
    this.gridBoxes  = [];
    this.colWidth   = colWidth;
    this.columns    = [];
    this.height     = 0;
    this.gridBoxMap = {};
    var self        = this ;
    this.$grid.css("overflow", "hidden");
    $(window).on("resize", function(){
      self.__collect(self, self.__showState.name);
      self._arrange();
    });
    this.$grid.on("DOMNodeInserted", function(){
      self.__setGridBoxes(readFrom($grid, self.gridBoxMap));
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
        leftOffset    = (grid.$grid.width() - (columnCount * this.colWidth))/ 2,
        viewableBoxes = grid.gridBoxes.filter(function(box){return box.visibleFor(stateName);});


    for(var i = 0; i < columnCount; i++){
      grid.columns[i] = {nexPosition: 0};
    }

    viewableBoxes.forEach(function(box){
      var
          column = grid.columns[nextColumn],
          x = nextColumn * grid.colWidth,
          y = column.nexPosition;

      box.setPosition( leftOffset + x, y);

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