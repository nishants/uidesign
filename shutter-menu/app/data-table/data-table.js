(function () {
  "use strict"

  datatable.service("DataTable", [function () {

    var columnByName =
            function (name, columns) {
              for (var i = 0; i < columns.length; i++) {
                if (columns[i].name == name) {
                  return columns[i];
                }
              }
              return null;
            },
        DataTable =
            function (columns, rows) {
              this.columns = columns;
              this.rows = rows;
              this.rowControl = {
                current: null
              };
            };

    DataTable.prototype.colsSpanOf = function (colName) {
      var span = columnByName(colName, this.columns).colspan;
      return span ? span : 1;
    };

    DataTable.prototype.showOptionsFor = function (rowOptions) {
      this.rowControl.current = rowOptions;
    };

    return {
      new: function (columns, rows) {
        return new DataTable(columns, rows);
      }
    };
  }])
}).call(this);