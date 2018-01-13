
BasicGame.Game = function (game) {
    var tileGroup; //active tiles (not already matched)
  	var uncovered; //tiles currently flipped over
  	var found; //matched tiles
    var style;
    var text;
    var PLAYER;
    var PLANETS;
};

BasicGame.Game.prototype = {

    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        let worldCenter = new Phaser.Point(game.world.centerX, game.world.centerY);
        PLAYER = new Planet('player', worldCenter, ['moon1']);
        
        PLANETS = []
        for(let i = 0; i <= 2; ++i) {
            let pos = new Phaser.Point(game.rnd.integerInRange(game.world.left, game.world.right), game.rnd.integerInRange(game.world.top, game.world.bottom));
            
            let nMoons = game.rnd.integerInRange(1, 2);
            let moons = []
            for(let m = 0; m <= nMoons; ++m)
                moons.push(game.rnd.pick(MOON_SPRITES));
            
            PLANETS.push(new Planet(game.rnd.pick(PLANET_SPRITES), pos, moons));
        }
    },

    update: function () {
        // player follows mouse cursor
        if (game.physics.arcade.distanceToPointer(PLAYER.sprite, game.input.activePointer) > 8) {
            game.physics.arcade.moveToPointer(PLAYER.sprite, 300);
        } else { // close enough
            PLAYER.sprite.body.velocity.set(0);    
        }
        
        PLAYER.update();
        for(let p of PLANETS) {
            p.update();
        }
    },

    restart: function (pointer) {
        this.state.start('MainMenu');

    }

};
