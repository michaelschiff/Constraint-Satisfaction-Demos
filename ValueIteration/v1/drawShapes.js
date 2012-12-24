function getTriangle (paper, topX, topY, alt, base) {
		var bLX = topX - base/2;
		var bLY = topY + alt;
		var bRX = topX + base/2;
		var bRY = topY + alt;
		var p1 = paper.path("M"+topX+","+topY+ "L"+bLX+","+bLY+ "L"+bRX+","+bRY+ "L"+topX+","+topY+"Z");
		return p1;
}

//borrowed from git://gist.github.com/1043360.git
function getArrow (paper, x1, y1, x2, y2, size) {
		var angle = Raphael.angle (x1, y1, x2, y2);
		var a45 = Raphael.rad(angle-45);
		var a45m = Raphael.rad(angle+45);
		var a135 = Raphael.rad(angle-135);
		var a135m = Raphael.rad(angle+135);
		var x1a = x1 + Math.cos(a135) * size;
		var y1a = y1 + Math.sin(a135) * size;
		var x1b = x1 + Math.cos(a135m) * size;
		var y1b = y1 + Math.sin(a135m) * size;
		var x2a = x2 + Math.cos(a45) * size;
		var y2a = y2 + Math.sin(a45) * size;
		var x2b = x2 + Math.cos(a45m) * size;
		var y2b = y2 + Math.sin(a45m) * size;
		return paper.path(
						//uncomment the next two lines for bidirectional arrows
						//"M"+x1+" "+y1+"L"+x1a+" "+y1a+
						//"M"+x1+" "+y1+"L"+x1b+" "+y1b+
						"M"+x1+" "+y1+"L"+x2+" "+y2+
						"M"+x2+" "+y2+"L"+x2a+" "+y2a+
						"M"+x2+" "+y2+"L"+x2b+" "+y2b
						);
}
