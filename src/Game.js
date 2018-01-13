
BasicGame.Game = function (game) {
    var tileGroup; //active tiles (not already matched)
  	var uncovered; //tiles currently flipped over
  	var found; //matched tiles
    var style;
    var text;
    var PLAYER;
};

BasicGame.Game.prototype = {

    create: function () {

        game.world.resize(3000, 3000);
        game.physics.startSystem(Phaser.Physics.ARCADE);

        let worldCenter = new Phaser.Point(game.world.centerX, game.world.centerY);
        PLAYER = new Planet('player', worldCenter, ['moon1']);
        game.physics.enable(PLAYER.sprite);
        game.camera.follow(PLAYER.sprite, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
    },

    update: function () {
        // player follows mouse cursor
        if (game.physics.arcade.distanceToPointer(PLAYER.sprite, game.input.activePointer) > 8) {
            game.physics.arcade.moveToPointer(PLAYER.sprite, 300);
        } else { // close enough
            PLAYER.sprite.body.velocity.set(0);
        }

        PLAYER.update();
    },

    restart: function (pointer) {
        this.state.start('MainMenu');

    }

};
