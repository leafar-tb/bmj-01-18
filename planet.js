
class Moon {
    constructor(image, parent, dist, initAngle) {
        this.planet = parent;
        this.angle = initAngle;
        this.distance = dist;

        let pos = this.getCurrentPosition();
        this.sprite = game.add.sprite(pos.x, pos.y, image);
        this.sprite.anchor.set(0.5);
        game.physics.arcade.enable(this.sprite);
    }

    getCurrentPosition() {
        let offset = new Phaser.Point(this.distance * Math.cos(this.angle), this.distance * Math.sin(this.angle));
        return Phaser.Point.add( this.planet.sprite.body.center, offset );
    }

    distanceTo(planet) {
        return this.sprite.body.center.distance(planet.sprite.body.center);
    }

    update() {
        let closest = this.planet;
        for(let p of PLANETS)  {
            if(this.distanceTo(p) < this.distanceTo(closest))
                closest = p;
        }

        // if a new planet is closer, hang on to it
        if(closest != this.planet) {
            this.planet.stealMoon(this);
            this.planet = closest;
            this.planet.moons.push(this);
            this.planet.excuse();

            this.distance = this.distanceTo(closest);
            let delta = Phaser.Point.subtract(this.sprite.body.center, this.planet.sprite.body.center);
            this.angle = Math.atan2(delta.y, delta.x);
        }

        this.angle += 1 * game.time.elapsed / 1000; //TODO varying speed
        let pos = this.getCurrentPosition();
        this.sprite.position = pos;
    }
}

const COMPLAINTS = [
    'You filthy thief!',
    'Oy!',
    'Bastard!',
    'What the blazes?!',
    'I loved that moon :(',
    'That was my favorite moon',
    'Why do you hate me'
];

const EXCUSES = [
    'Sorry, was that yours?',
    'My bad!',
    'Whoopsie!',
    "I'm sorry.",
    'Catch me if you can',
    'I love nothing more than stealing moons',
    'I am the best moon-stealer ever'
];

const SAY_COOLDOWN = 3 * 1000;

class Planet {

    constructor(image, pos, _moons) {
        this.sprite = game.add.sprite(pos.x, pos.y, image);
        this.sprite.anchor.set(0.5);
        game.physics.arcade.enable(this.sprite);
        this.sprite.body.setCircle(45);
        this.say_cooldown = 0;

        this.moons = [];
        let dist = 100;
        let angle = 2*3.14 / _moons.length;
        for(let i = 0; i < _moons.length; ++i) {
            this.moons.push( new Moon(_moons[i], this, dist*(i+1), angle*i) );
        }
    }

    update() {
        for(let moon of this.moons)
            moon.update();
    }

    stealMoon(moon) {
        let idx = this.moons.indexOf(moon);
        if(idx != -1) {
            this.moons.splice(idx, 1);

            if(game.time.now > this.say_cooldown) {
                let saying = game.add.text(this.sprite.x+50, this.sprite.y-50, game.rnd.pick(COMPLAINTS), {fontSize: '20px', backgroundColor:'white'});
                saying.font = 'VT323';
                game.time.events.add(Phaser.Timer.SECOND * 0.8, saying.kill, saying);
                this.say_cooldown = game.time.now + SAY_COOLDOWN;
            }
        }
    }

    excuse() {
        if(game.time.now > this.say_cooldown) {
            let saying = game.add.text(this.sprite.x+50, this.sprite.y-50, game.rnd.pick(EXCUSES), {fontSize: '20px', backgroundColor:'white'});
            saying.font = 'VT323';
            game.time.events.add(Phaser.Timer.SECOND * 0.8, saying.kill, saying);
            this.say_cooldown = game.time.now + SAY_COOLDOWN;
        }
    }
}
