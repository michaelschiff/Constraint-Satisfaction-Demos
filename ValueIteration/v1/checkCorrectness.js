var correct = function () { 
	var vAns = new Array();
	var qAns = new Array();
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
			console.log(vVals[i].id+" should match "+vAns[i]);
	}
	for (var i = 0; i < qVals.length; i++) {
			if (qAns[i] == parse(document.getElementById(qVals[i].id).value)) { qVals[i].correct = true; }
			console.log(qVals[i].id+" should match "+qAns[i]);
	}
}
var check = function () {
	correct()
	for (var i = 0; i < vVals.length; i++) {
			var v = vVals[i];
			v.shape.node.onclick = null;
			v.data.node.onclick = null;
			v.shape.node.onmouseover = null;
			v.data.node.onmouseover = null;
			if (v.correct) { v.shape.attr({"stroke":"#0f0", "fill":"#0f0", "fill-opacity":0.5}); }  
			else { v.shape.attr({"stroke": "#f00", "fill":"#f00", "fill-opacity":0.5}); }
	}
	for (var i = 0; i < qVals.length; i++) {
			var q = qVals[i];
			q.shape.node.onclick = null;
			q.data.node.onclick = null;
			q.shape.node.onmouseover = null;
			q.data.node.onmouseover = null;
			if (q.correct) { q.shape.attr({"stroke":"#0f0", "fill":"#0f0", "fill-opacity":0.5}); }
			else { q.shape.attr({"stroke": "#f00", "fill":"#f00", "fill-opacity":0.5}); }
	}
}
var submitButton = document.getElementById("submitbutton");
submitButton.setAttribute("onclick", "check()");
