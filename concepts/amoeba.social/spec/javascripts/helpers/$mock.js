(function(){
  "use strict"

  window.$mock = function(params){
    params = params || {};

    var height    = params.height || 0,
        width     = params.width  || 0,
        classes   = {},
        mockable  = function(){return function(){}},
        $mock = {
          __classes: classes,
          css: mockable(),
          height: function () {
            return height;
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

    return $mock;
  };
}).call(this);