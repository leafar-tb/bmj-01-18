BasicGame.GameOver = function(game, moons) {
    var points;
};

BasicGame.GameOver.prototype = {

    init: function(moons) {
        points = moons;
    },

    create: function () {
        let go = game.add.text(80, 80, 'GAME OVER', {font: '50px Arial', fill: '#ffffff'});
        go.font = 'VT323';
        let plural = points != 1 ? ' moons' : ' moon';
        let achieve = game.add.text(80, 160, 'you managed to capture '+points+plural, {font: '24px Arial', fill: '#ffffff'});
        achieve.font = 'VT323';
        let retry = game.add.text(80, 240, 'press enter to retry', {font: '24px Arial', fill: '#ffffff'});
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
