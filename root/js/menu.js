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

      var style = {fill : '#FFF',fontFamily: 'Sans-serif',fontSize: '32px',align: 'right'};
      gameState3.pauserect = this.add.graphics({ fillStyle: { color: 0x000000 } })
      gameState3.pauserect.setScrollFactor(0,0);
      gameState3.coverScreen = new Phaser.Geom.Rectangle(0, 0, 640, 360);
      gameState3.pauserect.fillRectShape(gameState3.coverScreen);
      gameState3.text1 = this.add.text(640/3, 120, "Start Game", style);
      gameState3.text1.setAlign('left');
      gameState3.text1.setScrollFactor(0,0);
      gameState3.text2 = this.add.text(640/3, 150, "Settings(in progress)", style);
      gameState3.text2.setAlign('left');
      gameState3.text2.setScrollFactor(0,0);
      gameState3.text3 = this.add.text(640/3, 180, "Quit", style);
      gameState3.text3.setAlign('left');
      gameState3.text3.setScrollFactor(0,0);
      //game.scene.Pause('Menu');
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
            this.scene.pause('Menu');
            gameState3.text1.alpha = 0;
            gameState3.text2.alpha = 0;
            gameState3.text3.alpha = 0;
            gameState3.pauserect.alpha = 0;
            gameState3.coverScreen.alpha = 0;
          }
        }else if(gameState3.selected == 1){
        }else if(gameState3.selected == 2){
          window.close();
        }
      }, this)
      this.cursors.down.on('down', function(){
        gameState3.selected += 1;
        if (gameState3.selected < 0){
          gameState3.selected = 2;
        }
      }, this)
      this.cursors.up.on('down', function(){
        gameState3.selected -= 1;
        if (gameState3.selected > 2){
          gameState3.selected = 0;
        }
      }, this)
    }
    update() {
        if(gameState3.selected == 0){
          gameState3.text1.setTint(0xC0C0C0);
          gameState3.text2.setTint(0xffFFFF);
          gameState3.text3.setTint(0xfffFFF);
        }else if(gameState3.selected == 1){
          gameState3.text1.setTint(0xFFFFFF);
          gameState3.text2.setTint(0xC0C0C0);
          gameState3.text3.setTint(0xFFFFFF);
        }else if(gameState3.selected == 2){
          gameState3.text1.setTint(0xFFFFFF);
          gameState3.text2.setTint(0xFFFFFF);
          gameState3.text3.setTint(0xC0C0C0);
        }

    }
gogogo(){
  gameState3.selected = 0;
  gameState3.text1.alpha = 1;
  gameState3.text2.alpha = 1;
  gameState3.text3.alpha = 1;
  gameState3.pauserect.alpha = 1;
  gameState3.coverScreen.alpha = 1;
}
}
