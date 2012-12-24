var paper = Raphael("paper1", 420, 575);
for (var i = 1; i <= 6; i++) { new vValue("v"+i); }
for (var i = 1; i <= 8; i++) { new qValue("q"+i); }
var x = 125;
var y = 3;
for (var i = 0; i < vVals.length; i++) {
    var v = vVals[i];
    v.drawShape(paper, x, y);
    
    if (i % 2 == 0) {
        v.shape.attr({"stroke-width": 3, "stroke": "#00f", "fill":"#fff"});
        x += 200;
    } else {
        v.shape.attr({"stroke-width": 3, "stroke": "#f0f", "fill":"#fff"});
        x = 125;
        y += 250;
    }
}
x = 75;
y = 118;
for (var i = 0; i < qVals.length; i++) {
    var	q = qVals[i];
    q.drawShape(paper, x, y);
    if (i % 4 == 0) {
        q.shape.attr({"stroke-width":3, "stroke": "#00f", "fill":"#fff"})
        x += 100;
    } else if (i % 4 == 1) {
        q.shape.attr({"stroke-width":3, "stroke":"#00f", "fill":"#00f", "fill-opacity":0.5});
        x += 100;
    } else if (i % 4 == 2) {
        q.shape.attr({"stroke-width":3, "stroke":"#f0f", "fill":"#fff"});
        x += 100;
    } else if (i % 4 == 3) {
        q.shape.attr({"stroke-width":3, "stroke":"#f0f", "fill":"#f0f", "fill-opacity":0.5});
        x = 75;
        y += 260;
    }
}
var t1=0;
var t2=1;
for (var i = 0; i < 4; i++) {
    var v = vVals[i];
    var q1 = qVals[t1];
    var q2 = qVals[t2];
    var a1 = getArrow(paper, v.x, v.y+v.height, q1.x, q1.y, 10);
    var a2 = getArrow(paper, v.x, v.y+v.height, q2.x, q2.y, 10);
    a1.attr("stroke-width", 2);
    a2.attr("stroke-width", 2);
    t1 += 2;
    t2 += 2;
}
var tempV = 2;
for (var i = 0; i < 8; i++) {
    var q = qVals[i];
    var v1 = vVals[tempV];
    var v2 = vVals[tempV+1];
    var a1 = getArrow(paper, q.x, q.y+q.height, v1.x, v1.y, 10);
    var a2 = getArrow(paper, q.x, q.y+q.height, v2.x, v2.y, 10);
    a1.attr("stroke-width", 2);
    a2.attr("stroke-width", 2);
    if (i == 3) { tempV += 2; }
}
