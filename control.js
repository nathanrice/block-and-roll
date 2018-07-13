class Control {

	constructor( character ) {

		this.character = character;

		this.holdLeft  = false;
		this.holdRight = false;
		this.holdUp    = false;
		this.holdA     = false;

		window.addEventListener( "keydown", this.keyListener.bind( this ) );
		window.addEventListener( "keyup", this.keyListener.bind( this ) );

	}

	keyListener( e ) {

		var keyState = ( e.type == "keydown" ) ? true : false;

		switch( e.keyCode ) {

			case 37: // left key
				this.holdLeft    = keyState;
				this.releaseLeft = ! keyState;
				break;
			case 38: // up key
				this.holdUp    = keyState;
				this.releaseUp = ! keyState;
				break;
			case 39: // right key
				this.holdRight    = keyState;
				this.releaseRight = ! keyState;
				break;
			case 65: // a key
				this.holdA    = keyState;
				this.releaseA = ! keyState;
				break;
			case 83: // s key
				this.holdS    = keyState;
				this.releaseS = ! keyState;
				break;

		}

	}

}
