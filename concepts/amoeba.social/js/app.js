(function () {
  "use strict"

  var App = function($state){
    this.$state = $state;
  };

  App.prototype.apply = function(state){
    this.$state.removeClass();
    this.$state.addClass(state.name);
  };

  window.App = App;
}).call(this);