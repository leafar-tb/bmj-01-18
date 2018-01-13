BasicGame.Win = function(game, moons) {
    var points;
};

BasicGame.Win.prototype = {

    init: function(moons) {
        points = moons;
    },

    create: function () {
        game.add.text(80, 80, 'You Win!', {font: '50px Arial', fill: '#ffffff'});
        game.add.text(80, 160, 'you managed to capture all '+points+' moons', {font: '24px Arial', fill: '#ffffff'});
        game.add.text(80, 240, 'retry with enter', {font: '24px Arial', fill: '#ffffff'});

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