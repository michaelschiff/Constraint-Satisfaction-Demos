var T = new Array();
var R = new Array();
//Fill T with numbers between 0 and 1 rounded to 1 decimal place
//Fill R with integers between -2 and 3, inclusive
for (var i = 0; i < 8; i++) {
		T.push(Math.round(Math.random()*10)/10);
		R.push(Math.floor(-3 + (1+2+3)*Math.random()));
}

var vVals = new Array();
var qVals = new Array();
//push 6 vVals and 8 qVals onto their respective arrays, each stores
//the id corresponding to a text field on the html page
for (var i = 1; i <= 6; i++) { vVals.push( new vValue("v"+i) ); }
for (var i = 1; i <= 8; i++) { qVals.push( new qValue("q"+i) ); }

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


//set the shapes returned by drawPart1 to the shape variable of the vValues
for (var i = 0; i < vVals.length; i++) {
    vVals[i].shape = vShapes[i];
}
//set the shapes returned by drawpart2 to the shape variable of the qValues
for (var i = 0; i < qVals.length; i++) {
    qVals[i].shape = qShapes[i];
}

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
//activate the sumbit button on the html page
var submitButton = document.getElementById("submitbutton");
submitButton.setAttribute("onclick", "check()");
