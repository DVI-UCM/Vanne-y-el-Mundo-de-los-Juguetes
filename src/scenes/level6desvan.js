import Wall from '../sprites/wall.js';
import Ghost from '../sprites/ghost.js';
import Laser from '../sprites/laser.js';
import Key from '../sprites/key.js';
import Door from '../sprites/door.js';
import SpaceShip from '../sprites/spaceship.js';

/**
 * @extends Phaser.Scene
 */
export default class Level6 extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'level6' });
  }


  init(){
  }

  preload(){
    this.load.image('LEGO_LEVEL2', 'assets/tiles/level2/LEGO_LEVEL2.png');
    this.load.tilemapTiledJSON('MAPA2', 'assets/tiles/level2/MAPA2.json');
    this.load.image("fondoDesvan", "assets/backgrounds/fondoDesvan.png");
  }
  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() {
    
    /*let background = this.add.tileSprite(0, 0, 0, 0, "lego").setOrigin(0,0);
    background.displayHeight = this.sys.game.config.height;
    background.scaleX = background.scaleY; 
    background.setScrollFactor(0);*/
    /*
    let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'fondoDesvan');
    let scaleX = this.cameras.main.width / image.width;
    let scaleY = this.cameras.main.height / image.height;
    let scale = Math.max(scaleX, scaleY);
    image.setScale(scale).setScrollFactor(0);
    */

    this.parallax1 = this.add.tileSprite(0, 0, 5000, 1000, 'fondoDesvan');

    this.exit = new ExitButton(this, this.cameras.main.width - 20, 20);
    this.fullScreen = new FullScreenButton(this, this.cameras.main.width - 50, 20);


    //this.doors = this.physics.add.staticGroup();
    //this.keys = this.physics.add.staticGroup();
    this.ghosts = this.physics.add.group({
      allowGravity:false
    });
    this.lasers = this.physics.add.group({
      allowGravity: false
    });
    
    this.player = new SpaceShip(this, 0, 412).setDepth(1);
    this.player.body.setAllowGravity(false);
    this.ghost1 = new Ghost(this, 800, 420, 'ghost');
    this.ghost2 = new Ghost(this, 350, 200, 'ghost2');
    this.door = new Door(this, 977, 90);
    this.key;
    
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


    this.map = this.make.tilemap({ 
        key: 'MAPA2',
        tileWidth: 50, 
        tileHeight: 50
    
    });
  
    const tileset2 = this.map.addTilesetImage('LEGO_LEVEL2', 'LEGO_LEVEL2');
      
    this.groundLayer = this.map.createLayer("Capa de patrones 1", tileset2);

    this.createColliders();

  }

  createColliders(){

    this.groundLayer.setCollisionByProperty({ colisiona: true });
    this.physics.add.collider(this.player, this.groundLayer);
    this.physics.add.collider(this.ghosts, this.groundLayer, (ghost) => {
        ghost.onCollision();
      });



    this.physics.add.collider(this.player, this.ghosts, () => {
      this.player.body.setVelocityX(0);
      this.player.muere();
      this.endGame();
    });



    this.physics.add.collider(this.lasers, this.ghosts, (laser, ghost) => {
      laser.onCollision();
      ghost.updateDie(true);
      ghost.destroy();
      if(this.ghost1.die && this.ghost2.die){
        this.key = new Key(this, 450, 420);
        this.physics.add.overlap(this.player, this.key, (player, key) =>{
          this.door.setTexture('openDoor');
          this.door.setOpen();
          key.destroy();
        });
      }
    });

    this.physics.add.overlap(this.player, this.door, (player, door)=>{
      if(!door.close){//Si la puerta está abierta
        this.endGame(true); //Termino el juego
      }
      //else{
        //Mostrar texto indicando que tiene que matar a los bichos para que salga la llave
      //}
    });
  }

  endGame(completed = false) {
    if(! completed) {
      this.scene.launch('gameover', {key: this.scene.key });
    } 
    else {
      this.scene.launch('congratulations', {key: this.scene.key });
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
    if(!this.player.muerte){
      if(this.inputKeys[1].isDown){
        this.parallax1.tilePositionY += 0.25;
      }
      else if (this.inputKeys[2].isDown){
        this.parallax1.tilePositionX -= 0.25;
      }
      else if (this.inputKeys[3].isDown){
        this.parallax1.tilePositionX += 0.25;
      }
      else if (this.inputKeys[4].isDown){
        this.parallax1.tilePositionY -= 0.25;
      }
    }


    
  }

  
}