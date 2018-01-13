const WORLD_SIZE = 3000;
const PLAYER_SPEED = 600;

BasicGame.Game = function (game) {
    var PLAYER;
    var PLANETS;
    var totalMoons;
};

BasicGame.Game.prototype = {

    create: function () {
        music = this.game.add.audio('music');
        music.play()

        game.world.resize(WORLD_SIZE, WORLD_SIZE);
        game.physics.startSystem(Phaser.Physics.ARCADE);

        let worldCenter = new Phaser.Point(game.world.centerX, game.world.centerY);

        let graphics = game.add.graphics(0, 0);
        for(let i = 0; i < game.rnd.integerInRange(150, 300); i++) {
            graphics.beginFill(Phaser.Color.getColor(game.rnd.integerInRange(150, 255), game.rnd.integerInRange(100, 255), game.rnd.integerInRange(0, 50)));
            let pos = new Phaser.Point(game.rnd.between(0, game.world.width), game.rnd.between(0, game.world.height));
            graphics.drawCircle(pos.x, pos.y, 5);
            graphics.endFill();
        }
        window.graphics = graphics;
        
        PLAYER = new Planet('player', worldCenter, []);
        PLAYER.sprite.anchor.set(0.5);

        game.camera.follow(PLAYER.sprite, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

        PLANETS = [PLAYER];
        game.rnd.sow(new Date().getTime().toString());
        game.rnd.integerInRange(10, WORLD_SIZE*WORLD_SIZE / 500000);
        totalMoons = 0;
        for(let i = 0; i < 12; ++i) {
            let pos = new Phaser.Point(game.rnd.between(0, game.world.width), game.rnd.between(0, game.world.height));

            let nMoons = game.rnd.integerInRange(1, 2);
            let moons = []
            for(let m = 0; m < nMoons; ++m)
                moons.push(game.rnd.pick(MOON_SPRITES));

            PLANETS.push(new Planet(game.rnd.pick(PLANET_SPRITES), pos, moons));
            totalMoons += nMoons;
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

        for(let p of PLANETS) {
            if(game.physics.arcade.overlap(PLAYER.sprite, p.sprite)){
                this.gameOver(this);
            }
            p.update();
        }

        if(PLAYER.moons.length >= totalMoons) {
            this.win(this);
        }

    },

    gameOver: function (pointer) {
        explosion = game.add.sprite(PLAYER.sprite.x, PLAYER.sprite.y, 'explosion');
        explosion.animations.add('explode', [0,1,2,3,4,5,6,7,8,9,10])
        explosion.play('explode', 24, false);
        explosion.animations.currentAnim.onComplete.add(function () {	this.state.start('GameOver', true, false, PLAYER.moons.length);}, this);
        //this.state.start('GameOver', true, false, PLAYER.moons.length);
    },

    win: function(pointer) {
        this.state.start('Win', true, false, PLAYER.moons.length);
    }

};
