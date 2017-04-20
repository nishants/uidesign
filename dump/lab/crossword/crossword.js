var app = angular.module("crossword", []);
app.controller("CrosswordController", ["$scope", function ($scope) {

	var createCell = function(param){
				return {
					label: param.label,
					value: null,
					solid: param.solid
				};
			},
			crossword = {
				cellHeight: 50,
				cellWidth: 50,
				cellsPerRow: 5,
				_goingDown: false,
				focus : -1,
				cells: [
					createCell({label: 1}), createCell({}), createCell({}), createCell({}), createCell({}),
					createCell({}), createCell({solid: true}), createCell({solid: true}), createCell({solid: true}), createCell({solid: true}),
					createCell({}), createCell({}), createCell({}), createCell({}), createCell({}),
					createCell({}), createCell({}), createCell({}), createCell({}), createCell({}),
				],
				select: function(cellIndex){
					crossword.focus = cellIndex;
				}
			};
	$scope.crossword = crossword
}]);