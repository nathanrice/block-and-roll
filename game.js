/**
 * Main Game class.
 */
class Game {

	/**
	 * Constructor.
	 *
	 * Get the canvas/context and the map to be used.
	 */
	constructor() {

		this.canvas = document.getElementById( 'gameWindow' );
		this.ctx    = this.canvas.getContext( '2d' );
		this.fps    = 30;
		this.map    = this.getMap();

	}

	/**
	 * Get the correct map depending on conditions.
	 */
	getMap() {

		return new Map1_1( this.ctx );

	}

	/**
	 * Start the game loop, load the game map.
	 */
	start() {

		setInterval( this.drawFrame.bind(this), 1000/this.fps );
		this.map.load();

	}

	/**
	 * Callback for our game loop. Runs 30x/sec.
	 */
	drawFrame() {

		this.map.draw( this.ctx );

	}

}
