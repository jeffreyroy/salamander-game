window.onload = function() {

    //  Note that this html file is set to pull down Phaser 2.5.0 from the JS Delivr CDN.
    //  Although it will work fine with this tutorial, it's almost certainly not the most current version.
    //  Be sure to replace it with an updated version before you start experimenting with adding your own code.

    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });


	function preload() {

	    game.stage.backgroundColor = '#85b5e1';

	    game.load.baseURL = '/images/';
	    game.load.crossOrigin = 'anonymous';

	    game.load.image('player', 'sprites/phaser-dude.png');
	    game.load.image('platform', 'sprites/platform.png');
	    game.load.image('max', 'sprites/max.png');
	    game.load.spritesheet('lizard', 'sprites/lizard-small.png', 48, 48);
	    game.load.spritesheet('worm', 'sprites/worm-small.png', 48, 48);

	}

	var player;
	var platforms;
	var cursors;
	var jumpButton;
	var xVelocity;
	var worm;
	var introText;

	function create() {

	    // player = game.add.sprite(100, 200, 'player');
	    player = game.add.sprite(0, 0, 'lizard');
	    worm = game.add.sprite(400, 300, 'worm');
	    
	    xVelocity = 0;

	    game.physics.arcade.enable(player);
	    game.physics.arcade.enable(worm);

	    player.body.collideWorldBounds = true;
	    worm.body.collideWorldBounds = true;
	    // player.body.gravity.y = 800;

	    // platforms = game.add.physicsGroup();

	    // platforms.create(500, 300, 'platform');
	    // platforms.create(-100, 400, 'platform');
	    // platforms.create(400, 500, 'platform');

	    // platforms.setAll('body.immovable', true);

	    cursors = game.input.keyboard.createCursorKeys();
	    // jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	    player.animations.add('down', [0, 1, 2, 1], 10, true);
	    player.animations.add('left', [3, 4, 5, 4], 10, true);
	    player.animations.add('right', [6, 7, 8, 7], 10, true);
	    player.animations.add('up', [9, 10, 11, 10], 10, true);	    
	    worm.animations.add('down', [0, 1, 2, 1], 5, true);
	    worm.animations.add('left', [3, 4, 5, 4], 5, true);
	    worm.animations.add('right', [6, 7, 8, 7], 5, true);
	    worm.animations.add('up', [9, 10, 11, 10], 5, true);
	    worm.animations.play('right');
	    worm.body.velocity.x = 50;

    	introText = game.add.text(200, 200, 'Catch the worm!', { font: "40px Arial", fill: "#ffffff", align: "center" });
    	introText.visible = false;

		// var lizard = game.add.sprite(300, 200, 'lizard');

		//  Here we add a new animation called 'walk'
		//  Because we didn't give any other parameters it's going to make an animation from all available frames in the 'lizard' sprite sheet
		// var walk = lizard.animations.add('walk');

		//  And this starts the animation playing by using its key ("walk")
		//  30 is the frame rate (30fps)
		//  true means it will loop when it finishes
		// lizard.animations.play('walk', 10, true);

	}

	function update () {
		playerMove();
		// if (game.physics.arcade.collide(player, worm)) {
		// 	worm.destroy;
		// }
        game.physics.arcade.collide(player, worm, catchWorm, null, this);
	}

	function catchWorm (_player, _worm) {
		_worm.kill();
		gameOver();
	}

	function playerMove () {

	    // game.physics.arcade.collide(player, platforms);

	    player.body.velocity.x = 0;
	    player.body.velocity.y = 0;



	    if (cursors.left.isDown)
	    {
	        // xVelocity -= 10;
	        player.body.velocity.x = -200;
	    	player.animations.play('left');

	    }
	    else if (cursors.right.isDown)
	    {
	        // xVelocity += 10;
	        player.body.velocity.x = 200;
	    	player.animations.play('right');

	    }
	    else if (cursors.up.isDown)
	    {
	        // xVelocity += 10;
	        player.body.velocity.y = -200;
	    	player.animations.play('up');

	    }
	    else if (cursors.down.isDown)
	    {
	        // xVelocity += 10;
	        player.body.velocity.y = 200;
	    	player.animations.play('down');

	    }
	    // else if (player.body.onFloor() || player.body.touching.down)
	    // {
	    //     xVelocity = 0;
	    //     player.body.velocity.x = xVelocity;
	    // }
	    // if (jumpButton.isDown)
	    // {
	    //     player.body.velocity.y = -400;
	    // }
	}

	function gameOver () {
    
    introText.text = 'You caught the worm!';
    introText.visible = true;

}

	function render () {

	}
}