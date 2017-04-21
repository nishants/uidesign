angular.module("crossword").directive("crossword", [function () {
	var KEY_CODES = {
		LEFT	: 37,
		UP	  : 38,
		RIGHT : 39,
		DOWN	: 40,
		BACKSPACE 	: 8,
	};

	var createCrossword = function(matrix){

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
					cellsPerRow: matrix.columns,
					_goingDown: false,

					cells: matrix.cells,
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
		return crossword;
	};
	return {
		restrict: "C",
		scope: true,
		link: function(scope, element){
			if(scope.matrix ){
				scope.crossword = createCrossword(scope.matrix);
			}
		}
	};
}]);