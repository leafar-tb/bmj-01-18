
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {
        game.load.image('player', 'img/player_ship.png');
        
		game.load.image('moon1', 'img/moon1.png');
        game.load.image('planet1', 'img/planet1.png');
	},

	create: function () {
		this.state.start('Game');
	}

};
