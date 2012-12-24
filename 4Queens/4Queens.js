var button;
(function () { 
		//col1 positions
		position0 = {"x":10, "y":12};
		position1 = {"x":10, "y":99};
		position2 = {"x":10, "y":188};
		position3 = {"x":10, "y":276};		
		positions0 = [position0, position1, position2, position3];
		//col2 positions
		position4 = {"x":98, "y":12};
		position5 = {"x":98, "y":99};
		position6 = {"x":98, "y":188};
		position7 = {"x":98, "y":276};
		positions1 = [position4, position5, position6, position7];
		//col3 positions
		position8 = {"x":186, "y":12};
		position9 = {"x":186, "y":99};
		position10 = {"x":186, "y":188};
		position11 = {"x":186, "y":276};
		positions2 = [position8, position9, position10, position11];
		//col4 positions
		position12 = {"x":274, "y":12};
		position13 = {"x":274, "y":99};
		position14 = {"x":274, "y":188};
		position15 = {"x":274, "y":276};
		positions3 = [position12, position13, position14, position15];
		//array of position arrays	
		superPositions = [positions0, positions1, positions2, positions3];
		//initialize paper and board
		paper = Raphael("paper", 364, 366);
		paper.image("/Users/michaelschiff/Documents/Programming_Projects/CSPDemos/include/images/board.png", 0, 0, 364, 366);
		//define queen class
		function queen(col) {
				this.positions = superPositions[col];
				this.pos = this.positions[0];
				this.img = paper.image("/Users/michaelschiff/Documents/Programming_Projects/CSPDemos/include/images/queen.png", 8, 12, 80, 80).attr(this.pos);
		}
		//define queens
		queen0 = new queen(0);
		queen1 = new queen(1);
		queen2 = new queen(2);
		queen3 = new queen(3);
		//array of all queens
		queens = [queen0, queen1, queen2, queen3];

		//define mouse over handler for queens
		mouseOverHandler = function () { this.style.cursor = 'crosshair'; }
		//set mouseOverHandler for all queens
		for (var i = 0; i < queens.length; i++) { queens[i].img.node.onmouseover = mouseOverHandler; }

		//define startMoveHandler, moveHandler, stopHandler
		function startClosure(queen) { 
				function startMoveHandler () { queen.img.oy = queen.img.attr("y"); }
				return startMoveHandler;
		}
		function moveClosure(queen) {
				function moveHandler(dx, dy) {
						newY = queen.img.oy + dy;
						queen.img.attr("y", newY);
				}
				return moveHandler;
		}
		function endClosure(queen) { 
				function endMoveHandler() {
					curPos = queen.img.attr("y");
					pos0dist = Math.abs(curPos - queen.positions[0]["y"]);
					pos1dist = Math.abs(curPos - queen.positions[1]["y"]);
					pos2dist = Math.abs(curPos - queen.positions[2]["y"]);
					pos3dist = Math.abs(curPos - queen.positions[3]["y"]);
					minDist = Math.min(pos0dist, pos1dist, pos2dist, pos3dist);
					if (minDist == pos0dist) { 
							queen.img.attr("y", queen.positions[0]["y"]);
							queen.pos = queen.positions[0];
					} else if (minDist == pos1dist) {
							queen.img.attr("y", queen.positions[1]["y"]);
							queen.pos = queen.positions[1];
					} else if (minDist == pos2dist) {
							queen.img.attr("y", queen.positions[2]["y"]);
							queen.pos = queen.positions[2];
					} else if (minDist == pos3dist) {
							queen.img.attr("y", queen.positions[3]["y"]);
							queen.pos = queen.positions[3];
					}
				}
				return endMoveHandler;
		}
		//set movement handlers
		for (var i = 0; i < queens.length; i++) {
				queens[i].img.drag(moveClosure(queens[i]), startClosure(queens[i]), endClosure(queens[i]));
		}

		//define Checking Function
		function check() {
				flag = true;
				for (var i in queens) {
						for (var k = i; k < queens.length; k++) {
								q1 = queens[i];
								q2 = queens[k];
								//no two queens have same y position
								if (q1.pos["y"] == q2.pos["y"] && i != k) { flag = false; }
								//we restrict the x position so that two queens can never have same x pos
								if (Math.abs(i-k) == 1) {
									var pos1;
									var pos2;
									if (q1.pos == q1.positions[0]) { pos1 = 0; }
									if (q2.pos == q2.positions[0]) { pos2 = 0; }
									if (q1.pos == q1.positions[1]) { pos1 = 1; }
									if (q2.pos == q2.positions[1]) { pos2 = 1; }
									if (q1.pos == q1.positions[2]) { pos1 = 2; }
									if (q2.pos == q2.positions[2]) { pos2 = 2; }
									if (q1.pos == q1.positions[3]) { pos1 = 3; }
									if (q2.pos == q2.positions[3]) { pos2 = 3; }
									if (Math.abs(pos1-pos2) <= 1) { flag = false; }
								}
						}
				}
				if (flag) {
						$('#response').text("Correct!");
						$('#response').css("color", "green");
				} else { 
						$('#response').text("Rearrage and try Again."); 
						$('#response').css("color", "red");
				}
		}
		button = check;
		document.getElementById("b").setAttribute("onClick", "button()");
})();
