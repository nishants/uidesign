(function () {
  "use strict"

  var App = function($state, grid){
    this.$state = $state;
    this.grid  = grid;
  };

  App.prototype.apply = function(state){
    this.$state.removeClass();
    this.$state.addClass(state.name);
    this.grid.collect(state.name);
    this.grid.arrange();
  };

  window.App = App;
}).call(this);