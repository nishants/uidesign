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
      return columnByName(colName, this.columns).colspan;
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