var tokenize = function (string) {
    return string.split(/([0-9]+|[*+-\/()])/);
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
    var tokens = tokenize(string);
    var rpn = shuntingyard(tokens);
    if (rpn == null) { return Number(""); }
    var result = evaluate(rpn);
    if (result == null) { return Number(""); }
    return result;
}
var test1 = "3 + 4";
document.write(test1+" = "+evaluate(shuntingyard(tokenize(test1)))+"</br>");
var test2 = "((5 - 2) * 4) / 3";
document.write(test2+" = "+evaluate(shuntingyard(tokenize(test2)))+"</br>");