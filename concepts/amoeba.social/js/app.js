(function () {
  "use strict"

  var App = function($state, states, grid){
    this.$state = $state;
    this.states = states;
    this.grid   = grid;
  };

  App.prototype.loadUrl = function(url){
    var state = this.states.parse(url);

    this.$state.removeClass();
    this.$state.addClass(state.name);
    this.grid.collect(state.name);
    this.grid.arrange();
  };

  window.App = App;
}).call(this);