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
    gameState.goal = this.add.sprite(0, 0, 'fullscreen');
    gameState.goal.setOrigin(0.5, 0.5);


// Player
    gameState.player = this.physics.add.sprite(100, 200, 'dude');


    gameState.hit = false;
// Camera
    gameState.camera = this.cameras.main;
    gameState.camera.setLerp(1, 1);
    gameState.camera.setDeadzone(20, 16);
    gameState.camera.startFollow(gameState.player);



// Walls
    var walls;
    walls = this.physics.add.staticGroup();


//Lifestock
  gameState.sheep = this.physics.add.group();
  gameState.sheep.enableBody = true;
  gameState.sheep.setOrigin(0.5, 0.5);
  gameState.sheep.create(50, -50, 'dude');
  gameState.sheep.create(-50, 50, 'dude');
  gameState.sheep.create(50, 50, 'dude');
  gameState.sheep.create(-50, -50, 'dude');
  gameState.sheep.create(0, 0, 'dude');
  gameState.sheep.create(-50, 0, 'dude');
  gameState.sheep.create(0, -50, 'dude');
  gameState.sheep.create(50, 0, 'dude');
  gameState.sheep.create(0, 50, 'dude');
  gameState.sheep.getChildren().forEach(function (shee){
    shee.live = 3;
    shee.speed = Phaser.Math.Between(10, 20);
    shee.hitready =  true;
});
//Enemies
  gameState.wolf = this.physics.add.group();
  gameState.wolf.enableBody = true;
  gameState.wolf.create(100, 100, 'dude');
  gameState.wolf.create(100, -100, 'dude');
  gameState.wolf.create(100, 0, 'dude');
  gameState.wolf.create(-100, 100, 'dude');
  gameState.wolf.create(-100, -100, 'dude');
  gameState.wolf.create(-100, 0, 'dude');
  gameState.wolf.create(0, -100, 'dude');
  gameState.wolf.create(0, 0, 'dude');
  gameState.wolf.create(0, 100, 'dude');
  gameState.wolf.getChildren().forEach(function (enemy){
    enemy.body.setVelocityX(Phaser.Math.Between(-1, 0)*100+50);
    enemy.body.setVelocityY(Phaser.Math.Between(-1, 0)*100+50);
  });
  gameState.wolf.setOrigin(0.5, 0.5);
  gameState.Lion = this.physics.add.group();
  gameState.Lion.enableBody = true;
  gameState.Lion.physicsBodyType = Phaser.Physics.ARCADE;
  gameState.eagle = this.add.group();
  gameState.eagle.enableBody = true;
  gameState.eagle.physicsBodyType = Phaser.Physics.ARCADE;
  gameState.scorpion = this.add.group();
  gameState.scorpion.enableBody = true;
  gameState.scorpion.physicsBodyType = Phaser.Physics.ARCADE;


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
    this.physics.add.collider(gameState.sheep, walls);
    //this.physics.add.collider(gameState.player, gameState.bats);



// Overlap
    // Player
        // objects
            //this.physics.add.overlap(gameState.player, spikes, spikehit, null, this);
          //  this.physics.add.overlap(gameState.player, lava, lavahit, null, this);
          //  this.physics.add.overlap(gameState.player, bombs, bombhit, null, this);
          //  this.physics.add.overlap(gameState.player, pits, pithit, null, this);

        // Enemies
            this.physics.add.overlap(gameState.sheep, gameState.wolf, this.batHit, null, this);
            this.physics.add.overlap(gameState.sheep, gameState.Lion, this.batHit, null, this);
            this.physics.add.overlap(gameState.sheep, gameState.eagle, this.batHit, null, this);
            this.physics.add.overlap(gameState.sheep, gameState.scorpion, this.batHit, null, this);
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
        //this.scene.resume();
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
        //this.scene.pause();
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

      //Enemies
        //wolf
      gameState.wolf.getChildren().forEach(function (enemy){
        if (enemy.body.x > 400 && enemy.body.velocity.x > 1){
          enemy.body.setVelocityX(-50);
        }
        else if (enemy.body.x < -400 && enemy.body.velocity.x < -1){
          enemy.body.setVelocityX(50);
        }
        if (enemy.body.y > 400 && enemy.body.velocity.y > 1){
          enemy.body.setVelocityY(-50);
        }
        else if (enemy.body.y < -400 && enemy.body.velocity.x < -1){
          enemy.body.setVelocityY(50);
        }
    })
      //lion

      //scorpion

      //eagle


    //sheep AI
    gameState.sheep.getChildren().forEach(function (shee){
      if (shee.body.x > gameState.goal.x + 100 && shee.body.velocity.x > 1){
        shee.body.setVelocityX(-shee.speed);
      }
      else if (shee.body.x < gameState.goal.x - 100 && shee.body.velocity.x < -1){
        shee.body.setVelocityX(shee.speed);
      }
      if (shee.body.y > gameState.goal.y + 100 && shee.body.velocity.y > 1){
        shee.body.setVelocityY(-shee.speed);
      }
      else if (shee.body.y < gameState.goal.y - 100 && shee.body.velocity.x < -1){
        shee.body.setVelocityY(shee.speed);
      }
  })
    }



// DEBUG
    gameState.texttwo.setText([
        'world x: ' + gameState.player.x,
        'world y: ' + gameState.player.y
    ]);
  }
  batHit (shee, enemie){
    if(shee.hitready == true){
      console.log("ready");
      shee.tint = 0xff0000;;
      shee.hitready = false;
      shee.live = shee.live - 1;
      if(shee.live > 0){
        this.time.delayedCall(200, this.hitflash(shee), null, this);
        this.time.delayedCall(1500,
          function (shee){
            shee.hitready = true;
            console.log("ready3");
          }, [shee], this);
      }else{
        gameState.sheep.remove(shee, true);
      }

    //gameState.camera.shake(200, 0.005);
  }
  }
  hitflash (shee){
    this.tweens.addCounter({
      from: 255,
      to: 0,
      duration: 150,
      repeat: 3,
      onUpdate: function (tween){
        const value = Math.floor(tween.getValue());
        shee.setTint(Phaser.Display.Color.GetColor(255, value, value));
      },
      onComplete: function (tween) {
            shee.setTint(0xffffff);
      }
    });
  }
  enemiebombhit(enemie, object){
    return;
  }
  musicplayer(name, fadetime){

  }

  //ADD Enemies & Bossen



  Spawnbat(x, y, level){
    var index = gameState.batindex + 1
  }
  Spawnzombie(x, y, level){

  }
  Spawnslime(x, y, level){

  }
  Spawnskeleton(x, y, level){

  }
  Spawnwitch(x, y, level){

  }
  Spawnbigslime(x, y, level){

  }
  Spawnsmallslime(x, y, level){

  }
}
