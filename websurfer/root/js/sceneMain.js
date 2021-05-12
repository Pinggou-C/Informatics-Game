  const gameState = {};
  class SceneMain extends Phaser.Scene {
  constructor() {
    super('SceneMain');
  }

  preload(){
    this.load.spritesheet('fullscreen', 'assets/ui/fullscreen.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('dude','assets/player/dude.png',{ frameWidth: 32, frameHeight: 48 });
    this.load.image('back','assets/1.png');
  }

  create() {

//  World
    this.add.image(0, 0, 'back');



// Player
    gameState.player = this.physics.add.sprite(100, 200, 'dude');


    gameState.hit = false;
// Camera
    var camera = this.cameras.main;
    camera.setLerp(1, 1);
    camera.setDeadzone(20, 16);
    camera.startFollow(gameState.player);



// Walls
    var walls;
    walls = this.physics.add.staticGroup();



//Enemies
  gameState.bats = this.physics.add.group();
  gameState.bats.enableBody = true;
//  gameState.bats.physicsBodyType = Phaser.Physics;
  //playerss.this.physics.add.sprite()(200, 200, 'dude');
//  playerss.physics.add.sprite(200, 300, 'dude');
//  playerss.physics.add.sprite(100, 100, 'dude');
  gameState.bats.create(100, 300, 'dude');
  gameState.bats.create(100, 400, 'dude');
  gameState.bats.create(100, 500, 'dude');
  gameState.bats.create(200, 400, 'dude');
  gameState.bats.create(200, 500, 'dude');
  gameState.bats.create(300, 400, 'dude');
  gameState.bats.create(300, 500, 'dude');
  var zombies = this.add.group();
  zombies.enableBody = true;
  zombies.physicsBodyType = Phaser.Physics.ARCADE;
  var skeletons = this.add.group();
  skeletons.enableBody = true;
  skeletons.physicsBodyType = Phaser.Physics.ARCADE;
  var slimes = this.add.group();
  slimes.enableBody = true;
  slimes.physicsBodyType = Phaser.Physics.ARCADE;


// Objects
  var spikes = this.add.group();
  spikes.enableBody = true;
  spikes.physicsBodyType = Phaser.Physics.ARCADE;
  var lava = this.add.group();
  lava.enableBody = true;
  lava.physicsBodyType = Phaser.Physics.ARCADE;
  var pits = this.add.group();
  pits.enableBody = true;
  pits.physicsBodyType = Phaser.Physics.ARCADE;



// Physics & Collisions
    this.physics.add.collider(gameState.player, walls);
    //this.physics.add.collider(gameState.player, gameState.bats);



// Overlap
    // Player
        // objects
            //this.physics.add.overlap(gameState.player, spikes, spikehit, null, this);
          //  this.physics.add.overlap(gameState.player, lava, lavahit, null, this);
          //  this.physics.add.overlap(gameState.player, bombs, bombhit, null, this);
          //  this.physics.add.overlap(gameState.player, pits, pithit, null, this);

        // Enemies
            this.physics.add.overlap(gameState.player, gameState.bats, this.batHit, null, this);
            this.physics.add.overlap(gameState.player, skeletons, this.batHit, null, this);
            this.physics.add.overlap(gameState.player, zombies, this.batHit, null, this);
            this.physics.add.overlap(gameState.player, slimes, this.batHit, null, this);
    // Enemie
        //Objects
          //  this.physics.add.overlap(bats, playerbombs, enemiebombhit, null, this);
          //  this.physics.add.overlap(skeletons, playerbombs, enemiebombhit, null, this);
          //  this.physics.add.overlap(zombies, playerbombs, enemiebombhit, null, this);
          //  this.physics.add.overlap(bats, spikes, enemiebombhit, null, this);
          //  this.physics.add.overlap(skeletons, spikes, enemiebombhit, null, this);
          //  this.physics.add.overlap(zombies, spikes, enemiebombhit, null, this);
          //  this.physics.add.overlap(bats, lava, enemiebombhit, null, this);
          //  this.physics.add.overlap(skeletons, lava, enemiebombhit, null, this);
          //  this.physics.add.overlap(zombies, lava, enemiebombhit, null, this);
          //  this.physics.add.overlap(bats, pits, enemiebombhit, null, this);
          //  this.physics.add.overlap(skeletons, pits, enemiebombhit, null, this);
          //  this.physics.add.overlap(zombies, pits, enemiebombhit, null, this);
// PauseMenu
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



// DEBUG:
    gameState.texttwo = this.add.text(10, 10, 'Cursors to move', { font: '16px Courier', fill: '#00ff00' }).setScrollFactor(0);



// KeyBoard INPUTS
    gameState.cursors = this.input.keyboard.createCursorKeys();
    gameState.keys = this.input.keyboard.addKeys('Z,X,C,V');
    gameState.uikeys = this.input.keyboard.addKeys('ENTER,CTRL,SPACE,TAB,ALT,BACKSPACE,SHIFT');



// Pause
    gameState.uikeys.SPACE.on('down', function(){
      if (this.game.paused) {
        this.game.paused = false;
        this.tweens.add({
          targets: text,
          alpha: { from: 1, to: 0 },
          ease: 'Linear',
          duration: 200,
          repeat: 0,
          yoyo: false
        });
        this.tweens.add({
          targets: pauserect,
          alpha: 0,
          ease: 'Linear',
          duration: 150,
          repeat: 0,
          yoyo: false
        });
      }else{
        this.game.paused = true;
        this.tweens.add({
          targets: text,
          alpha: { from: 0, to: 1 },
          ease: 'Linear',
          duration: 500,
          repeat: 0,
          yoyo: false
        });
        this.tweens.add({
          targets: pauserect,
          alpha: 0.4,
          ease: 'Linear',
          duration: 300,
          repeat: 0,
          yoyo: false
        });
      }
    }, this);



// FullScreen
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
    gameState.uikeys.TAB.on('down', function () {
      if (this.scale.isFullscreen){
        button.setFrame(0);
        this.scale.stopFullscreen();
      }else{
        button.setFrame(1);
        this.scale.startFullscreen();
      }
    }, this);


    console.log("Ready!");
  }


  update(delta) {
    if (this.game.paused) {
      return;
    }else{


// PlayerControl
      if (gameState.cursors.left.isDown){
        gameState.player.setVelocityX(-80);
      }else if (gameState.cursors.right.isDown){
        gameState.player.setVelocityX(80);
      }else{
        gameState.player.setVelocityX(0);
      }if (gameState.cursors.up.isDown){
        gameState.player.setVelocityY(-80);
      }else if (gameState.cursors.down.isDown){
        gameState.player.setVelocityY(80);
      }else{
        gameState.player.setVelocityY(0);
      }
      //gameState.bats.setVelocityX(80);


//
    }



// DEBUG
    gameState.texttwo.setText([
        'world x: ' + gameState.player.x,
        'world y: ' + gameState.player.y
    ]);
  }
  batHit (player, enemie){
    if(gameState.hit == false){
    console.log("ready");
    gameState.player.tint = 0xff0000;;
    gameState.hit = true;
    this.time.delayedCall(200, this.hitflash, null, this);
    this.time.delayedCall(1500, this.hitready, null, this);
  }
  }
  hitready (){
    gameState.hit = false;
  }
  hitflash (){
    this.tweens.addCounter({
      from: 255,
      to: 0,
      duration: 150,
      repeat: 3,
      onUpdate: function (tween){
        const value = Math.floor(tween.getValue());
        gameState.player.setTint(Phaser.Display.Color.GetColor(255, value, value));
      },
      onComplete: function (tween) {
            gameState.player.setTint(0xffffff);
      }
    });
  }
  enemiebombhit(enemie, object){
    return;
  }
}
