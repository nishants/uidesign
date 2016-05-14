(function () {
  "use strict"
  datatable.directive("stickyHeader", [function(){
    var setHeaderSize = function(fromHeader, toHeader){
      var $fromTheads = fromHeader.find("th"),
          $toTheads = toHeader.find("th");

      for(var i = 0; i< $fromTheads.length; i++){
        $($toTheads[i]).width($($fromTheads[i]).width());
      }
    };

    return {
      restrict: 'A',
      transclude: false,
      scope: false,
      link: function(scope, element, attrs){
        var target = $(attrs.stickerSelector),
            $header = $(element);

        target.hide();
        target.html("");

        // TODO remove listener, when element is destroyed.
        $(window).bind("scroll", function () {
          if(target.html() == "")target.append($header.clone());
          setHeaderSize($header, target);
          this.pageYOffset > 100 ? target.show() : target.hide();
        });
      }
    };
  }])


}).call(this);