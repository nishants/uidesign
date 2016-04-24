(function(){
  "use strict"

  var failure   = function(message){throw new Error(message);},
      mockable  = function(){return function(){}},
      $mock = function(params){
        params = params || {};

        var height    = params.height || 0,
            width     = params.width  || 0,
            classes   = {},
            mock      = {
              __$mock: (99999 * Math.random()),
              __classes: classes,
              css: mockable(),
              events: {},
              children: {},
              trigger: function(eventName, eventObj){
                expect($(window) == $(window)).toBeTruthy();
                this.events[eventName] ? this.events[eventName](eventObj) : failure("No listener subscribed for " + eventName );
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
                name || (this.__classes = {});
                name && (this.__classes[name] = false);
              },
              find: function(query, $elements){
                $elements && (this.children[query] = $elements);
                return this.children[query];
              }
            };

        params.classes && params.classes.forEach(function(clas){
          classes[clas] = true;
        });

        spyOn(mock, "height").and.callThrough();
        spyOn(mock, "css").and.callThrough();

        return mock;
      },
      sectorTargets = {},
      $ = function(selector){
        if(selector.__$mock) return selector;
        selector = (selector == window) ? "[3.14]" : selector;
        var target = sectorTargets[selector];
        return target || (sectorTargets[selector] = $mock());
      };

  window.$mock = $mock;
  window.$ = $;
  beforeEach(function(){
    sectorTargets = {};
  });
}).call(this);