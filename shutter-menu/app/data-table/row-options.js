(function () {
  "use strict"

  datatable.service("RowOption", [function () {
    var RowOption = function(rowItem, $e){
      this.rowItem = rowItem;
      this.$e = $e;
    };
    RowOption.prototype.positionFromTop = function () {
      return this.$e.position().top;
    };


    return {
      new: function (rowItem, $e) {
        return new RowOption(rowItem, $e);
      }
    };
  }])
}).call(this);