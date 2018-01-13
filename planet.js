
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
    
    update() {
        this.angle += 1 * game.time.elapsed / 1000; //TODO varying speed
        let pos = this.getCurrentPosition();
        this.sprite.position = pos;
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
    
    update() {
        for(var moon of this.moons)
            moon.update();
    }
    
}
