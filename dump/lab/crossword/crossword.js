var app = angular.module("crossword", []);
app.controller("CrosswordController", ["$scope", function ($scope) {

	var KEY_CODES = {
		LEFT	: 37,
		UP	  : 38,
		RIGHT : 39,
		DOWN	: 40,
		BACKSPACE 	: 8,
	};

	var isNextChar = function(keyCode){
				var isUppercase = keyCode > 64 && keyCode < 91,
						isLowercase = keyCode > 96 && keyCode < 123,
						isInput    = isUppercase || isLowercase,
						isSkip     = [KEY_CODES.RIGHT, KEY_CODES.DOWN].indexOf(keyCode) != -1;
				return isInput || isSkip;
			},

			isBackChar = function(keyCode){
				return [KEY_CODES.BACKSPACE, KEY_CODES.UP, KEY_CODES.LEFT].indexOf(keyCode) != -1;
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
							goDown       = hasBottom && ( !hasRight || crossword._goingDown),
							nextIndex    = goDown ? bottomIndex : hasRight ? rightIndex : -1 ;

					crossword._goingDown = goDown;
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
			var cell = element[0];
			scope.$watch(atts.focusIf, function(focusOn){
				if(focusOn){
					cell.select();
					cell.focus();
				}
			});
		}
	};
}]);