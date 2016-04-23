(function(){
  "use strict"

  window.$mock = function(params){
    params = params || {};

    var height    = params.height || 0,
        width     = params.width  || 0,
        classes   = {},
        mockable  = function(){return function(){}},
        failure   = function(message){throw new Error(message);},
        mock     = {
          __classes: classes,
          css: mockable(),
          events: [],
          trigger: function(event){
            this.events[event] ? this.events[event]() : failure("No listener subscribed for " + event );
          },
          on: function(event, callback){
            this.events[event] = callback;
          },
          height: function () {
            return height;
          },
          width: function () {
            return width;
          },
          hasClass: function (name) {
            return this.__classes[name];
          },
          addClass: function (name) {
            return this.__classes[name] = true;
          },
          removeClass: function (name) {
            return this.__classes[name] = false;
          }
        };

    params.classes && params.classes.forEach(function(clas){
      classes[clas] = true;
    });

    spyOn(mock, "height").and.callThrough();
    spyOn(mock, "css").and.callThrough();

    return mock;
  };
}).call(this);