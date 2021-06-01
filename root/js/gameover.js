class Gameover extends Phaser.Scene {
    constructor() {
        super('Gameover');
    }
    preload()
    {
    }
    create() {
      game.scale.resize(game.config.width, game.config.height);
      var style = {fill : '#FFF',fontFamily: 'Sans-serif',fontSize: '64px',align: 'right'};
      var pauserect = this.add.graphics({ fillStyle: { color: 0x000000 } })
      .setAlpha(0);
      pauserect.setScrollFactor(0,0);
      var coverScreen = new Phaser.Geom.Rectangle(0, 0, game.config.width, game.config.height);
      pauserect.fillRectShape(coverScreen);
      var text = this.add.text(game.config.width/3, game.config.height/3, "Game Over", style);
      text.alpha = 0;
      text.scale = 0;
      text.setAlign('left');
      text.setScrollFactor(0,0);
      pauserect.alpha = 0;
      this.tweens.add({
        targets: text,
        alpha: 1,
        ease: 'Linear',
        duration: 2500,
        repeat: 0,
        yoyo: false
      });
      this.tweens.add({
        targets: text,
        scale: 1,
        ease: 'Linear',
        duration: 2500,
        repeat: 0,
        yoyo: false
      });
      this.tweens.add({
        targets: pauserect,
        alpha: 1,
        ease: 'Linear',
        duration: 333,
        repeat: 0,
        yoyo: false
      });
    }
    update() {
    }

}
