var drawPart1 = function (paper, fill1, fill2) {	
	var vArray = new Array();
	var x = 125;
	var y = 3;
	for (var i = 0; i < 6; i++) {
			var v = new Triangle(paper, x, y, 55, 80);
			vArray[i] = v;
			if (i % 2 == 0) {
					v.shape.attr({"stroke-width": 3, "stroke": fill1, "fill":"#fff", "fill-opacity":0.0});
					x += 200;
		    } else {
					v.shape.attr({"stroke-width": 3, "stroke": fill2, "fill":"#fff", "fill-opacity":0.0});
					x = 125;
					y += 250;	
			}
	}
	return vArray;
}
var drawPart2 = function (paper, fill1, fill2) {
	var qArray = new Array();
	x = 75;
	y = 118;
	for (var i = 0; i < 8; i++) {
			var q = new Circle(paper, x, y, 30);
			qArray[i] = q;
			if (i % 4 == 0) {
					q.shape.attr({"stroke-width":3, "stroke": fill1, "fill":"#fff", "fill-opacity":0.0})
					x += 100;
		    } else if (i % 4 == 1) {
					q.shape.attr({"stroke-width":3, "stroke":fill1, "fill":fill1, "fill-opacity":0.3});
					x += 100;
			} else if (i % 4 == 2) {
					q.shape.attr({"stroke-width":3, "stroke":fill2, "fill":"#fff", "fill-opacity":0.0});
					x += 100;
			} else if (i % 4 == 3) {
					q.shape.attr({"stroke-width":3, "stroke":fill2, "fill":fill2, "fill-opacity":0.3});
					x = 75;
					y += 260;
			}
	}
	return qArray;
}
var drawPart3 = function (paper, vArray, qArray) {
	var t1 = 0;
	var t2 = 1;
	for (var i = 0; i < 4; i++) {
			var v = vArray[i];
			var q1 = qArray[t1];
			var q2 = qArray[t2];
			var a1 = Arrow(paper, v.bx, v.by, q1.tx, q1.ty, 10);
			var a2 = Arrow(paper, v.bx, v.by, q2.tx, q2.ty, 10);
			a1.attr("stroke-width", 2);
			a2.attr("stroke-width", 2);
			t1 += 2;
			t2 += 2;
	}
	var tempV = 2;
	for (var i = 0; i < 8; i++) {
			var q = qArray[i];
			var v1 = vArray[tempV];
			var v2 = vArray[tempV+1];
			var a1 = Arrow(paper, q.bx, q.by, v1.tx, v1.ty, 10);
			var a2 = Arrow(paper, q.bx, q.by, v2.tx, v2.ty, 10);
			a1.attr("stroke-width", 2);
			a2.attr("stroke-width", 2);
			if (i == 3) { tempV += 2; }
	}
}
var drawKey = function(keypaper, keypaper2) {
    var temp1 = new Triangle(keypaper, 50, 3, 55, 80);
    temp1.shape.attr({"stroke": "#00f", "stroke-width":3, "fill":"none"});
    temp1.data.attr({"font-size": 18, "text":"A"});
    var temp2 = new Triangle(keypaper, 150, 3, 55, 80);
    temp2.shape.attr({"stroke":"#f0f", "stroke-width":3, "fill":"none"});
    temp2.data.attr({"font-size": 18, "text":"B"});
    keypaper2.circle(50,33, 30).attr({"stroke":"#00f", "stroke-width": 3,});
    keypaper2.text(50, 33, "Q(A,0)").attr("font-size", 18);
    keypaper2.circle(150, 33, 30).attr({"stroke":"#00f", "stroke-width": 3, "fill":"#00f", "fill-opacity":0.3});
    keypaper2.text(150, 33, "Q(A,1)").attr("font-size", 18);
    keypaper2.circle(250, 33, 30).attr({"stroke":"#f0f", "stroke-width": 3});
    keypaper2.text(250, 33, "Q(B,0)").attr("font-size", 18);
    keypaper2.circle(350, 33, 30).attr({"stroke":"#f0f", "stroke-width":3, "fill":"#f0f", "fill-opacity":0.3});
    keypaper2.text(350, 33, "Q(B,1)").attr("font-size", 18);
}
var drawModel = function() {
    //draw the table in "markovmodel" div object in the html
    var Table = new Array();
    var body = document.getElementById("markovmodel");
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");
    for (var i = 0; i < 10; i++) {
		var row = document.createElement("tr");
		Table.push(row);
    }
    for (var i = 0; i < 5; i++) {
		var cell = document.createElement("th");
		var cellText;
		if (i == 0) { cellText = document.createTextNode("s"); }
		if (i == 1) { cellText = document.createTextNode("a"); }
		if (i == 2) { cellText = document.createTextNode("s'");}
		if (i == 3) { cellText = document.createTextNode("T(s,a,s')"); }
		if (i == 4) { cellText = document.createTextNode("R(s,a,s')"); }
		cell.appendChild(cellText);
		Table[1].appendChild(cell);
    }
    for (var i = 2; i < 6; i++) { 
		var cell = document.createElement("td");
		cell.appendChild(document.createTextNode("A"));
		Table[i].appendChild(cell);
    }
    for (var i = 6; i < 10; i++) {
		var cell = document.createElement("td");
		cell.appendChild(document.createTextNode("B"));					
		Table[i].appendChild(cell);
    }
    for (var i = 2; i < 10; i++) {
		var cell = document.createElement("td");
		if (i == 2 || i == 3 || i == 6 || i == 7) { cell.appendChild(document.createTextNode("0")); }
		else { cell.appendChild(document.createTextNode("1")); }
		Table[i].appendChild(cell);
    }
    for (var i = 2; i < 10; i++) {
		var cell = document.createElement("td");
		if (i % 2 == 0) { cell.appendChild(document.createTextNode("A")); }
		else { cell.appendChild(document.createTextNode("B")); }
		Table[i].appendChild(cell);
    }
    for (var i = 0; i < 8; i++) {
		var cell = document.createElement("td");
		cell.appendChild(document.createTextNode(T[i]));
		Table[i+2].appendChild(cell);
		cell = document.createElement("td");
		cell.appendChild(document.createTextNode(R[i]));
		Table[i+2].appendChild(cell);
    }
    for (var i = 0; i < 10; i++) {
		tblBody.appendChild(Table[i]);
    }
    tbl.appendChild(tblBody);
    body.appendChild(tbl);
    tbl.setAttribute("class", "table table-bordered");
}
