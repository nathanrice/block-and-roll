class Shape {

	constructor( ctx ) {

		this.ctx = ctx;

	}

	drawRect( color = null, xPos = null, yPos = null, width = null, height = null ) {

		color  = color  || "#000000";
		width  = width  || 10;
		height = height || 10;
		xPos   = xPos   || 0;
		yPos   = yPos   || 0;

		this.ctx.fillStyle = color;
		this.ctx.fillRect( xPos, yPos, width, height );

	}

}
