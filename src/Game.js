const WORLD_SIZE = 3000;
const PLAYER_SPEED = 600;

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

        game.world.resize(WORLD_SIZE, WORLD_SIZE);
        game.physics.startSystem(Phaser.Physics.ARCADE);

        let worldCenter = new Phaser.Point(game.world.centerX, game.world.centerY);
        PLAYER = new Planet('player', worldCenter, []);

        game.camera.follow(PLAYER.sprite, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

        PLANETS = [PLAYER]
        game.rnd.sow(new Date().getTime().toString());
        game.rnd.integerInRange(10, WORLD_SIZE*WORLD_SIZE / 500000)
        for(let i = 0; i < 12; ++i) {
            let pos = new Phaser.Point(game.rnd.between(0, game.world.width), game.rnd.between(0, game.world.height));

            let nMoons = game.rnd.integerInRange(1, 2);
            let moons = []
            for(let m = 0; m < nMoons; ++m)
                moons.push(game.rnd.pick(MOON_SPRITES));

            PLANETS.push(new Planet(game.rnd.pick(PLANET_SPRITES), pos, moons));
        }
    },

    update: function () {
        // player follows mouse cursor
        if (game.physics.arcade.distanceToPointer(PLAYER.sprite, game.input.activePointer) > PLAYER_SPEED / 30) {
            game.physics.arcade.moveToPointer(PLAYER.sprite, PLAYER_SPEED);
        } else { // close enough
            PLAYER.sprite.body.velocity.set(0);
        }
        
        // rotate player sprite to (mouse) pointer
        let dx = PLAYER.sprite.body.velocity.x;
        let dy = PLAYER.sprite.body.velocity.y;
        if(dx == 0 && dy == 0)
            dy = -1;
        // for some reason we need to add another 90°
        let targetAngle = Math.atan2(dy, dx) + Math.PI/2;
        PLAYER.sprite.rotation = targetAngle;

        PLAYER.update();
        for(let p of PLANETS) {
            p.update();
        }
    },

    restart: function (pointer) {
        this.state.start('MainMenu');

    }

};
