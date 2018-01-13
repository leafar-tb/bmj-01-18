
BasicGame.Game = function (game) {
    var tileGroup; //active tiles (not already matched)
  	var uncovered; //tiles currently flipped over
  	var found; //matched tiles
    var style;
    var text;
};

BasicGame.Game.prototype = {

    create: function () {

    },


    update: function () {

    },

    restart: function (pointer) {
        this.state.start('MainMenu');

    }

};
