class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }
    preload()
    {
    	//load our images or sounds
    }
    create() {
      game.scene.start('SceneMain');
       game.scene.start('Pause');
    }
    update() {
        //constant running loop
    }

}
