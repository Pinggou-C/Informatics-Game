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
		            debug: true
		        }
		    },
        parent: 'phaser-game',
				pixelArt: true,
				backgroundColor: '#00000',
				scale: {
        mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
        scene: [Splash, SceneMain]
    };
    game = new Phaser.Game(config);
}
