class Splash extends Phaser.Scene {
  constructor() {
    super('Splash');
  }preload(){
    this.load.image('splash','images/ui/splash.png')
  }create() {
    var splashs = this.add.image((1280)/2, (720)/2, 'splash');
    splashs.alpha = 0;
    var style = {fill : '#FFF',fontFamily: 'Sans-serif',fontSize: '32px',align: 'right'};
    var text = this.add.text(game.config.width/3, game.config.height - 100, "Press a button to continue", style);
    text.alpha = 0;
    text.setAlign('left');
    this.tweens.add({
      targets: splashs,
      alpha:  1,
      ease: 'Linear',
      duration: 1500,
      delay: 500,
      repeat: 0,
      yoyo: false
    });
    this.tweens.add({
      targets: text,
      alpha:  1,
      ease: 'Linear',
      duration: 2000,
      delay: 1500,
      repeat: 0,
      yoyo: false
    });
    this.input.keyboard.on('keydown', () => {
      this.tweens.add({
        targets: [ text, splashs],
        alpha:  0,
        ease: 'Linear',
        duration: 1000,
        repeat: 0,
        yoyo: false,
        onComplete: function () {
          console.log("Ready!");
          game.scale.resize(640, 360);
          game.scene.start('SceneMain');
          game.scene.remove('Splash');
        }
      }, this);
    }, this);
  }
}
