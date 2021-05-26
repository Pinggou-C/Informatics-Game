class Pause extends Phaser.Scene {
    constructor() {
        super('Pause');
    }
    preload(){
    }
    create() {
      this.game.paused = false;
      var style = {fill : '#FFF',fontFamily: 'Sans-serif',fontSize: '64px',align: 'right'};
      var pauserect = this.add.graphics({ fillStyle: { color: 0x000000 } })
      .setAlpha(0);
      pauserect.setScrollFactor(0,0);
      var coverScreen = new Phaser.Geom.Rectangle(0, 0, game.config.width, game.config.height);
      pauserect.fillRectShape(coverScreen);
      var text = this.add.text(game.config.width/3, game.config.height/3, "Paused", style);
      text.alpha = 0;
      text.setAlign('left');
      text.setScrollFactor(0,0);
      pauserect.alpha = 0;

      this.uikeys = this.input.keyboard.addKeys('ENTER,CTRL,SPACE,TAB,ALT,BACKSPACE,SHIFT');
      this.uikeys.SPACE.on('down', function(){
        if(this.game.paused == true){
          this.game.paused = false;
          this.tweens.add({
            targets: text,
            alpha: { from: 1, to: 0 },
            ease: 'Linear',
            duration: 250,
            repeat: 0,
            yoyo: false
          });
          this.tweens.add({
            targets: pauserect,
            alpha: 0,
            ease: 'Linear',
            duration: 300,
            repeat: 0,
            yoyo: false
          });

          //this.scene.resume();
          this.time.delayedCall(400,
            function (){
              game.scene.resume('SceneMain');
            }, null, this);
          }else{
            this.game.paused = true;
            this.tweens.add({
              targets: text,
              alpha: { from: 0, to: 1 },
              ease: 'Linear',
              duration: 300,
              repeat: 0,
              yoyo: false
            });
            this.tweens.add({
              targets: pauserect,
              alpha: 0.4,
              ease: 'Linear',
              duration: 200,
              repeat: 0,
              yoyo: false
            });
            game.scene.pause('SceneMain');
          }


      }, this);
    }
    update() {
    }

}
