import Ghost from '../sprites/ghost.js';
import Laser from '../sprites/laser.js';
import Key from '../sprites/key.js';
import Door from '../sprites/door.js';
import SpaceShip from '../sprites/spaceship.js';

/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class Level4 extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'level4' });
  }


  init(){
  }

  preload(){
    this.load.image('LEGO_LEVEL4', 'assets/tiles/lego_level4.png');
    this.load.tilemapTiledJSON('MAPA4', 'assets/tiles/MAPA4.json');
    this.load.image("fondoPantalla", "assets/sprites/backGroundLevel4.jpg");
  }
  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() {
    const width = this.scale.width;
    const height = this.scale.height;
    let x = 0;
    let y = 0;
   // this.add.image(x, y, 'fondoPantalla').setOrigin(0);
   // const w = this.textures.get('castillo_background').getSourceImage().width;
    //const h = this.textures.get('castillo_background').getSourceImage().height;
    const totalWidth = this.textures.get('fondoPantalla').getSourceImage().width;
    const totalHeight = this.textures.get('fondoPantalla').getSourceImage().height;
    //const count = Math.ceil(totalWidth / w) * scrollFactor;
    //let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'castillo_background');
    //let scaleX = this.cameras.main.width / image.width;
    //let scaleY = this.cameras.main.height / image.height;
    //let scale = Math.max(scaleX, scaleY);
    //image.setScale(scale).setScrollFactor(0);
    //Align.scaleToGameW(image, 2);

    /*for(let i = 0; i < 4; i++){
      const c = this.add.image(x, y, 'castillo_background').setOrigin(0);
      if(i % 2 == 0){
        x += c.width;
      }
      else{
        x = 0;
        y += c.height;
      }
    }*/

    this.cameras.main.setBounds(0,0, totalWidth, totalHeight);
    this.physics.world.setBounds(0,0, totalWidth, totalHeight);
    //this.cameras.main.setBounds(0, 0, image.displayWidth, image.displayHeight);
    
    this.parallax1 = this.add.tileSprite(0, 0, 10000, 2000, 'fondoPantalla');

    this.exit = new ExitButton(this, this.cameras.main.width - 20, 20);
    this.fullScreen = new FullScreenButton(this, this.cameras.main.width - 50, 20);

    this.ghosts = this.physics.add.group({
      allowGravity:false
    });
    this.lasers = this.physics.add.group({
      allowGravity: false
    });
    
    this.player = new SpaceShip(this, 0, 412).setDepth(1);
    this.player.body.setAllowGravity(false);
    this.ghost1 = new Ghost(this, 800, 370, 'ghost');
    this.ghost2 = new Ghost(this, 350, 160, 'ghost2');
    this.door = new Door(this, 1977, 90);
    this.key;

    this.cameras.main.startFollow(this.player);
    this.ghosts.add(this.ghost1);
    this.ghosts.add(this.ghost2);
    this.lasers.add(new Laser(this, this.player.x, this.player.y ));

    this.inputKeys = [
			this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
			this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
		];


    //CREAR MAPA
    this.map = this.make.tilemap({ 
      key: 'MAPA4',
      tileWidth: 50, 
      tileHeight: 50
  
    });

    const tileset1 = this.map.addTilesetImage('LEGO_LEVEL4', 'LEGO_LEVEL4');
    
    this.groundLayer = this.map.createLayer("Capa de patrones 1", tileset1);
    //this.groundLayer.setCollisionByProperty({ colisiona: true });
    //------------------

    this.createColliders();
  }

  createColliders(){
    this.groundLayer.setCollisionByProperty({ colisiona: true });
    this.physics.add.collider(this.player, this.groundLayer);
    this.physics.add.collider(this.lasers, this.groundLayer, (laser) => {
      laser.onCollision();
    });    
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

    if(this.player.x > 1970)this.endGame(true);
  }

  
}