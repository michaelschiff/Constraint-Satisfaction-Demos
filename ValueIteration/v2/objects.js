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
