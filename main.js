var game = new Phaser.Game(800, 600, Phaser.AUTO, 'bmj-01-18', { preload: preload, create: create, update: update, render: render });

game.state.add('boot', BasicGame.Boot(game));
game.state.add('preloader', BasicGame.Preloader(game));
game.state.add('mainMenu', BasicGame.MainMenu());
game.state.add('game', BasicGame.Game(game));

function preload() {
    
}

function create() {

}

function update () {

}

function render () {

}