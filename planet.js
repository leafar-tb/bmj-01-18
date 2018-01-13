
class Moon {
    constructor(image, parent, dist, initAngle) {
        this.planet = parent;
        this.angle = initAngle;
        this.distance = dist;
        this.saying;

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

    update(say, typ) {

        // find closest planet
        let closest = this.planet;
        for(let p of PLANETS)  {
            if(this.distanceTo(p) < this.distanceTo(closest))
                closest = p;
        }

        // if a new planet is closer, hang on to it
        if(closest != this.planet) {
            this.planet.moons.splice(this.planet.moons.indexOf(this), 1);

            if (typ === "thief"){
              this.saying = game.add.sprite(this.planet.sprite.x+50, this.planet.sprite.y-50, say);
              game.time.events.add(Phaser.Timer.SECOND * 0.8, this.destroy, this);
            }

            this.planet = closest;
            this.planet.moons.push(this);

            if (typ === "sry") {
              this.saying = game.add.sprite(this.planet.sprite.x-50, this.planet.sprite.y+50, say);
              game.time.events.add(Phaser.Timer.SECOND * 0.8, this.destroy, this);
              this.planet.moons.push(new Moon(say, this.planet, 100, 2*3.14))
              //game.physics.arcade.moveToPointer(this.saying, 600);
            }

            this.distance = this.distanceTo(closest);
            let delta = Phaser.Point.subtract(this.sprite.body.center, this.planet.sprite.body.center);
            this.angle = Math.atan2(delta.y, delta.x);
        }

        this.angle += 1 * game.time.elapsed / 1000; //TODO varying speed
        let pos = this.getCurrentPosition();
        this.sprite.position = pos;
    }

    destroy() {
      this.saying.kill();
    }
}

class Planet {

    constructor(image, pos, _moons) {
        this.sprite = game.add.sprite(pos.x, pos.y, image);
        this.sprite.anchor.set(0.5);
        game.physics.arcade.enable(this.sprite);

        this.moons = [];
        let dist = 100;
        let angle = 2*3.14 / _moons.length;
        for(let i = 0; i < _moons.length; ++i) {
            this.moons.push( new Moon(_moons[i], this, dist*(i+1), angle*i) );
        }
    }

    update(say, typ) {
        for(var moon of this.moons)
            moon.update(say, typ);
    }

}
