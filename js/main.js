

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var pieces, ground, currentPiece, cursors;
var nextStrokeTime = 0;
var timeBetweenStrokes = 200;
var moveSpacing = 32;
var piecesVerticalVelocity = 40;

function preload() 
{
	game.load.image('square', 'assets/square.png');
}

function create() 
{
	canMove = true;
	pieces = game.add.group();
	pieces.enableBody = true;

	ground = game.add.sprite(0,game.world.height-10,'square');
	ground.scale.setTo(70,1);
	game.physics.arcade.enable(ground);
	ground.body.immovable = true;
	currentPiece = new Cube(50,50);
	cursors = game.input.keyboard.createCursorKeys();
	
}

function update() 
{
	game.physics.arcade.collide(pieces,ground,pieceHitGround);
	game.physics.arcade.collide(pieces,pieces);
	if(cursors.left.isDown && game.time.now > nextStrokeTime)
	{
		nextStrokeTime = game.time.now + timeBetweenStrokes;
		currentPiece.moveLeft(moveSpacing);
	}
	else if(cursors.right.isDown && game.time.now > nextStrokeTime)
	{
		nextStrokeTime = game.time.now + timeBetweenStrokes;
		currentPiece.moveRight(moveSpacing);
	}	
}

function Cube(x,y)
{
	this.x = x;
	this.y = y;
	this.numPieces = 4;
	this.allPieces = [];
	temp = pieces.create(x,y,'square');
	//temp.body.gravity.y = 20;
	temp.body.velocity.y = piecesVerticalVelocity;
	this.allPieces[0] = temp;
	temp = pieces.create(x+16,y,'square');
	//temp.body.gravity.y = 20;
	temp.body.velocity.y = piecesVerticalVelocity;
	this.allPieces[1] = temp;
	temp = pieces.create(x,y+16,'square');
	//temp.body.gravity.y = 20;
	temp.body.velocity.y = piecesVerticalVelocity;
	this.allPieces[2] = temp;
	temp = pieces.create(x+16,y+16,'square');
	//temp.body.gravity.y = 20;
	temp.body.velocity.y = piecesVerticalVelocity;
	this.allPieces[3] = temp;
	this.moveLeft = function(value)
	{
		for (var i=0 ;i<4;i++)
		{
			this.allPieces[i].body.x -= value;
		}
	}
	this.moveRight = function(value)
	{
		for (var i=0 ;i<4;i++)
		{
			this.allPieces[i].body.x += value;
		}
	}
}

function pieceHitGround()
{
	currentPiece = null;
}

function cancelTimer()
{
	canMove = true;
}