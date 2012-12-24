function parse (string) {
		var clean = string.replace(/ /gi, "");
		var pFlag = true;
		var pt = 0;
		for (var i = 0; i < clean.length; i++) {
			if (clean.charAt(i) == ")") { pt++; }
			if (clean.charAt(i) == "(") { pt--; }
			if (pt == 0 && i != 0 && i != clean.length-1) { pFlag = false; }
		}
		if (pFlag && clean.charAt(0) == "(" && clean.charAt(clean.length-1) == ")") { clean = clean.slice(1, clean.length-1); }
		console.log(clean);
		if (!isNaN(Number(clean))) { return parseFloat(clean, 10); }
		var curParenDepth = 0;
		var minParenDepth = Number.POSITIVE_INFINITY;
		var operator = null;
		var opIndex = null;
		for (var i = 0; i < clean.length; i++) {
			var c = clean.charAt(i);
			if (c == "(") { curParenDepth++; }
			if (c == ")") { curParenDepth--; }
			if (c == "/" && curParenDepth+1 < minParenDepth) {
					minParenDepth = curParenDepth+1;
					operator = c;
					opIndex = i;
			} else if (c == "*" && curParenDepth < minParenDepth) { 
					minParenDepth = curParenDepth;
					operator = c;
					opIndex = i;
			} else if ((c == "+" || c == "-") && curParenDepth <= minParenDepth) {
					minParenDepth = curParenDepth;
					operator = c;
					opIndex = i;
			}
		}
		if (opIndex == null) { return Number.NaN; }
		var left = clean.slice(0, opIndex);
		var right = clean.slice(opIndex+1);
		var ans;
		if (operator == "+") { ans = parse(left) + parse(right); }
		if (operator == "-") { ans = parse(left) - parse(right); }
		if (operator == "/") { ans = parse(left) / parse(right); }
		if (operator == "*") { ans = parse(left) * parse(right); }
		return Math.round(ans*Math.pow(10, 3))/Math.pow(10, 3);
}
/*
document.write("5 = "+parse("5")+"<br/>");
document.write("'' = "+parse("")+"<br/>");
document.write("' ' = "+parse(" ")+"<br/>");
document.write("1+1 = "+parse("1+1")+"<br/>");
document.write("1 + 1 = "+parse("1 + 1")+"<br/>");
document.write("1 + (2 + 3) = "+parse("1 + (2 + 3)")+"<br/>");
document.write("1 / 3 = "+parse("1 / 3")+"</br>");
document.write("1 + 1 / 3 = "+parse("1 + 1 / 3")+"</br>");
document.write("1 + 1 / 3 + (5 + 2*2) = "+parse("1 + 1 / 3 + (5 + 2*2)")+"</br>");
document.write("3 * (4 + 2 * 8 /2 - (5 / 3 * 2)) = "+parse("3 * (4 + 2 * 8 /2 - (5 / 3 * 2))")+"</br>");
document.write("3 + 4 / 6 * 9 / 6 + 6 = "+parse("3 + 4 / 6 * 9 / 6 + 6")+"</br>");
document.write("(2 + 3 / 5) - (3 * ( 4 / 5* (2 + 1)) - 4) + (6 *2) = "+parse("(2 + 3 / 5) - (3 * ( 4 / 5* (2 + 1)) - 4) + (6 *2)")+"</br>");
*/
document.write("(3+3)/9 = "+parse("(3+3)/9")+"</br>");
