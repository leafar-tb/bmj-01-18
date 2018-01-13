
BasicGame.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.MainMenu.prototype = {

	create: function () {
		let mm = game.add.text(80, 80, 'Main Menu', {font: '50px Arial', fill: '#ffffff'});
		mm.font = 'VT323';
		let st = game.add.text(80, 160, 'start game with enter', {font: '24px Arial', fill: '#ffffff'});
		st.font = 'VT323';

		let enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		enter.onDown.addOnce(this.startGame, this);
	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	startGame: function (pointer) {
		this.state.start('Game');

	}

};
