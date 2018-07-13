/**
 * Map class template. Extend this class and define new property values to create new maps.
 */
class Map {

	/**
	 * Constructor.
	 *
	 * Pull in the canvas context, set the height/width of the canvas,
	 * set background and gravity properties, and ensure Player is valid.
	 */
	constructor( ctx ) {

		this.ctx = ctx;

		// Canvas dimensions
		this.ctx.canvas.width  = this.width  = 1024;
		this.ctx.canvas.height = this.height = 576;

		// Corners
		this.topLeft = { x: 0, y: 0 };
		this.topRight = { x: this.width, y: 0 };
		this.bottomLeft = { x: 0, y: this.height };
		this.bottomRight = { x: this.width, y: this.height };

		// Default Physics params
		this.gravity  = 1;
		this.drag     = 0.25;
		this.friction = 0.25;

		// The player
		this.player = new Player( this );

	}

	load() {


	}

	/**
	 * Draw the background based on its properties.
	 */
	drawBackground() {

		let shape = new Shape( this.ctx );
		shape.drawRect( "pink", 0, 0, this.width, this.height );

	}

	drawGround() {

		let shape = new Shape( this.ctx );
		shape.drawRect( "#dddddd", 0, this.height - 30, this.width, 30 );

	}

	drawPlatform() {

		let plat = { xPos: 100, yPos: this.height - 100 };

		let shape = new Shape( this.ctx );
		shape.drawRect( '#dddddd', plat.xPos, plat.yPos, 100, 10 );

	}

	drawPlayer() {

		this.player.draw( this.ctx );

	}

	animationLogic() {

		this.player.animate();

	}

	/**
	 * Draw the map and all its members 30x/sec.
	 */
	draw() {

		this.ctx.clearRect(0, 0, this.width, this.height);

		this.animationLogic();

		this.drawBackground();
		this.drawGround();
		this.drawPlatform();
		this.drawPlayer();

	}

}
