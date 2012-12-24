var button;
(function () {
    /////////////////////////////////////////////////////////////////////////
    //////////////////////Low-Level Shape Definitions////////////////////////
    /////////////////////////////////////////////////////////////////////////
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
 
    /////////////////////////////////////////////////////////////////////////
    ///////////////////Question Setup////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////
    //some object definitions
    function vValue (id) {
		this.id = id;
		this.shape = null;
		this.correct = false;
		this.setShape = function (shape) { this.shape = shape; }
		this.setShapeOnMouseOver = function (fn) {
				this.shape.shape.node.onmouseover = fn;
				this.shape.data.node.onmouseover = fn;
		}
		this.setShapeOnClick = function (fn) {
				this.shape.shape.node.onclick = fn;
				this.shape.data.node.onclick = fn;
		}
    }
    function qValue (id) {
		this.id = id;
		this.shape = null;
		this.correct = false;
		this.setShape = function (shape) { this.shape = shape; }
		this.setShapeOnMouseOver = function (fn) {
				this.shape.shape.node.onmouseover = fn;
				this.shape.data.node.onmouseover = fn;
		}
		this.setShapeOnClick = function (fn) {
				this.shape.shape.node.onclick = fn;
				this.shape.data.node.onclick = fn;
		}
    }
    //These arrays are the markov model
    var T = new Array();
    var R = new Array();
    //Fill T with numbers between 0 and 1 rounded to 1 decimal place
    for (var i = 0; i < 4; i++) {
        var t1 = Math.random();
        var t2 = 1.0-t1;
        t1 = Math.round(t1*10)/10;
        t2 = Math.round(t2*10)/10;
        T.push(t1);
        T.push(t2);
    }
    //Fill R with integers between -2 and 3, inclusive
    for (var i = 0; i < 8; i++) {
		R.push(Math.floor(-3 + (1+2+3)*Math.random()));
    }
    
    var vVals = new Array();
    var qVals = new Array();
    //push 6 vVals and 8 qVals onto their respective arrays, each stores
    //the id corresponding to a text field on the html page
    for (var i = 1; i <= 6; i++) { vVals.push( new vValue("v"+i) ); }
    for (var i = 1; i <= 8; i++) { qVals.push( new qValue("q"+i) ); }
    
    
    
    /////////////////////////////////////////////////////////////////////////
    ///////////////////define drawing functions//////////////////////////////
    /////////////////////////////////////////////////////////////////////////
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
    ////////////////////////End Drawing Definitions//////////////////////////
    
    /////////////////////////////////////////////////////////////////////////
    ///////////////////////Define Calculator Parser//////////////////////////
    /////////////////////////////////////////////////////////////////////////
    //The following is my implementation of the Shunting Yard Algoritm and a
    //reverse-polish notation evaluator.
    var tokenize = function (string) {
        return string.split(/([0-9]\.[0-9]+|\.[0-9]+|[0-9]+|[*+-\/()])/);
    }
    var operator = function (x) { return (x == '+' || x == '-' || x == '*' || x == '/'); }
    var shuntingyard = function(tokens) {
        var precedence = new Array();
        precedence['+'] = 0;
        precedence['-'] = 0;
        precedence['*'] = 1;
        precedence['/'] = 1;
        var outputQueue = new Array();
        var stack = new Array();
        while (tokens.length > 0) {
            token = tokens.shift();
            if (token == '' || token == ' ') { continue; }
            if (!isNaN(Number(token))) { outputQueue.push(token); }
            else if (operator(token)) {
                while (operator(stack[0]) && precedence[token] < precedence[stack[0]]) {
                    outputQueue.push(stack.shift());
                }
                stack.unshift(token);
            }
            else if (token == '(') { stack.unshift(token); }
            else if (token == ')') {
                while (stack.length > 0 && stack[0] != '(') { outputQueue.push(stack.shift()); }
                if (stack.length == 0) { return null; }
                else { stack.shift(); }
            }
            //return null;
        }
        while (stack.length > 0) {
            if (stack[0] == '(' || stack[0] == ')') { return null; }
            else { outputQueue.push(stack.shift()); }
        }
        return outputQueue;
    }
    var evaluate = function(RPNArray) {
        output = new Array ();
        while (RPNArray.length > 0) {
            var token = RPNArray.shift();
            if (operator(token)) {
                if (output.length < 2) { return null; }
                var op2 = output.shift();
                var op1 = output.shift();
                if (isNaN(op2) || isNaN(op1)) { return null; }
                op2 = Number(op2);
                op1 = Number(op1);
                var result;
                if (token == '+') { result = op1 + op2; }
                else if (token == '-') { result = op1 - op2; }
                else if (token == '/') { result = op1 / op2; }
                else if (token == '*') { result = op1 * op2; }
                output.unshift(result);
            } else if (isNaN(Number(token))) { return null; }
            else { output.unshift(token); }
        }
        return output.shift();
    }
    var parse = function (string) {
        //var tokens = tokenize(string);
        //var rpn = shuntingyard(tokens);
        //if (rpn == null) { return Number("NaN"); }
        //var result = evaluate(rpn);
        //if (result == null) { return Number("NaN"); }
        //return Math.round(result*1000)/1000;
        return Math.round(eval(string)*1000)/1000;
    }
    
    /////////////////////////////////////////////////////////////////////////
    /////////////////////////Draw the Diagram////////////////////////////////
    /////////////////////////////////////////////////////////////////////////
    //draw initial diagram on the "paper1" div object in the html
    var paper1 = Raphael("paper1", 420, 575);
    var vShapes = drawPart1(paper1, "#00f", "#f0f");
    var qShapes = drawPart2(paper1, "#00f", "#f0f");
    drawPart3(paper1, vShapes, qShapes);
    //draw the key on "keypaper" and "keypaper2" div object in the html
    var keypaper = Raphael("keypaper", 200, 65);
    var keypaper2 = Raphael("keypaper2", 400, 65);
    drawKey(keypaper, keypaper2);
    //adds the markov model table to the "markovmodel" div object in the html
    drawModel()
    
    /////////////////////////////////////////////////////////////////////////
    ////////////////////Attatch Diagram to Question//////////////////////////
    /////////////////////////////////////////////////////////////////////////
    //set the shapes returned by drawPart1 to the shape variable of the vValues
    for (var i = 0; i < vVals.length; i++) {
        vVals[i].shape = vShapes[i];
    }
    //set the shapes returned by drawpart2 to the shape variable of the qValues
    for (var i = 0; i < qVals.length; i++) {
        qVals[i].shape = qShapes[i];
    }
    
    /////////////////////////////////////////////////////////////////////////
    ////////////////////Set-up Click Functions///////////////////////////////
    /////////////////////////////////////////////////////////////////////////
    //helper for next bit
    var closeTextBoxes = function () {
        for (var i = 0; i < vVals.length; i++) {
            var v = vVals[i];
            document.getElementById(v.id).type = 'hidden';
            v.shape.data.attr({"text": parse(document.getElementById(v.id).value)});
        }
        for (var i = 0; i < qVals.length; i++) {
            var q = qVals[i]
            document.getElementById(q.id).type = 'hidden';
            q.shape.data.attr({"text": parse(document.getElementById(q.id).value)});
        }
    }
    //closure so that the click on mo function are created within a scope that knows
    //which v or q Value's shape was clicked.  the actual setting of these two functions
    //is done in this function
    var closure = function(x) {
        var myObject = x;
        //define the oncick function for all v and q Values in the diagram
        var click = function () {
            closeTextBoxes();
            document.getElementById(myObject.id).type = 'text';
            document.getElementById(myObject.id).focus();
            document.getElementById(myObject.id).onkeypress = function(e) {
                if (e.charCode == 13) {
                    document.getElementById(myObject.id).type = 'hidden';
                    myObject.shape.data.attr({"text": parse(document.getElementById(myObject.id).value)});
                }
            }
        }
        //define the onmouseover function for all v and q Values in the diagram
        var mo = function () { this.style.cursor = 'pointer'; }
        //setting the two functions here
        myObject.setShapeOnClick(click);
        myObject.setShapeOnMouseOver(mo);
    }
    //set the onclick and mouseoverfunctions for all v and q Values in the diagram
    //using the closure defined above
    for (var i = 0; i < vVals.length; i++) { closure(vVals[i]); }
    for (var i = 0; i < qVals.length; i++) { closure(qVals[i]); }

    /////////////////////////////////////////////////////////////////////////
    ///////////////////////Set-Up For Checking///////////////////////////////
    /////////////////////////////////////////////////////////////////////////
    //define the correcting function
    var flag = false;
    var vAns = new Array();
    var qAns = new Array();
    var correct = function () { 
        vAns[5] = 0;
        vAns[4] = 0;
        lastV = 5;
        nextV = 3;
        tableIndex = 7;
        for (var i = 7; i >= 0; i--) {
			qAns[i] = T[tableIndex]*(R[tableIndex]+vAns[lastV]) +
            T[tableIndex-1]*(R[tableIndex-1]+vAns[lastV-1]);
			qAns[i] = Math.round(qAns[i]*Math.pow(10, 3))/Math.pow(10, 3);
			tableIndex -= 2;
			if (i % 4 == 0) { 
				vAns[nextV] = Math.max(qAns[i+2], qAns[i+3]);
				vAns[nextV-1] = Math.max(qAns[i], qAns[i+1]);
				lastV = 3;
				nextV = 1;
				tableIndex = 7;
			}
        }
        for (var i = 0; i < vVals.length; i++) {
			if (vAns[i] == parse(document.getElementById(vVals[i].id).value)) { vVals[i].correct = true; }
			else { flag = true; }
            console.log(vVals[i].id+" should match "+vAns[i]);
        }
        for (var i = 0; i < qVals.length; i++) {
			if (qAns[i] == parse(document.getElementById(qVals[i].id).value)) { qVals[i].correct = true; }
			else { flag = true; }
            console.log(qVals[i].id+" should match "+qAns[i]);
        }
    }
    //define the checking function that recolors all of the shapes in the diagram based on their correct value
    var check = function () {
        //close any open submission fields and store their values
        closeTextBoxes();
        //get rid of submit button so they cant submit again
        var elm = document.getElementById("submitbutton");
        var par = elm.parentNode;
        par.removeChild(elm);
        //add a reset button where the submit was to refresh the page
        var resetButton = document.createElement("button");
        resetButton.setAttribute("class", "btn1");
        resetButton.innerHTML = "Reset";
        resetButton.setAttribute("onclick", "window.location.reload()");
        par.appendChild(resetButton);
        correct()
        for (var i = 0; i < vVals.length; i++) {
			var v = vVals[i];
            if (v.correct) { v.shape.shape.attr({"stroke":"#0f0", "fill":"#0f0", "fill-opacity":0.5}); }  
            else { v.shape.shape.attr({"stroke": "#f00", "fill":"#f00", "fill-opacity":0.5}); }
            v.setShapeOnClick(null);
            v.setShapeOnMouseOver(null);
        }
        for (var i = 0; i < qVals.length; i++) {
			var q = qVals[i];
            if (q.correct) { q.shape.shape.attr({"stroke":"#0f0", "fill":"#0f0", "fill-opacity":0.5}); }
            else { q.shape.shape.attr({"stroke": "#f00", "fill":"#f00", "fill-opacity":0.5}); }
            q.setShapeOnClick(null);
            q.setShapeOnMouseOver(null);
        }
        if (flag) {
            //if flag then the user got something wrong so draw the correct diagram on the "correctDiagram div object
            var correctDiagram = Raphael("correctDiagram", 420, 575);
            var tempVShapes = drawPart1(correctDiagram, "#0f0", "#0f0");
            var tempQShapes = drawPart2(correctDiagram, "#0f0", "#0f0");
            drawPart3(correctDiagram, tempVShapes, tempQShapes);
            for (var i = 0; i < tempVShapes.length; i++) { 
                tempVShapes[i].data.attr("text", vAns[i]);
                tempVShapes[i].shape.attr({"fill": "#0f0", "fill-opacity":0.3});
            }
            for (var i = 0; i < tempQShapes.length; i++) { 
                tempQShapes[i].data.attr("text", qAns[i]);
                tempQShapes[i].shape.attr({"fill": "#0f0", "fill-opacity":0.3});
            }
        }
    }
    button = check;
}());
//activate the sumbit button on the html page
document.getElementById("submitbutton").setAttribute("onclick", "button()");
