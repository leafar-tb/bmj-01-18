BasicGame.Win = function(game, moons) {
    var points;
};

BasicGame.Win.prototype = {

    init: function(moons) {
        points = moons;
    },

    create: function () {
        let win = game.add.text(80, 80, 'You Win!', {font: '50px Arial', fill: '#ffffff'});
        win.font = 'VT323';
        let achiev = game.add.text(80, 160, 'you managed to capture all '+points+' moons', {font: '24px Arial', fill: '#ffffff'});
        achiev.font = 'VT323';
        let retry = game.add.text(80, 240, 'retry with enter', {font: '24px Arial', fill: '#ffffff'});
        retry.font = 'VT323';

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
