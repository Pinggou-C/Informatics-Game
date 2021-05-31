var game;
window.onload=function()
{
	var config = {
        type: Phaser.AUTO,
        width: 1280,
        height: 720,
				physics: {
		        default: 'arcade',
		        arcade: {
								gravity: { y: 400 },
		            debug: false
		        }
		    },
        parent: 'phaser-game',
				pixelArt: true,
				roundPixels: true,
				backgroundColor: '#F0FFFF',
				autoRound: true,
				scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
        scene: [Splash, SceneMain, Pause, Menu, Gameover]
    };
    game = new Phaser.Game(config);
}
