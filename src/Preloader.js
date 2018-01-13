
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

const N_MOONS = 1;
const N_PLANETS = 3;
const MOON_SPRITES = [];
const PLANET_SPRITES = [];

BasicGame.Preloader.prototype = {

	preload: function () {
        game.load.image('player', 'img/player_ship.png');
				game.load.image('thief_say', 'img/thief_say.png');
				game.load.image('sorry_say', 'img/sorry_say.png');

        for(let i = 1; i <= N_MOONS; ++i) {
            game.load.image('moon'+i, 'img/moon'+i+'.png');
            MOON_SPRITES.push('moon'+i);
        }

        for(let i = 1; i <= N_PLANETS; ++i) {
            game.load.image('planet'+i, 'img/planet'+i+'.png');
            PLANET_SPRITES.push('planet'+i);
        }
	},

	create: function () {
		this.state.start('Game');
	}

};
