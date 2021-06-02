const gameState2 = {};
class Gameover extends Phaser.Scene {
    constructor() {
        super('Gameover');
    }
    preload()
    {
    }
    create() {
      gameState2.menu = this.scene.get('Menu');
      var style = {fill : '#FFF',fontFamily: 'Sans-serif',fontSize: '64px',align: 'right'};
      gameState2.pauserect = this.add.graphics({ fillStyle: { color: 0x000000 } })
      .setAlpha(0);
      gameState2.pauserect.setScrollFactor(0,0);
      var coverScreen = new Phaser.Geom.Rectangle(0, 0, game.config.width, game.config.height);
      gameState2.pauserect.fillRectShape(coverScreen);
      gameState2.text = this.add.text(game.config.width/2.5, game.config.height/2, "Game Over", style);
      gameState2.text.alpha = 0;
      gameState2.text.scale = 0;
      gameState2.text.setAlign('left');
      gameState2.text.setScrollFactor(0,0);
      gameState2.pauserect.alpha = 0;

    }
    update() {
    }
dead(){
  game.scale.resize(game.config.width, game.config.height);
  this.tweens.add({
    targets: gameState2.text,
    alpha: 1,
    ease: 'Linear',
    duration: 2500,
    repeat: 0,
    yoyo: false
  });
  this.tweens.add({
    targets: gameState2.text,
    scale: 1,
    ease: 'Linear',
    duration: 2500,
    repeat: 0,
    yoyo: false
  });
  this.tweens.add({
    targets: gameState2.pauserect,
    alpha: 1,
    ease: 'Linear',
    duration: 333,
    repeat: 0,
    yoyo: false
  });
  this.time.delayedCall(4000,
  function (){
    this.tweens.add({
      targets: gameState2.text,
      alpha: 0,
      ease: 'Linear',
      duration: 1000,
      onComplete: function(){
        game.scene.resume('Menu');
        gameState2.text.scale = 0;
        gameState2.menu.gogogo();
      },
      repeat: 0,
      yoyo: false
    });
    this.tweens.add({
      targets: gameState2.pauserect,
      alpha: 0,
      ease: 'Linear',
      duration: 1000,
      repeat: 0,
      yoyo: false
    });
  }, null, this);
}
}
