const gameState3 = {};
class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }
    preload()
    {
    	//load our images or sounds
    }
    create() {
      gameState3.game = false;
      gameState3.selected = 0;
      game.scene.Pause('Menu');
      this.cursors = this.input.keyboard.createCursorKeys();
      this.keys = this.input.keyboard.addKeys('SPACE, ENTER');
      this.keys.ENTER.on('down', function(){
        if(gameState3.selected == 0){
          if(gameState3.game == true){
            this.scene.get('SceneMain').scene.restart();
            game.scene.Pause('Menu');
          }else{
            game.scene.start('SceneMain');
            game.scene.start('Pause');
            game.scene.start('Gameover');
          }
        }else if(gameState3.selected == 1){
        }else if(gameState3.selected == 2){
        }
      }, this)
      this.cursors.down.on('down', function(){
        gameState3.selected -= 1;
        if (gameState3.selected < 0){
          gameState3.selected = 2;
        }
      }, this)
      this.cursors.up.on('down', function(){
        gameState3.selected += 1;
        if (gameState3.selected > 2){
          gameState3.selected = 0;
        }
      }, this)
    }
    update() {
        //constant running loop
    }
gogogo(){
  this.scene.get('SceneMain').scene.restart();
  game.scene.Pause('Menu');
}
}
