
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
        var offset = this.distance * new Phaser.Point(Math.cos(this.angle), Math.sin(this.angle));
        return this.planet.sprite.body.position + offset;
    }
    
    update() {
        this.angle += 1 * Phaser.Time.elapsed; //TODO varying speed
        this.sprite.body.position = this.getCurrentPosition();
    }
}

class Planet {

    constructor(image, pos, _moons) {
        this.sprite = game.add.sprite(pos[0], pos[1], image);
        this.sprite.anchor.set(0.5);
        game.physics.arcade.enable(this.sprite);
        
        this.moons = [];
        let dist = 100;
        let angle = 2*3.14 / _moons.length;
        for(let i = 0; i < _moons.length; ++i) {
            console.log("asd");
            this.moons.push( new Moon(_moons[i], this, dist*(i+1), angle*i) );
        }
    }
    
    update() {
        for(var moon of this.moons)
            moon.update();
    }
    
}
