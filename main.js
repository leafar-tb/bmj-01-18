var game = new Phaser.Game(800, 600, Phaser.AUTO, 'bmj-01-18');

game.state.add('Boot', new BasicGame.Boot(game));
game.state.add('Preloader', new BasicGame.Preloader(game));
game.state.add('MainMenu', new BasicGame.MainMenu());
game.state.add('Game', new BasicGame.Game(game));
game.state.add('GameOver', new BasicGame.GameOver(game));

game.state.start('Boot');
