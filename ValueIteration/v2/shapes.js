function Triangle (paper, topX, topY, alt, base) {
		this.paper = paper;
		this.tx = topX;
		this.ty = topY;
		this.bx = topX;
		this.by = topY+alt;
		this.centerx = topX;
		this.centery = topY + alt/2 + 6;
		var bLX = topX - base/2;
		var bLY = topY + alt;
		var bRX = topX + base/2;
		var bRY = topY + alt;
		this.shape = paper.path("M"+topX+","+topY+ 
								"L"+bLX+","+bLY+ 
								"L"+bRX+","+bRY+ 
								"L"+topX+","+topY+"Z");
        this.data = paper.text(this.centerx, this.centery, "");
        this.data.attr("font-size", 18);
}
function Circle (paper, topX, topY, radius) {
    this.paper = paper;
    this.tx = topX; 
    this.ty = topY;
    this.bx = topX;
    this.by = topY + radius*2;
    this.centerx = topX;
    this.centery = topY + radius;
    this.radius = radius;
    this.shape = paper.circle(this.centerx, this.centery, this.radius);
    this.data = paper.text(this.centerx, this.centery, "");
    this.data.attr("font-size", 18);
}
function Arrow (paper, x1, y1, x2, y2, size) {
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
