import Wall from '../sprites/wall.js';
import PlayerAerial from '../sprites/playerAerial.js';
import Ghost from '../sprites/ghost.js';
import Laser from '../sprites/laser.js';
import Key from '../sprites/key.js';
import Door from '../sprites/door.js';

/**
 * @extends Phaser.Scene
 */
export default class Level2 extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'level2' });
  }


  init(){
  }

  preload(){
    this.load.image("lego", "assets/sprites/fondoPrueba.png");
  }
  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() {
    
    let background = this.add.tileSprite(0, 0, 0, 0, "lego").setOrigin(0,0);
    background.displayHeight = this.sys.game.config.height;
    background.scaleX = background.scaleY; 
    background.setScrollFactor(0);

    let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'lego');
    let scaleX = this.cameras.main.width / image.width;
    let scaleY = this.cameras.main.height / image.height;
    let scale = Math.max(scaleX, scaleY);
    image.setScale(scale).setScrollFactor(0);
    
    let exit = this.add.image(this.cameras.main.width - 20, 20, "exit").setInteractive();
    exit.setDepth(1);
    exit.on('pointerdown', function (ptr) { this.setScale(0.9, 0.9) } );
    exit.on('pointerup', () => {
      this.scene.start("lobby");
    });

    let fullScreen = this.add.image(this.cameras.main.width - 50, 20, "fullScreen").setInteractive();
    fullScreen.setDepth(1);
    fullScreen.on('pointerdown', () => { this.setScale(0.9, 0.9) } );
    fullScreen.on('pointerup', () => {
      if (this.scale.isFullscreen){
        fullScreen.setTexture("fullScreen");
        this.scale.stopFullscreen();
      }
      else{
        fullScreen.setTexture("fullScreen2");
        this.scale.startFullscreen();
      }
    });

    this.walls = this.physics.add.staticGroup();
    this.doors = this.physics.add.staticGroup();
    this.keys = this.physics.add.staticGroup();
    this.ghosts = this.physics.add.group({
      allowGravity:false
    });
    this.lasers = this.physics.add.group({
      allowGravity: false
    });
    
    this.door = new Door(this,980,100, true);
    this.doors.add(this.door);
    this.player = new PlayerAerial(this, 0, 412);
    this.player.body.setAllowGravity(false);
    this.ghost1 = new Ghost(this, 800, 420, 'ghost');
    this.ghost2 = new Ghost(this, 350, 200, 'ghost2');
    
    this.ghosts.add(this.ghost1);
    this.ghosts.add(this.ghost2);
    this.lasers.add(new Laser(this, this.player.x, this.player.y + 20));

    this.inputKeys = [
			this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
			this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
		];

    //Crear el marco del laberinto
    this.marco();
    this.nivel();




    this.physics.add.collider(this.player, this.walls);



    this.physics.add.collider(this.ghosts, this.walls, (ghost) => {
      ghost.onCollision();
    });

    this.physics.add.collider(this.player, this.ghosts, () => {
      this.player.body.setVelocityX(0);
      this.player.muere();
      this.endGame();
    });

    this.physics.add.overlap(this.lasers, this.walls, (laser) => {
      laser.onCollision();
    });

    this.physics.add.collider(this.lasers, this.ghosts, (laser, ghost) => {
      laser.onCollision();
      ghost.updateDie(true);
      ghost.destroy();
      if(this.ghost1.die && this.ghost2.die) this.keys.add(new Key(this, 450,420));
      
    });

    
    this.physics.add.collider(this.player, this.keys, (key) =>{
      this.door.destroy(); //Quito la antigua puerta
      this.door2 = new Door(this,980,100, false); //Creo la nueva puerta
      this.doors.add(this.door2);
      key.destroy();
    });

    this.physics.add.collider(this.player, this.doors, (door)=>{
      if(!door.close){//Si la puerta está abierta
        this.endGame(true); //Termino el juego
      }
      //else{
        //Mostrar texto indicando que tiene que matar a los bichos para que salga la llave
      //}
    })
    
  }

  endGame(completed = false) {
    if(! completed) {
      this.scene.launch('gameover', {key: this.scene.key });
    } 
    else {
      this.scene.launch('congratulations');
    }
  }

  shoot(laser, dir){
    laser.shoot(this.player.x, this.player.y + 20, dir);
  }

  keyPick(){
    if(this.player.x == 450 && this.player.y == 380){
      this.key.destroy();
      this.door.setOpen();
    }
  }

  update(){
    // If key was just pressed down, shoot the laser.
    if (this.inputKeys[0].isDown) {
      let dir = "";
      if(this.inputKeys[1].isDown){
        dir = "down";
      }
      else if(this.inputKeys[2].isDown){
        dir = "left";
      }
      else if(this.inputKeys[3].isDown){
        dir = "right";
      }
      else if(this.inputKeys[4].isDown){
        dir = "up";
      }
      // Get the first available sprite in the group
      const laser = this.lasers.getFirstDead(false);
      if (laser) {
        laser.shoot(this.player.x, this.player.y + 20, dir);
      }
    }

    
  }

  marco(){
    for(let i = 0; i < 9;i++){
      this.walls.add(new Wall(this, this.player,this.ghost, this.ghost2, 20, i*40+20));
    }
    for(let i = 0; i < 9;i++){
      this.walls.add(new Wall(this, this.player,this.ghost, this.ghost2, 980, i*40+160));
    }
    for(let i = 0; i < 25;i++){
      this.walls.add(new Wall(this, this.player,this.ghost, this.ghost2, i*40+60, 20));
    }
    for(let i = 0; i < 25;i++){
      this.walls.add(new Wall(this, this.player,this.ghost, this.ghost2, i*40+20, 480));
    } 
  }

  nivel(){
    this.walls.add(new Wall(this, this.player,this.ghost, this.ghost2, 140, 160));
    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 140, 180));
    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 140, 320));
    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 140, 360));
    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 140, 400));
    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 140, 440));

    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 180, 160));
    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 180, 180));

    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 220, 160));
    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 220, 180));

    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 260, 160));
    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 260, 160));
    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 260, 200));
    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 260, 240));
    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 260, 280));
    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 260, 320));
    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 260, 340));

    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 300, 260));

    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 340, 260));

    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 380, 60));
    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 380, 100));
    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 380, 120));
    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 380, 260));
    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 380, 400));
    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 380, 440));

    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 420, 260));

    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 460, 260));

    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 500, 160));
    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 500, 180));
    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 500, 220));
    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 500, 260));
    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 500, 300));
    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 500, 340));
    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 500, 360));
    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 500, 400));
    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 500, 440));

    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 620, 40));
    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 620, 80));
    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 620, 120));
    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 620, 160));
    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 620, 180));
    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 620, 220));
    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 620, 260));
    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 620, 300));
    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 620, 340));

    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 660, 160));

    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 700, 160));

    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 740, 160));
    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 740, 200));
    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 740, 240));
    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 740, 380));
    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 740, 400));
    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 740, 440));

    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 860, 160));
    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 860, 180));
    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 860, 220));
    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 860, 260));
    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 860, 300));
    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 860, 340));

    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 900, 160));

    this.walls.add(new Wall(this, this.player,this.ghost,this.ghost2, 940, 160));
  }
  
}