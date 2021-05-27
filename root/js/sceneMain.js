  const gameState = {};
  class SceneMain extends Phaser.Scene {
  constructor() {
    super('SceneMain');
  }

  preload(){
    this.load.spritesheet('fullscreen', 'assets/ui/fullscreen.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('dude','assets/player/dude.png',{ frameWidth: 32, frameHeight: 48, endFrame: 8});
    this.load.image('back','assets/1.png');
    this.load.image('wall', 'assets/world/Utitled.png', 250, 50)
  }

  create() {
    gameState.velxtween = false;
    gameState.delta;
    this.events.on('pause', function () {
                console.log('Scene A paused');
            })

            this.events.on('resume', function () {
                console.log('Scene A resumed');
            })
//  World
    this.add.image(0, 0, 'back');
    gameState.goal = this.add.sprite(0, 0, 'fullscreen');
    gameState.goal.setOrigin(0.5, 0.5);


// Walls
    gameState.walls = this.physics.add.staticGroup();
    gameState.walls.enableBody = true;
    gameState.walls.create(0, 150, 'wall');
    gameState.walls.create(250, 150, 'wall');
    gameState.walls.create(-250, 150, 'wall');
    gameState.walls.create(500, 150, 'wall');

//Lifestock
gameState.sheepspeed = 1;
  gameState.sheep = this.physics.add.group();
  gameState.sheep.enableBody = true;
  gameState.sheep.setOrigin(0.5, 0.5);
  gameState.sheep.create(50, -50, 'dude', 0);
  gameState.sheep.create(-50, 50, 'dude', 0);
  gameState.sheep.create(50, 50, 'dude', 0);
  gameState.sheep.create(-50, -50, 'dude', 0);
  gameState.sheep.create(0, 0, 'dude', 0);
  gameState.sheep.create(-50, 0, 'dude', 0);
  gameState.sheep.create(0, -50, 'dude', 0);
  gameState.sheep.create(50, 0, 'dude', 0);
  gameState.sheep.create(0, 50, 'dude', 0);
  gameState.sheep.getChildren().forEach(function (shee){
    shee.live = 3;
    shee.speed = Phaser.Math.Between(20, 30);
    shee.hitready =  true;
    shee.timer = true;
    shee.body.setVelocityX(shee.speed*(Phaser.Math.Between(-1, 0)*2 + 1));
});
//Enemies
  gameState.wolf = this.physics.add.group();
  gameState.wolf.enableBody = true;
  gameState.wolf.create(100, 100, 'dude', 8);
  //gameState.wolf.create(100, -100, 'dude', 0);
  //gameState.wolf.create(100, 0, 'dude', 0);
  //gameState.wolf.create(-100, 100, 'dude', 0);
  //gameState.wolf.create(-100, -100, 'dude', 0);
  //gameState.wolf.create(-100, 0, 'dude', 0);
  //gameState.wolf.create(0, -100, 'dude', 0);
  //gameState.wolf.create(0, 0, 'dude', 0);
  //gameState.wolf.create(0, 100, 'dude', 0);
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


  // Player
      gameState.player = this.physics.add.sprite(0, 100, 'dude', 4);
      gameState.player.velocity = new Phaser.Math.Vector2(0, 0);
      gameState.player.setOrigin(0.5, 0.5);

  // Camera
      gameState.camera = this.cameras.main;
      gameState.camera.startFollow(gameState.player);
      gameState.camera.setLerp(0.075, 0.075);
      gameState.camera.setDeadzone(40, 32);
      gameState.camera.setBounds(-750, -250, 1500, 500);
      gameState.camera.setFollowOffset(0, 20);


// Physics & Collisions
    this.physics.add.collider(gameState.player, gameState.walls);
    this.physics.add.collider(gameState.sheep, gameState.walls);
    this.physics.add.collider(gameState.wolf, gameState.walls);
    //this.physics.add.collider(gameState.player, gameState.bats);
    gameState.time = 0;


// Overlap
    // Player
        // objects


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



// DEBUG:
    gameState.texttwo = this.add.text(10, 10, 'Cursors to move', { font: '16px Courier', fill: '#00ff00' }).setScrollFactor(0);



// KeyBoard INPUTS
    gameState.cursors = this.input.keyboard.createCursorKeys();
    gameState.keys = this.input.keyboard.addKeys('Z,X,C,V');
    gameState.uikeys = this.input.keyboard.addKeys('ENTER,CTRL,SPACE,TAB,ALT,BACKSPACE,SHIFT');



    console.log("Ready!");
  }


  update(delta) {
    if (this.game.paused) {
      return;
    }else{
      console.log(gameState.delta -delta)
// PlayerControl
      if (gameState.cursors.left.isDown){
        if(gameState.player.body.velocity.x > -80){
          gameState.tweenx.stop();
          this.cameramove(-1);
          gameState.velxtween = false;
          if(gameState.player.body.velocity.x > 0){
            gameState.player.body.velocity.x-= 1600 * ((delta - gameState.delta)/1000);

          }else{
            gameState.player.body.velocity.x-= 600 * ((delta - gameState.delta)/1000);

          }
        }
      }else if (gameState.cursors.right.isDown){
        if(gameState.player.body.velocity.x < 80){
          gameState.tweenx.stop();
          gameState.velxtween = false;
          this.cameramove(1);
          if(gameState.player.body.velocity.x < 0){
            gameState.player.body.velocity.x+= 1600 * ((delta - gameState.delta)/1000);
          }else{
            gameState.player.body.velocity.x+= 600 * ((delta - gameState.delta)/1000);
          }
        }
      }else if(gameState.velxtween == false){
        console.log('hi')
        gameState.velxtween = true;
        gameState.tweenx = this.tweens.addCounter({
          from: gameState.player.body.velocity.x,
          to: 0,
          duration: 200,
          repeat: 0,
          onUpdate: function (tween){
            const value = Math.floor(tween.getValue());
            gameState.player.setVelocityX(value);
          },
          onComplete: function(){
            gameState.velxtween = false;
          }
        });
      }if (gameState.cursors.up.isDown && gameState.player.body.touching.down){
        gameState.player.setVelocityY(-300);
      }else if (gameState.cursors.down.isDown){
        gameState.player.setVelocityY(80);
      }

      //camera




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
    gameState.sheep.getChildren().forEach(function (shee, scene){
      if (shee.body.x > gameState.goal.x + 100 && shee.body.velocity.x > 1){
        shee.body.setVelocityX(-shee.speed*gameState.sheepspeed);
      }else if (shee.body.x < gameState.goal.x - 100 && shee.body.velocity.x < -1){
        shee.body.setVelocityX(shee.speed*gameState.sheepspeed);
      }else if(shee.timer == true){
        shee.timer=false;
        this.time.delayedCall(Phaser.Math.Between(2000, 6000),
          function (shee){
            shee.body.setVelocityX(-shee.body.velocity.x);
            shee.timer = true;
          }, [shee], this);
      }
    //  if (shee.body.y > gameState.goal.y + 100 && shee.body.velocity.y > 1){
    //    shee.body.setVelocityY(-shee.speed);
    //  }
    //  else if (shee.body.y < gameState.goal.y - 100 && shee.body.velocity.x < -1){
    //    shee.body.setVelocityY(shee.speed);
    //  }
  }, this)
    }



// DEBUG
    gameState.texttwo.setText([
        'world x: ' + gameState.player.x,
        'world y: ' + gameState.player.y,
        'time:' + delta/1000
    ]);
    gameState.delta = delta;
  }
  batHit (shee, enemie){
    if(shee.hitready == true){
      console.log("ready");
      shee.tint = 0xff0000;;
      shee.hitready = false;
      shee.live = shee.live - 1;
      if(shee.live > 0){
        this.time.delayedCall(200, this.hitflash(shee), null, this);
        this.time.delayedCall(2000,
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
  cameramove(dir){
    //this.tweens.addCounter({
      //from: 0,
      //to: 50,
    //  duration: 250,
    //  repeat: 0,
    //  onUpdate: function (tween){
    //    const value = Math.floor(tween.getValue());
          gameState.camera.setFollowOffset(-15*dir, 20);
    //  },
    //  onComplete: function (tween) {
    //        gameState.camera.setFollowOffset(tween, 20);
    //  }
    //});
  }
}
