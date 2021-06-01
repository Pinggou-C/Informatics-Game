class Pause extends Phaser.Scene {
    constructor() {
        super('Pause');
    }
    preload(){
      this.load.spritesheet('fullscreen', 'assets/ui/fullscreen.png', { frameWidth: 32, frameHeight: 32 });
    }
    create() {
      this.game.paused = false;
      var style = {fill : '#FFF',fontFamily: 'Sans-serif',fontSize: '64px',align: 'right'};
      var pauserect = this.add.graphics({ fillStyle: { color: 0x000000 } })
      .setAlpha(0);
      pauserect.setScrollFactor(0,0);
      var coverScreen = new Phaser.Geom.Rectangle(0, 0, 640, 360);
      pauserect.fillRectShape(coverScreen);
      var text = this.add.text(640/3, 120, "Paused", style);
      text.alpha = 0;
      text.setAlign('left');
      text.setScrollFactor(0,0);
      pauserect.alpha = 0;

      this.uikeys = this.input.keyboard.addKeys('ENTER,CTRL,P,TAB,ALT,BACKSPACE,SHIFT');
      var button = this.add.image(640-8, 8, 'fullscreen', 0).setOrigin(1, 0).setInteractive();
      button.setScrollFactor(0,0);
      button.on('pointerup', function () {
        if (this.scale.isFullscreen){
          button.setFrame(0);
          this.scale.stopFullscreen();
        }else{
          button.setFrame(1);
          this.scale.startFullscreen();
        }
      }, this);
      this.uikeys.TAB.on('down', function () {
        if (this.scale.isFullscreen){
          button.setFrame(0);
          this.scale.stopFullscreen();
        }else{
          button.setFrame(1);
          this.scale.startFullscreen();
        }
      }, this);
      this.uikeys.P.on('down', function(){
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
