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
        var $sticker = $(attrs.stickerSelector),
            headerOffset = $(element).offset().top;

        $sticker.hide();

        console.log("will stick to " + $sticker.attr("id"));
        // TODO remove listener, when element is destroyed.
        $(window).on("scroll", function () {
          $sticker.html("");
          var offset = $(this).scrollTop(),
              $header = $(element).clone(),
              $stickyeader = $($sticker).append($header);


          setHeaderSize($(element), $header);
          if (offset >= headerOffset && $sticker.is(":hidden")) {
            $sticker.show();
          }
          else if (offset < headerOffset) {
            $stickyeader.hide();
          }
        });

      }
    };
  }])


}).call(this);