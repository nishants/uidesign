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
    this.grid.collect();
    this.grid.arrange();
  };

  window.App = App;
}).call(this);