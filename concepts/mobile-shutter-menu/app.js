(function(){
 "use strict"
  var app = angular.module("app", []);
  app.directive("scrollListener", ['$parse', 'ScrollListener', function($parse, ScrollListener){
    return {
      transclude: false,
      scope:false,
      restrict: 'A',
      link: function(scope, element, attrs){
        var scrollListener = $parse(attrs.scrollListener);
        var listener = ScrollListener.listen(element);
        scrollListener.assign(scope, listener);
        angular.element(window).bind("DOMContentLoaded load resize scroll",function(){
            scope.$apply(function(){
                listener.update();
            });
        })
      }
    }
  }]);

  app.factory("ScrollListener", [function(){
    var ScrollEventListener = {
      elements: [],
      listen: function (element) {
        var target = {
          $e: $(element),
          state: {
            aboveViewport   : false,
            inViewport      : true,
            belowViewport   : false,
            offset          : 1
          },
          scrollTo: function(){
            var position = this.$e.offset().top;
            $('html, body').animate({scrollTop: position}, 500);
          },
          update: function(){
            var container     = this.$e[0].getBoundingClientRect(),
                aboveViewport = (container.top  + container.height) < 0 ,
                belowViewport = container.top > $(window).height(),
                inViewport    = !aboveViewport && !belowViewport,
                offset        = container.top > 0 ? (container.height - container.top)/container.height: -(container.height + container.top)/container.height;
            this.state = {
              aboveViewport   : aboveViewport,
              inViewport      : inViewport,
              belowViewport   : belowViewport,
              offset         : offset
            };

          }
        };
        this.elements.push(target);
        return target;
      },
    };
    return ScrollEventListener;
  }])


})();