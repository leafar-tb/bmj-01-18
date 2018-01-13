
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
        game.physics.startSystem(Phaser.Physics.ARCADE);

        let worldCenter = new Phaser.Point(game.world.centerX, game.world.centerY);
        PLAYER = new Planet('player', worldCenter, ['player']);
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
