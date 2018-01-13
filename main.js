var game = new Phaser.Game(800, 600, Phaser.AUTO, 'bmj-01-18', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('player', 'assets/player.png');

}

// GLOBALS
var PLAYER;

// END GLOBALS

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    let worldCenter = new Phaser.Point(game.world.centerX, game.world.centerY);
    PLAYER = new Planet('player', worldCenter, ['player']);

    //sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    //sprite.anchor.set(0.5);
    //game.physics.arcade.enable(sprite);

}

function update () {
    // player follows mouse cursor
    if (game.physics.arcade.distanceToPointer(PLAYER.sprite, game.input.activePointer) > 8) {
        game.physics.arcade.moveToPointer(PLAYER.sprite, 300);
    } else { // close enough
        PLAYER.sprite.body.velocity.set(0);    
    }
    
    PLAYER.update();
}

function render () {

}
