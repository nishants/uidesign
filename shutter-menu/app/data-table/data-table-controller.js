(function () {
  "use strict"
  var module = angular.module("data-table", []);

  module.controller("TabularViewController", ["$scope", function($scope){
    var columnByName = function(name, columns){
      for(var i =0 ; i < columns.length ; i++){
        if(columns[i].name == name){
          return columns[i];
        }
      }
      return null;
    };
    $scope.dataTable = {
      rows   : [
        { 	name: "name", 	salary: "212121", 	gender: "male", 	address: "very long text, this should be shown gracefull on the table", 	realtionship: "single", 	licenseNo: "abc-1-123232-1212-fsag",  },
        { 	name: "name", 	salary: "212121", 	gender: "male", 	address: "very long text, this should be shown gracefull on the table", 	realtionship: "single", 	licenseNo: "abc-1-123232-1212-fsag", 	 },
        { 	name: "name", 	salary: "212121", 	gender: "male", 	address: "very long text, this should be shown gracefull on the table", 	realtionship: "single", 	licenseNo: "abc-1-123232-1212-fsag", 	 },
        { 	name: "name", 	salary: "212121", 	gender: "male", 	address: "very long text, this should be shown gracefull on the table", 	realtionship: "single", 	licenseNo: "abc-1-123232-1212-fsag", 	 },
        { 	name: "name", 	salary: "212121", 	gender: "male", 	address: "very long text, this should be shown gracefull on the table", 	realtionship: "single", 	licenseNo: "abc-1-123232-1212-fsag", 	 },
        { 	name: "name", 	salary: "212121", 	gender: "male", 	address: "very long text, this should be shown gracefull on the table", 	realtionship: "single", 	licenseNo: "abc-1-123232-1212-fsag", 	 },
        { 	name: "name", 	salary: "212121", 	gender: "male", 	address: "very long text, this should be shown gracefull on the table", 	realtionship: "single", 	licenseNo: "abc-1-123232-1212-fsag", 	 },
        { 	name: "name", 	salary: "212121", 	gender: "male", 	address: "very long text, this should be shown gracefull on the table", 	realtionship: "single", 	licenseNo: "abc-1-123232-1212-fsag", 	 },
        { 	name: "name", 	salary: "212121", 	gender: "male", 	address: "very long text, this should be shown gracefull on the table", 	realtionship: "single", 	licenseNo: "abc-1-123232-1212-fsag", 	 },
        { 	name: "name", 	salary: "212121", 	gender: "male", 	address: "very long text, this should be shown gracefull on the table", 	realtionship: "single", 	licenseNo: "abc-1-123232-1212-fsag", 	 },
        { 	name: "name", 	salary: "212121", 	gender: "male", 	address: "very long text, this should be shown gracefull on the table", 	realtionship: "single", 	licenseNo: "abc-1-123232-1212-fsag", 	 },
        { 	name: "name", 	salary: "212121", 	gender: "male", 	address: "very long text, this should be shown gracefull on the table", 	realtionship: "single", 	licenseNo: "abc-1-123232-1212-fsag", 	 },
        { 	name: "name", 	salary: "212121", 	gender: "male", 	address: "very long text, this should be shown gracefull on the table", 	realtionship: "single", 	licenseNo: "abc-1-123232-1212-fsag", 	 },
        { 	name: "name", 	salary: "212121", 	gender: "male", 	address: "very long text, this should be shown gracefull on the table", 	realtionship: "single", 	licenseNo: "abc-1-123232-1212-fsag", 	 },
        { 	name: "name", 	salary: "212121", 	gender: "male", 	address: "very long text, this should be shown gracefull on the table", 	realtionship: "single", 	licenseNo: "abc-1-123232-1212-fsag", 	 },
        { 	name: "name", 	salary: "212121", 	gender: "male", 	address: "very long text, this should be shown gracefull on the table", 	realtionship: "single", 	licenseNo: "abc-1-123232-1212-fsag", 	 },
        { 	name: "name", 	salary: "212121", 	gender: "male", 	address: "very long text, this should be shown gracefull on the table", 	realtionship: "single", 	licenseNo: "abc-1-123232-1212-fsag", 	 },
        { 	name: "name", 	salary: "212121", 	gender: "male", 	address: "very long text, this should be shown gracefull on the table", 	realtionship: "single", 	licenseNo: "abc-1-123232-1212-fsag", 	 },
        { 	name: "name", 	salary: "212121", 	gender: "male", 	address: "very long text, this should be shown gracefull on the table", 	realtionship: "single", 	licenseNo: "abc-1-123232-1212-fsag", 	 },
        { 	name: "name", 	salary: "212121", 	gender: "male", 	address: "very long text, this should be shown gracefull on the table", 	realtionship: "single", 	licenseNo: "abc-1-123232-1212-fsag", 	 },
        { 	name: "name", 	salary: "212121", 	gender: "male", 	address: "very long text, this should be shown gracefull on the table", 	realtionship: "single", 	licenseNo: "abc-1-123232-1212-fsag", 	 },
        { 	name: "name", 	salary: "212121", 	gender: "male", 	address: "very long text, this should be shown gracefull on the table", 	realtionship: "single", 	licenseNo: "abc-1-123232-1212-fsag", 	 },
        { 	name: "name", 	salary: "212121", 	gender: "male", 	address: "very long text, this should be shown gracefull on the table", 	realtionship: "single", 	licenseNo: "abc-1-123232-1212-fsag", 	 },
        { 	name: "name", 	salary: "212121", 	gender: "male", 	address: "very long text, this should be shown gracefull on the table", 	realtionship: "single", 	licenseNo: "abc-1-123232-1212-fsag", 	 },
        { 	name: "name", 	salary: "212121", 	gender: "male", 	address: "very long text, this should be shown gracefull on the table", 	realtionship: "single", 	licenseNo: "abc-1-123232-1212-fsag", 	 },
        { 	name: "name", 	salary: "212121", 	gender: "male", 	address: "very long text, this should be shown gracefull on the table", 	realtionship: "single", 	licenseNo: "abc-1-123232-1212-fsag", 	 },
        { 	name: "name", 	salary: "212121", 	gender: "male", 	address: "very long text, this should be shown gracefull on the table", 	realtionship: "single", 	licenseNo: "abc-1-123232-1212-fsag", 	 },
        { 	name: "name", 	salary: "212121", 	gender: "male", 	address: "very long text, this should be shown gracefull on the table", 	realtionship: "single", 	licenseNo: "abc-1-123232-1212-fsag", 	 },
        { 	name: "name", 	salary: "212121", 	gender: "male", 	address: "very long text, this should be shown gracefull on the table", 	realtionship: "single", 	licenseNo: "abc-1-123232-1212-fsag", 	 },
      ],
      columns: [{name: "name"},{name: "salary"},{name: "gender"},{name: "address", colspan:2},{name: "realtionship"},{name: "licenseNo"}, ],
      colsSpanOf: function(colName){
        return columnByName(colName, this.columns).colspan;
      }

    };
  }])
}).call(this);