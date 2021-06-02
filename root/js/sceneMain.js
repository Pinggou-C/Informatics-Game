  const gameState = {};
  class SceneMain extends Phaser.Scene {
  constructor() {
    super('SceneMain');
  }

  preload(){
    this.load.spritesheet('fullscreen', 'assets/ui/fullscreen.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('dude','assets/player/dude.png',{ frameWidth: 32, frameHeight: 48, endFrame: 8});
    this.load.spritesheet('barrel', 'assets/world/barrelz.png', { frameWidth: 34, frameHeight: 44, endFrame: 60 });
    this.load.spritesheet('hay','assets/world/haybale.png',{ frameWidth: 34, frameHeight: 34, endFrame: 41});
    this.load.image('back','assets/1.png');
    this.load.image('wall', 'assets/world/Utitled.png', 250, 50);
    this.load.spritesheet('wolf','assets/entities/wolfs.png',{ frameWidth: 42, frameHeight: 28, endFrame: 10});
    this.load.spritesheet('sheep','assets/entities/goat.png',{ frameWidth: 40, frameHeight: 30, endFrame: 37});
  }

  create() {
    game.scale.resize(640, 360);
    gameState.sceneGameover = this.scene.get('Gameover');
    gameState.livestock = 10;
    gameState.goalready = true;
    gameState.switchcooldown = false;
    gameState.spawntime = 3000;
    gameState.levstrength = 0;
    gameState.jumpwait = 0;
    gameState.jumptimer = false;
    gameState.wasonfloor = false;
    this.enemyspawn()
    gameState.velxtween = false;
    gameState.delta;
    this.events.on('pause', function () {
                console.log('Scene A paused');
            })

            this.events.on('resume', function () {
                console.log('Scene A resumed');
            })
//  World
    this.physics.world.setBounds(-1600, -540, 3200, 1080, true, true, true, true);
    this.add.image(0, 0, 'back');
    gameState.goal = this.add.sprite(0, 0, 'fullscreen');
    gameState.goal.setOrigin(0.5, 0.5);
    this.anims.create({
      key: 'sheepwalk',
      frames: this.anims.generateFrameNumbers('sheep', { start: 0, end: 3 }),
      frameRate: 4,
      repeat: -1
    });
    this.anims.create({
      key: 'sheepdead',
      frames: this.anims.generateFrameNumbers('sheep', { start: 11, end: 11 }),
      frameRate: 1,
      repeat: 0
    });
    this.anims.create({
      key: 'sheepdie',
      frames: this.anims.generateFrameNumbers('sheep', { start: 4, end: 11 }),
      frameRate: 8,
      repeat: 0
    });
    this.anims.create({
      key: 'sheepidle1',
      frames: this.anims.generateFrameNumbers('sheep', { start: 12, end: 16 }),
      frameRate: 2.5,
      repeat: 0
    });
    this.anims.create({
      key: 'sheepidle2',
      frames: this.anims.generateFrameNumbers('sheep', { start: 16, end: 18 }),
      frameRate: 2,
      repeat: 0
    });
    this.anims.create({
      key: 'sheepjump',
      frames: this.anims.generateFrameNumbers('sheep', { start: 18, end: 29 }),
      frameRate: 10,
      repeat: 0
    });
    this.anims.create({
      key: 'sheepidle3',
      frames: this.anims.generateFrameNumbers('sheep', { start: 29, end: 37 }),
      frameRate: 6,
      repeat: 0
    });
    this.anims.create({
      key: 'sheepstand',
      frames: this.anims.generateFrameNumbers('sheep', { start: 0, end: 0 }),
      frameRate: 1,
      repeat: 0
    });
    this.anims.create({
      key: 'wolfattack',
      frames: this.anims.generateFrameNumbers('wolf', { start: 4, end: 10 }),
      frameRate: 5,
      repeat: 0
    });
    this.anims.create({
      key: 'wolfstand',
      frames: this.anims.generateFrameNumbers('wolf', { start: 0, end: 0 }),
      frameRate: 1,
      repeat: 0
    });
    this.anims.create({
      key: 'wolfwalk',
      frames: this.anims.generateFrameNumbers('wolf', { start: 0, end: 4 }),
      frameRate: 4,
      repeat: -1
    });
    this.anims.create({
      key: 'wolfdie',
      frames: this.anims.generateFrameNumbers('wolf', { start: 0, end: 0 }),
      frameRate: 1,
      repeat: 0
    });
    this.anims.create({
      key: 'wolfjump',
      frames: this.anims.generateFrameNumbers('wolf', { start: 0, end: 0 }),
      frameRate: 1,
      repeat: 0
    });
    //haybale
      //animations
        this.anims.create({
          key: 'haylook1',
          frames: this.anims.generateFrameNumbers('hay', { start: 0, end: 20 }),
          frameRate: 10,
          repeat: 0
        });
    //barrel
      //animations
        this.anims.create({
          key: 'barrelopen',
          frames: this.anims.generateFrameNumbers('barrel', { start: 0, end: 10 }),
          frameRate: 5,
          repeat: 0
        });
        this.anims.create({
          key: 'barrellook',
          frames: this.anims.generateFrameNumbers('barrel', { start: 11, end: 40 }),
          frameRate: 8,
          repeat: 0
        });
        this.anims.create({
          key: 'barrelpop',
          frames: this.anims.generateFrameNumbers('barrel', { start: 53, end: 60 }),
          frameRate: 9,
          repeat: 0
        });
        this.anims.create({
          key: 'barrelclose',
          frames: this.anims.generateFrameNumbers('barrel', { start: 40, end: 52 }),
          frameRate: 4,
          repeat: 0
        });
      gameState.barrel = this.add.group();
      gameState.barrel.create(200, 108, 'barrel');
      gameState.barrel.getChildren().forEach(function (bar){
        bar.ready = true;
        bar.hit = false;
        bar.on('animationcomplete', function (anim, frame) {
          this.emit('animationcomplete_' + anim.key, anim, frame);
        }, bar);
      });
// Walls
    gameState.walls = this.physics.add.staticGroup();
    gameState.walls.enableBody = true;
    gameState.walls.create(0, 150, 'wall');
    gameState.walls.create(250, 150, 'wall');
    gameState.walls.create(500, 150, 'wall');
    gameState.walls.create(750, 150, 'wall');
    gameState.walls.create(1000, 150, 'wall');
    gameState.walls.create(1250, 150, 'wall');
    gameState.walls.create(1500, 150, 'wall');
    gameState.walls.create(-250, 150, 'wall');
    gameState.walls.create(-500, 150, 'wall');
    gameState.walls.create(-750, 150, 'wall');
    gameState.walls.create(-1000, 150, 'wall');
    gameState.walls.create(-1250, 150, 'wall');
    gameState.walls.create(-1500, 150, 'wall');

//Lifestock
gameState.sheepspeed = 1;
  gameState.sheep = this.physics.add.group();
  gameState.sheep.enableBody = true;
  gameState.sheep.setOrigin(0.5, 0.5);
  gameState.sheep.create(50, -50, 'sheep', 0);
  gameState.sheep.create(-50, 50, 'sheep', 0);
  gameState.sheep.create(50, 50, 'sheep', 0);
  gameState.sheep.create(-50, -50, 'sheep', 0);
  gameState.sheep.create(0, 0, 'sheep', 0);
  gameState.sheep.create(-50, 0, 'sheep', 0);
  gameState.sheep.create(0, -50, 'sheep', 0);
  gameState.sheep.create(50, 0, 'sheep', 0);
  gameState.sheep.create(0, 50, 'sheep', 0);
  gameState.sheep.create(0, 50, 'sheep', 0);
  gameState.sheep.getChildren().forEach(function (shee){
    shee.live = 1;
    shee.on('animationcomplete', function (anim, frame) {
      this.emit('animationcomplete_' + anim.key, anim, frame);
    }, shee);
    shee.speed = Phaser.Math.Between(20, 30);
    shee.hitready =  true;
    shee.timer = true;
    shee.alive = true;
    shee.iswalk = false;
    shee.body.setVelocityX(shee.speed*(Phaser.Math.Between(-1, 0)*2 + 1));
});
//Enemies
  gameState.wolf = this.physics.add.group();
  gameState.wolf.enableBody = true;
  gameState.wolf.create(100, 100, 'wolf', 0);
  gameState.wolf.getChildren().forEach(function (enemy){
    enemy.health = 4;
    enemy.speed = 75;
    enemy.level = 0;
    enemy.targets = 0;
    enemy.canattack = true;
    enemy.attack = false;
    enemy.walk = false;
    enemy.stun = false;
    enemy.picking = false;
    enemy.wait = false;
    enemy.target = null;
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
      gameState.player.body.setCollideWorldBounds(true);
      gameState.player.body.onWorldBounds = true;
      gameState.player.currentweapon = 0;
      //weapons
        gameState.projectile = this.physics.add.group({allowGravity: false});
        gameState.projectile.getChildren().forEach(function (pro){
          pro.strength = 3;
          pro.knockback = 1;
          pro.stun = 2000;
        });
        gameState.stick = this.physics.add.group({allowGravity: false});
        //gameState.stick.create(200, 100, 'dude', 4);
        gameState.stick.getChildren().forEach(function (sti){
          sti.strength = 1;
          sti.knockback = 3;
          sti.stun = 1000;
        });

  // Camera
      gameState.camera = this.cameras.main;
      gameState.camera.startFollow(gameState.player);
      gameState.camera.setLerp(0.075, 0.075);
      gameState.camera.setDeadzone(40, 32);
      gameState.camera.setBounds(-1600, -540, 3200, 1080);
      gameState.camera.setFollowOffset(0, 20);



// Physics & Collisions
    this.physics.add.collider(gameState.player, gameState.walls);
    this.physics.add.collider(gameState.sheep, gameState.walls);
    this.physics.add.collider(gameState.wolf, gameState.walls);
    this.physics.add.collider(gameState.wolf, gameState.walls);

    //this.physics.add.collider(gameState.player, gameState.bats);
    gameState.time = 0;


// Overlap
    // Player
        // Enemies
            this.physics.add.overlap(gameState.sheep, gameState.wolf, this.batHit, null, this);
            this.physics.add.overlap(gameState.sheep, gameState.Lion, this.batHit, null, this);
            this.physics.add.overlap(gameState.sheep, gameState.eagle, this.batHit, null, this);
            this.physics.add.overlap(gameState.sheep, gameState.scorpion, this.batHit, null, this);
    // Enemie
        //Objects
          //this.physics.add.overlap(gameState.wolf, gameState.projectile, this.enimHit, [hitstrength, knockback, stun], this);
            this.physics.add.overlap(gameState.wolf, gameState.projectile, this.enimHit, null, this);
            this.physics.add.overlap(gameState.wolf, gameState.stick, this.enimHit, null, this);


// DEBUG:
    gameState.texttwo = this.add.text(10, 10, 'Cursors to move', { font: '16px Courier', fill: '#00ff00' }).setScrollFactor(0);



// KeyBoard INPUTS
    gameState.cursors = this.input.keyboard.createCursorKeys();
    gameState.keys = this.input.keyboard.addKeys('Z,X,C,V,SPACE');
    gameState.uikeys = this.input.keyboard.addKeys('ENTER,SPACE, CTRL,P,TAB,ALT,BACKSPACE,SHIFT');
    var spawntimer = this.time.addEvent({
      delay: gameState.spawntime,                // ms
      callback: function (){
        if(gameState.spawntime > 7500){
          gameState.spawntime = -100
        }
        gameState.levstrength += 1;
        console.log(Math.round(0.5 * (3 * gameState.levstrength - 2 * Math.sqrt(2 * gameState.levstrength) - Math.sqrt(0.25 * gameState.levstrength) * 2))+ 2 + 'ii')
        for(let i = Math.round(0.5 * (3 * gameState.levstrength - 2 * Math.sqrt(2 * gameState.levstrength) - Math.sqrt(0.25 * gameState.levstrength) * 2))+ 2 ; i > 0; i-- ){
          let xx = Phaser.Math.Between(0, 1);
          let yy = Phaser.Math.Between(0, 1);
          this.limx1 = gameState.player.body.x + 370;
          this.limy1 = gameState.player.body.y + 230;
          this.limx0 = gameState.player.body.x - 370;
          this.limy0 = gameState.player.body.y - 230;
          let posx = Phaser.Math.Between(this['limx' + xx.toString()], this['limx' + xx.toString()] + (xx * 2 -1) * 100);
          let posy = Phaser.Math.Between(this['limy' + yy.toString()], this['limy' + yy.toString()] + (yy * 2 -1) * 100);
          console.log(posx)
          gameState.wolf.create(posx, 100, 'wolf', 8);
        }
        gameState.wolf.getChildren().forEach(function (enemy){
          if (enemy.level === undefined){
            enemy.health = 4;
            enemy.speed = 75;
            enemy.level = gameState.levstrength;
            enemy.wait = false;
            enemy.body.setVelocityX(enemy.speed);
            enemy.targets = 0;
            enemy.canattack = true;
            enemy.attack = false;
            enemy.walk = false;
            enemy.stun = false;
            enemy.picking = false;
            enemy.target = null;
          }

        });
      },
      callbackScope: this,
      repeat: -1
    });



  }


  update(delta) {

    if (this.game.paused) {
      return;
    }else{
      gameState.livestock = gameState.sheep.countActive();
      if(gameState.livestock == 0){
        gameState.sceneGameover.dead();
        game.scene.pause('SceneMain');
      }
// PlayerControl
      //place goal

      gameState.barrel.getChildren().forEach(function (bar){
        if(bar.ready){
          bar.anims.play('barrelopen', true);
          bar.ready = false;
        }
        bar.on('animationcomplete_barrelopen', function () {
          bar.anims.play('barrellook', true);
        });
        bar.on('animationcomplete_barrellook', function () {
          bar.anims.play('barrelclose', true);
        });
        bar.on('animationcomplete_barrelclose', function () {
          if(bar.hit == true){
            bar.hit = false;
          }else{
            bar.anims.play('barrelpop', true);
          }
        });
        bar.on('animationcomplete_barrelpop', function () {
          bar.ready = true;
        });

      });
      if(gameState.keys.C.isDown && gameState.switchcooldown == false){
        gameState.player.currentweapon += 1;
        gameState.switchcooldown = true;
        this.time.delayedCall(250,
        function (){
          gameState.switchcooldown = false;
        }, null, this);
        if (gameState.player.currentweapon>3){
          gameState.player.currentweapon = 0;
        }this.switchweapon(gameState.player.currentweapon);
      }
      if(gameState.keys.Z.isDown){
        if(gameState.goalready == true){
          gameState.goal.x = gameState.player.body.x+16;
          gameState.goal.y = gameState.player.body.y+16;
          gameState.goalready = false;
          this.time.delayedCall(5000,
          function (){
            gameState.goalready = true;
          }, null, this);
        }else{
          //display error
        }
      }
      //jump
      if(gameState.player.body.touching.down == true){
        if(gameState.wasonfloor == true){
          gameState.floorwait = 150;
        }else{
          gameState.wasonfloor = true;
          gameState.floorwait = 150;
        }
      }
      if (gameState.uikeys.SPACE.isDown){
        if(gameState.jumptimer == true){
          gameState.jumpwait = 100;
        }else{
          gameState.jumptimer = true;
          gameState.jumpwait = 100;
        }
      }
      if(gameState.jumpwait>0){
        gameState.jumpwait -= delta-gameState.delta;
        if(gameState.jumpwait<=0){
          gameState.jumptimer = false;
        }
      }
      if(gameState.floorwait>0){
        gameState.floorwait -= delta-gameState.delta;
        if(gameState.floorwait<=0){
          gameState.wasonfloor = false;
        }
      }
      //left right
      if (gameState.cursors.left.isDown){
        if(gameState.player.body.velocity.x > -100){
          if(gameState.velxtween == true){
            gameState.tweenx.stop();
          }
          this.cameramove(-1);
          gameState.velxtween = false;
          if(gameState.player.body.velocity.x > 0){
            gameState.player.body.velocity.x-= 1600 * ((delta - gameState.delta)/1000);
            gameState.player.flipX = true;
          }else{
            gameState.player.flipX = false;
            gameState.player.body.velocity.x-= 600 * ((delta - gameState.delta)/1000);

          }
        }
      }else if (gameState.cursors.right.isDown){
        if(gameState.player.body.velocity.x < 100){
          if(gameState.velxtween == true){
            gameState.tweenx.stop();
          }
          gameState.velxtween = false;
          this.cameramove(1);
          if(gameState.player.body.velocity.x < 0){
            gameState.player.body.velocity.x+= 1600 * ((delta - gameState.delta)/1000);
          }else{
            gameState.player.body.velocity.x+= 600 * ((delta - gameState.delta)/1000);
          }
        }
      }else if(gameState.velxtween == false){
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
      }if (gameState.jumptimer == true && gameState.wasonfloor == true){
        gameState.player.setVelocityY(-301);
        gameState.wasonfloor = false;
        gameState.jumptimer = false;
      }else if (gameState.cursors.down.isDown){
        gameState.player.setVelocityY(80);
      }
      //sheep AI
      gameState.sheep.getChildren().forEach(function (shee, scene){
        shee.on('animationcomplete_sheepdie', function () {
            gameState.sheep.killAndHide(shee);
            gameState.sheep.remove(shee, true, true);
        }, this);
        if(shee.live != 0){
          if(shee.body.velocity.x > 0){
            shee.flipX = true;
          }else if(shee.body.velocity.x < 0){
            shee.flipX = false;
          }
          if(shee.body.velocity.x !=0 && shee.iswalk == false){
            console.log('walk');
            shee.anims.play('sheepwalk', true);
            shee.iswalk = true;
          }
          if (shee.body.x > gameState.goal.x + 100){
            shee.body.setVelocityX(-shee.speed*gameState.sheepspeed);
          }else if (shee.body.x < gameState.goal.x - 100){
            shee.body.setVelocityX(shee.speed*gameState.sheepspeed);
          }else if(shee.timer == true){
            shee.timer=false;
             shee.tar = Phaser.Math.Between(0, 2);
             console.log(shee.tar);
              if (shee.tar == 0 || shee.tar == 3){
                //idle
                shee.wait = 1;
                shee.body.setVelocityX(0);
                shee.iswalk = false;
                shee.anims.play('sheepstand', true);
              }else if(shee.tar == 1){
                //left
                shee.wait = 0.75;
                shee.body.setVelocityX(shee.speed*-gameState.sheepspeed);
              }else if(shee.tar == 2){
                //right
                shee.wait = 0.75;
                shee.body.setVelocityX(shee.speed*gameState.sheepspeed);
              }
              let ih = Phaser.Math.Between(7500, 15000);
              this.time.delayedCall(ih * shee.wait,
                function (shee){
                  shee.timer = true;
                }, [shee], this);
                if(shee.wait == 1){
                  let li = Math.round(ih/7000);
                this.time.delayedCall(4000,
                  function (shee, li){
                    if(gameState.sheep.contains(shee) && shee.alive == true){
                      shee.anims.play('sheepidle'+Phaser.Math.Between(1, 3).toString(), true)
                      let wi = li - 1;
                      if (wi > 0){
                        this.time.delayedCall(4000,
                          function (shee, wi){
                            if(gameState.sheep.contains(shee) && shee.alive == true){
                              shee.anims.play('sheepidle'+Phaser.Math.Between(1, 3).toString(), true)
                            }
                            }, [shee, wi], this);
                          }
                        }
                    }, [shee, li], this);
                  }
          }else if(shee.body.velocity.x != 0 && shee.tar == 0 && shee.isdo == false){
            this.time.delayedCall(Phaser.Math.Between(1000, 4000),
            function (shee){
              if(shee.body.velocity.x != 0 && shee.tar == 0){
                shee.body.setVelocityX(0);
              }
            }, [shee], this);
          }
        //  if (shee.body.y > gameState.goal.y + 100 && shee.body.velocity.y > 1){
        //    shee.body.setVelocityY(-shee.speed);
        //  }
        //  else if (shee.body.y < gameState.goal.y - 100 && shee.body.velocity.x < -1){
        //    shee.body.setVelocityY(shee.speed);
        //  }
      }
    }, this)
      }
      //camera




      //Enemies
        //wolf
      gameState.wolf.getChildren().forEach(function (enemy){
        if (enemy.target == null){
          enemy.target = gameState.sheep.getChildren()[Phaser.Math.Between(0, gameState.sheep.getLength() -1)];
          let hi = Phaser.Math.Between(0, 1)
          if(hi == 0){
            enemy.targetpos = Phaser.Math.Between(enemy.target.body.x + 300, enemy.target.body.x + 70)
          }
          else{
            enemy.targetpos = Phaser.Math.Between(enemy.target.body.x - 300, enemy.target.body.x -70)
          }
          console.log(enemy.targetpos);
        }
        if(enemy.body.velocity.x > 0){
          enemy.flipX = true;
        }
        else if(enemy.body.velocity.x < 0){
          enemy.flipX = false;
        }
        if(enemy.body.velocity.x != 0 && enemy.walk == false && (enemy.canattack == true && enemy.attack == false)){
          enemy.walk = true;
          enemy.anims.play('wolfwalk', true);
        }
        if (enemy.stun == false){
          if(gameState.sheep.contains(enemy.target)){
            if(enemy.body.x <= enemy.targetpos + 10 && enemy.body.x >= enemy.targetpos - 10){
              enemy.body.setVelocityX(0);
              enemy.walk = false;
              if(enemy.canattack == true){
                enemy.anims.play('wolfstand', true);
              }
              if(enemy.body.x <= enemy.target.body.x + 60 && enemy.body.x >= enemy.target.body.x - 60){
                enemy.targetpos = enemy.target.body.x;
                if(enemy.body.x <= enemy.target.body.x + 20 && enemy.body.x >= enemy.target.body.x - 20){
                  if(enemy.canattack == true){
                  //start attack anim
                  enemy.canattack = false;
                  enemy.anims.play('wolfattack', true);
                  this.time.delayedCall(1000,
                  function (enemy){
                    enemy.attack = true;
                    //start attack anim
                    this.time.delayedCall(300,
                    function (enemy){
                      enemy.attack = false;
                      //start attack anim
                    }, [enemy], this);
                    this.time.delayedCall(2000,
                    function (enemy){
                      enemy.canattack = true;
                      //start attack anim
                    }, [enemy], this);
                  }, [enemy], this);
                  }
                }
              }
              else if(enemy.picking == false){
                enemy.picking = true;
                enemy.targets+= 1;
                this.time.delayedCall(Phaser.Math.Between(2000, 8000),
                function (enemy){
                  enemy.picking = false;
                  let hi = Phaser.Math.Between(0, 2)
                  if(hi == 0 || enemy.targets > 2){
                    enemy.targetpos = Phaser.Math.Between(enemy.target.body.x -50, enemy.target.body.x + 50)
                  }
                  else if(hi == 1){
                    enemy.targetpos = Phaser.Math.Between(enemy.target.body.x + 200, enemy.target.body.x + 60)
                  }
                  else{
                    enemy.targetpos = Phaser.Math.Between(enemy.target.body.x - 200, enemy.target.body.x -60)
                  }
                  console.log(enemy.targetpos);
                }, [enemy], this);
              }
            }else if(enemy.attack == false){
              if (enemy.body.x > enemy.targetpos){
                if((enemy.body.x >= enemy.target.body.x - 40 && enemy.body.x <= enemy.target.body.x + 40)&&(enemy.body.x >= enemy.targetpos - 40 && enemy.body.x <= enemy.targetpos + 40)){
                  enemy.body.setVelocityX(-enemy.speed / 2);
                }else{
                  enemy.body.setVelocityX(-enemy.speed);
                }
              }
              else if (enemy.body.x < enemy.targetpos){
                if((enemy.body.x >= enemy.target.body.x - 40 && enemy.body.x <= enemy.target.body.x + 40)&&(enemy.body.x >= enemy.targetpos - 40 && enemy.body.x <= enemy.targetpos + 40)){
                  enemy.body.setVelocityX(enemy.speed / 2);
                }else{
                  enemy.body.setVelocityX(enemy.speed);
                }
              }
              if (enemy.body.y > 400){
                enemy.body.setVelocityY(-50);
              }
              else if (enemy.body.y < -400){
                enemy.body.setVelocityY(50);
              }
            }
          }else{
            enemy.target = null;
          }
        }
      }, this)
      //lion

      //scorpion

      //eagle






// DEBUG
    gameState.texttwo.setText([
        'world x: ' + gameState.player.x,
        'world y: ' + gameState.player.y,
        'time:' + delta/1000
    ]);
    gameState.delta = delta;
  }
  batHit (shee, enemie){
    if(shee.hitready == true && enemie.attack == true){
      if(enemie.target == shee){
      shee.tint = 0xff0000;;
      shee.hitready = false;
      shee.live = shee.live - 1;
      if(shee.live > 0){
        this.time.delayedCall(200, this.hitflash(shee), null, this);
        this.time.delayedCall(2000,
          function (shee){
            shee.hitready = true;
          }, [shee], this);
      }else{
        enemie.target = null;
        shee.alive = false;
        shee.anims.play('sheepdie', true);
      }
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
  enimHit(enim, obj){
    if(enim.wait == false){
      enim.stun = true;
      enim.wait = true;
      enim.targets = 0;
      this.time.delayedCall(500,
        function (enim){
          enim.wait = false;
        }, [enim, this]);
    enim.health = enim.health - obj.strength;
    if (enim.health == 0){

      gameState.wolf.killAndHide(enim);
      gameState.wolf.remove(enim, true, true);
    }else{
      var dir;
      if(enim.body.x > obj.body.x){
        dir = 1;
      }else{
        dir = -1;
      }
      enim.body.setVelocityX(75 * obj.knockback * dir);
      enim.body.setVelocityY(-75);
      this.tweens.addCounter({
        from: enim.body.velocity.x,
        to: 0,
        duration: 400,
        repeat: 0,
        onUpdate: function (tween){
          const value = Math.floor(tween.getValue());
          enim.body.setVelocityX(value);
        },
        onCompleteScope: this,
        onComplete: function (){
          this.time.delayedCall(obj.stun,
            function (enim){
              if(gameState.sheep.contains(enim.target)){
                enim.targetpos = Phaser.Math.Between(enim.target.body.x + 250 * dir, enim.target.body.x + 50 * dir);
              }else{
                enim.target = null;
              }
              enim.stun = false;
            }, [enim], this);
        }
      }, this);
    }

  }
}
  //ADD Enemies & Bossen
  enemyspawn(){

  }



  cameramove(dir){
          gameState.camera.setFollowOffset(-15*dir, 20);
  }
  switchweapon(newweapon){

  }
}
