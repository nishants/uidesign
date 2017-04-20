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
				_goToPreviousOf: function(index){
					var
							topIndex  = index - crossword.cellsPerRow,
							leftIndex = index - 1,
							hasTop   = topIndex > -1,
							hasLeft  = leftIndex % crossword.cellsPerRow != (crossword.cellsPerRow -1),
							previousIndex = hasLeft  ? leftIndex  : (hasTop ? topIndex : -1);

					crossword.focus = previousIndex;
				},
				_goToNextOf: function(index){
					var
							bottomIndex  = index + crossword.cellsPerRow,
							rightIndex   = index + 1,
							hasBottom    = bottomIndex < crossword.cells.length && !crossword.cells[bottomIndex].solid,
							hasRight     = rightIndex % crossword.cellsPerRow != 0 && !crossword.cells[rightIndex].solid,
							nextIndex    = hasRight  ? rightIndex  : (hasBottom ? bottomIndex : -1);

					crossword.focus = nextIndex;
				},
				input: function(index, event){
					isNextChar(event.keyCode) ? crossword._goToNextOf(index): "";
					isBackChar(event.keyCode) ? crossword._goToPreviousOf(index): "";
					console.log(event.keyCode);
				}
			};
	$scope.crossword = crossword
}]);

app.directive("focusIf", [function(){
	return {
		link: function(scope, element, atts){
			scope.$watch(atts.focusIf, function(focusOn){
				if(focusOn){
					element[0].focus();
				}
			});
		}
	};
}])