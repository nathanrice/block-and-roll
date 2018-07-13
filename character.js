class Character {

	constructor( map ) {

		this.map   = map;
		this.ctx   = this.map.ctx;
		this.shape = new Shape( this.ctx );

		this.name    = name;
		this.xPos    = 0;
		this.yPos    = 0;
		this.color   = '#ffffff';
		this.width   = 30;
		this.height  = 30;

		// physics
		this.mass    = 10;
		this.jf      = this.height / 2; // jump force
		this.lf      = 5; // lateral force

		// default states
		this.facing  = 'right';
		this.inAir   = true;
		this.xv      = 0;
		this.yv      = 0;

		// powerups
		this.hover   = false;
		this.jetpack = false;

		this.control = new Control( this );

	}

	getFeetxPos() {
		return this.yPos + this.width;
	}

	getFeetyPos() {
		return this.yPos + this.height;
	}

	getHeadxPos() {
		return this.xPos + this.width / 2;
	}

	getHeadxPos() {
		return this.yPos;
	}

	draw() {

		this.shape.drawRect( this.color, this.xPos, this.yPos, this.width, this.height );
		this.shape.drawRect( "#000000", this.xPos + ( 'left' === this.facing ? 4 : 24 ), this.yPos + 5, 3, 3 ); // eye

		if ( this.jetpack ) {
			this.shape.drawRect( "#614126", this.xPos + ( 'left' === this.facing ? 30 : -5 ), this.yPos + 5, 5, 20 );
			if ( this.jetpackOn ) {
				this.shape.drawRect( "red", this.xPos + ( 'left' === this.facing ? 30 : -5 ), this.yPos + 25, 5, 5 );
			}
		}

	}

}
