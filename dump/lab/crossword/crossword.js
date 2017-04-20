var app = angular.module("crossword", []);
var createCell = function(param){
	return {
		label: param.label,
		value: null,
		solid: param.solid
	};
}

app.value("crosswordLayout", {
	cells: [
		createCell({label: 1}), createCell({}), createCell({}), createCell({}), createCell({}),
		createCell({}), createCell({solid: true}), createCell({solid: true}), createCell({solid: true}), createCell({solid: true}),
		createCell({}), createCell({}), createCell({}), createCell({}), createCell({}),
		createCell({}), createCell({}), createCell({}), createCell({}), createCell({}),
	]
});

app.controller("CrosswordController", ["$scope", "crosswordLayout", function ($scope, crosswordLayout) {

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
			crossword = {
				cellHeight: 50,
				cellWidth: 50,
				cellsPerRow: 5,
				_goingDown: false,
				cells: crosswordLayout.cells,
				select: function(cellIndex){
					crossword.focusOn(cellIndex);
				},
				_goToPreviousOf: function(index){
					var
							topIndex  = index - crossword.cellsPerRow,
							leftIndex = index - 1,
							hasTop   = topIndex > -1,
							hasLeft  = leftIndex % crossword.cellsPerRow != (crossword.cellsPerRow -1),
							previousIndex = hasLeft  ? leftIndex  : (hasTop ? topIndex : -1);


					crossword.focusOn(previousIndex);
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
					crossword.focusOn(nextIndex);
				},
				input: function(index, event){
					isNextChar(event.keyCode) ? crossword._goToNextOf(index): "";
					isBackChar(event.keyCode) ? crossword._goToPreviousOf(index): "";
				},
				focusOn : function(index){
					var cell   = angular.element(document.querySelector(".crossword li.cell:nth-child(:index)".replace(":index", index+1))),
							cells  = angular.element(document.querySelectorAll(".crossword li.cell")),
							input  = cell.find("input")[0];
					cells.removeClass("focus");

					if(index > -1){
						input.select();
						cell.addClass("focus");
						input.focus();
					}
				}
			};
	$scope.crossword = crossword
}]);