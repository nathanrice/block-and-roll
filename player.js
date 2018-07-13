class Player extends Character {

	constructor( map ) {

		super( map );

		this.name    = "Block";
		this.color   = "#ffffff";
		this.width   = 30;
		this.height  = 60;

		this.canJump = true;
		//this.hover   = true;
		//this.jetpack = true;

		this.xPos    = map.bottomLeft.x + 10;
		this.yPos    = map.bottomLeft.y - 300;

		this.mass    = 8;
		this.jf      = this.mass * 4; // jump force
		this.lf      = 2; // lateral force

		this.jumpFrame = 1;
		this.jumpHoverFrame = 1;

		this.powerups();

	}

	powerups() {

		if ( this.jetpack ) {
			this.jetpackOn = false;
			this.jf       *= 1.2; // double jump force
		}

	}

	jump() {

		if ( ! this.canJump ) {
			return false;
		}

		// Increase y velocity by jump force divided by our jump frame,
		// effectively reducing our y velocity each frame (via weight),
		// until our weight decreases our y velocity faster then our jump,
		// increases it.
		this.yv += this.jf / this.jumpFrame;

		// jetpack descent
		if ( this.jetpack ) {

			this.jetpackOn = true;

			if ( this.yv < -2 && this.jumpHoverFrame < game.fps * 1 ) {
				this.yv = -3;
				this.jumpFrame -= 1; // pause jump timer
				this.jumpHoverFrame += 1;
			}

		}

		// smb2 peach simulation (3 sec hover)
		if ( this.hover && this.yv < -2 && this.jumpHoverFrame < game.fps * 1 ) {
			this.yv = 0;
			this.jumpFrame -= 1; // pause jump timer
			this.jumpHoverFrame += 1;
		}

		// In air indicator.
		this.inAir = true;

		// Increase jump frame by 1.
		this.jumpFrame += 1;

	}

	jumpReset() {

		this.canJump = true;
		this.control.holdUp = false;
		this.jumpFrame = 1;
		this.jumpHoverFrame = 1;

	}

	jumping() {

		if ( ! this.canJump ) {
			return false;
		}

		if ( this.inAir && this.control.holdUp ) {
			return false;
		}

		return true;

	}

	physics() {

		// downward force (gravity)
		this.yv -= this.mass * this.map.gravity;

		// if we're pressing the jump button, jump.
		if ( this.control.holdUp ) {
			this.jump();
		}
		// else, if we're in the air, disable jump
		// until we land on a surface.
		else if ( this.inAir ) {
			this.canJump = false;
		}

		// friction
		if ( false === this.inAir ) {
			this.xv *= 1 - this.map.friction;
		}
		// drag
		else {
			this.xv *= 1 - this.map.drag;
			this.yv *= 1 - this.map.drag;
		}

		// Move left
		if ( this.control.holdLeft ) {

			this.facing = 'left';

			if ( false === this.inAir ) {
				this.xv -= this.lf * (1 - this.map.friction) * (this.control.holdA ? 4 : 1);
			}
			else {
				this.xv -= this.lf * (1 - this.map.friction) * (this.control.holdA ? 4 : 1);
			}

		}

		// Move left
		if ( this.control.holdRight ) {

			this.facing = 'right';

			if ( false === this.inAir ) {
				this.xv += this.lf * (1 - this.map.friction) * (this.control.holdA ? 4 : 1);
			}
			else {
				this.xv += this.lf * (1 - this.map.friction) * (this.control.holdA ? 4 : 1);
			}

		}

		// Move
		this.xPos += this.xv;
		this.yPos -= this.yv;

	}

	animate() {

		this.physics();

		// Floor
		if ( this.yPos + 60 > this.map.bottomLeft.y - 30 ) {
			this.yPos = this.map.bottomLeft.y - 30 - 60;
			this.yv = 0;
			this.inAir = false;
			this.jumpReset();
		}

		// Left/Right edges
		if ( this.xPos < -30 ) {
			this.xPos = this.map.width;
		}
		else if ( this.xPos > this.map.width ) {
			this.xPos = -30;
		}

		//console.log( "xPos: " + this.xPos + " yPos: " + this.yPos );
		//console.log( "xv: " + this.xv + " yv: " + this.yv );

	}

}
