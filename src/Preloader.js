
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {
		game.load.image('player', 'assets/player.png');
	},

	create: function () {
		this.state.start('Game');
	}

};
