var app = angular.module("crossword", []);
app.controller("CrosswordController", ["$scope", function ($scope) {

	var isNextChar = function(keyCode){
				var isUppercase = keyCode > 64 && keyCode < 91,
						isLowercase = keyCode > 96 && keyCode < 123;
				return isUppercase || isLowercase;
			},

			isBackChar = function(keyCode){
				return keyCode == 8;
			},
			createCell = function(param){
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
				},
				input: function(index, event){
					isNextChar(event.keyCode) ? console.log("going to next"): "";
					isBackChar(event.keyCode) ? console.log("going to previous"): "";
					console.log(event.keyCode);
				}
			};
	$scope.crossword = crossword
}]);