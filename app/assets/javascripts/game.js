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
	    game.load.image('ruby', 'sprites/ruby.png');
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
	var rubyCount=0;

	function create() {

	    // player = game.add.sprite(100, 200, 'player');
	    player = game.add.sprite(0, 0, 'lizard');
	    worm = game.add.sprite(100, 600, 'worm');
	    worm2 = game.add.sprite(400, 100, 'worm');
	    var rubies = [];
	    for(i=0; i<10; i++) {
	    	var ruby = game.add.sprite(game.world.randomX,game.world.randomY, 'ruby');
	    	ruby.scale.setTo(0.05,0.05);
	    	rubies << ruby;
	    }

	    xVelocity = 0;

	    game.physics.arcade.enable(player);
	    game.physics.arcade.enable(worm);
	    game.physics.arcade.enable(worm2);

	    player.body.collideWorldBounds = true;
	    worm.body.collideWorldBounds = true;
	    worm2.body.collideWorldBounds = true;
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
	    worm2.animations.add('down', [0, 1, 2, 1], 5, true);
	    worm2.animations.add('left', [3, 4, 5, 4], 5, true);
	    worm2.animations.add('right', [6, 7, 8, 7], 5, true);
	    worm2.animations.add('up', [9, 10, 11, 10], 5, true);
	    worm2.animations.play('right');
	    worm2.body.velocity.x = 50;

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
		wormMove();
		wormMove2();
		// if (game.physics.arcade.collide(player, worm)) {
		// 	worm.destroy;
		// }
    game.physics.arcade.collide(player, worm, catchWorm, null, this);
    game.physics.arcade.collide(player, worm2, catchWorm, null, this);
	}

	function catchWorm (_player, _worm) {
		_worm.kill();
		loss();
	}

	function playerMove () {

	    // game.physics.arcade.collide(player, platforms);

	    player.body.velocity.x = 0;
	    player.body.velocity.y = 0;



	    if (cursors.left.isDown)
	    {
	      player.body.velocity.x = -200;
	    	player.animations.play('left');

	    }
	    else if (cursors.right.isDown)
	    {
	      player.body.velocity.x = 200;
	    	player.animations.play('right');

	    }
	    else if (cursors.up.isDown)
	    {
	      player.body.velocity.y = -200;
	    	player.animations.play('up');

	    }
	    else if (cursors.down.isDown)
	    {
	      player.body.velocity.y = 200;
	    	player.animations.play('down');

	    }

	}

	function wormMove() {
			var wx = worm.position.x
			var wy = worm.position.y
			var px = player.position.x
			var py = player.position.y

		    if (wx >= px && game.rnd.integerInRange(1, 20) == 20)
			    {
			      worm.body.velocity.y = 0;
			      worm.body.velocity.x = -100;
			    	worm.animations.play('left');
			    }
			    else if (wx <= px && game.rnd.integerInRange(1, 20) == 20)
			    {
			      worm.body.velocity.y = 0;
			      worm.body.velocity.x = 100;
			    	worm.animations.play('right');
			    }
			    else if (wy >= py && game.rnd.integerInRange(1, 20) == 20)
			    {
			      worm.body.velocity.x = 0;
			      worm.body.velocity.y = -100;
			    	worm.animations.play('up');
			    }
			    else if (wy <= py && game.rnd.integerInRange(1, 20) == 20)
			    {
			      worm.body.velocity.x = 0;
			      worm.body.velocity.y = 100;
			    	worm.animations.play('down');
			    }


	}

	function wormMove2() {
			var wx = worm2.position.x
			var wy = worm2.position.y
			var px = player.position.x
			var py = player.position.y
		    if (wx >= px && game.rnd.integerInRange(1, 20) == 20)
			    {
			      worm2.body.velocity.y = 0;
			      worm2.body.velocity.x = -100;
			    	worm2.animations.play('left');
			    }
			    else if (wx <= px && game.rnd.integerInRange(1, 20) == 20)
			    {
			      worm2.body.velocity.y = 0;
			      worm2.body.velocity.x = 100;
			    	worm2.animations.play('right');
			    }
			    else if (wy >= py && game.rnd.integerInRange(1, 20) == 20)
			    {
			      worm2.body.velocity.x = 0;
			      worm2.body.velocity.y = -100;
			    	worm2.animations.play('up');
			    }
			    else if (wy <= py && game.rnd.integerInRange(1, 20) == 20)
			    {
			      worm2.body.velocity.x = 0;
			      worm2.body.velocity.y = 100;
			    	worm2.animations.play('down');
			    }
	}

	function loss () {
    introText.text = 'The worm caught you!';
    introText.visible = true;
}
	function win () {
    introText.text = 'You win!';
    introText.visible = true;
}
	function render () {

	}
}
