var app = angular.module("crossword", []);
app.controller("CrosswordController", ["$scope", function ($scope) {

	var createCell = function(param){
				return {
					label: param.label,
					value: null,
					focus: false,
					solid: param.solid
				};
			},
			crossword = {
				cellHeight: 50,
				cellWidth: 50,
				cellsPerRow: 5,
				cells: [
					createCell({label: 1}), createCell({}), createCell({}), createCell({}), createCell({}),
					createCell({}), createCell({solid: true}), createCell({solid: true}), createCell({solid: true}), createCell({solid: true}),
					createCell({}), createCell({}), createCell({}), createCell({}), createCell({}),
					createCell({}), createCell({}), createCell({}), createCell({}), createCell({}),
				]
			};
	$scope.crossword = crossword
}]);