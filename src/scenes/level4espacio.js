import Ghost from '../sprites/ghost.js';
import Laser from '../sprites/laser.js';
import SpaceShip from '../sprites/spaceship.js';
import ExitButton from '../components/exit-button.js';
import FullScreenButton from '../components/fullScreen-button.js';

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
    this.load.image('LEGO_LEVEL4', 'assets/tiles/level4/lego_level4.png');
    this.load.tilemapTiledJSON('MAPA4', 'assets/tiles/level4/MAPA4.json');
    this.load.image('portal', 'assets/tiles/level6/portal.png');
    this.load.image("fondoPantalla", "assets/backgrounds/fondoespacio.png");
  }
  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() {
    const width = this.scale.width;
    const height = this.scale.height;
    let x = 0;
    let y = 0;
    this.add.image(x, y, 'fondoPantalla').setOrigin(0);
   // this.add.image(x, y, 'fondoPantalla').setOrigin(0);
   // const w = this.textures.get('castillo_background').getSourceImage().width;
    //const h = this.textures.get('castillo_background').getSourceImage().height;
    const totalWidth = this.textures.get('fondoPantalla').getSourceImage().width;
    const totalHeight = this.textures.get('fondoPantalla').getSourceImage().height;
    this.parallax = this.add.tileSprite(0, 0, 5000, 2500, 'fondoPantalla');

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
    const tileset2 = this.map.addTilesetImage('portal', 'portal');
    
    this.groundLayer = this.map.createLayer("Capa de patrones 1", [tileset1, tileset2]);
    //------------------

    this.exit = new ExitButton(this, this.cameras.main.width - 20, this.cameras.main.height -320);
    this.fullScreen = new FullScreenButton(this, this.cameras.main.width - 50, this.cameras.main.height - 320);

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


  checkTp(){
    //Inicial 1
    if(this.player.x >=60 && this.player.x <= 90 && this.player.y <= 285 && this.player.y >= 265){
      this.player.y = 400; 
    }
    if(this.player.x >=60 && this.player.x <= 90 && this.player.y <= 385 && this.player.y >= 365){
      this.player.y = 250; 
    }
    //Inicial 2
    if(this.player.x >=60 && this.player.x <= 90 && this.player.y <= 535 && this.player.y >= 515){
      this.player.y = 650; 
    }
    if(this.player.x >=60 && this.player.x <= 90 && this.player.y <= 635 && this.player.y >= 615){
      this.player.y = 500; 
    }
    //Final
    if(this.player.x >=1810 && this.player.x <= 1840 && this.player.y <= 935 && this.player.y >= 915){
      this.player.y = 850; 
      this.player.x = 1925;
    }
    if(this.player.x >=1910 && this.player.x <= 1940 && this.player.y <= 935 && this.player.y >= 915){
      this.player.y = 850; 
      this.player.x = 1825;
    }
  }
  update(){
    this.checkTp();
    //this.exit.position(this.cameras.main.width - 20, this.cameras.main.height -320);
    //this.fullScreen.position(this.cameras.main.width - 50, this.cameras.main.height -320);
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
        laser.shoot(this.player.x, this.player.y, dir);
      }
    } 
 
    if(this.player.x > 1970)this.endGame(true);

   if(!this.player.muerte){
    if(this.player.cursors.left.isDown){
      this.parallax.tilePositionX -= 0.5;
    }
    else if (this.player.cursors.right.isDown){
      this.parallax.tilePositionX += 0.5;
    }
    else if (this.player.cursors.down.isDown){
      this.parallax.tilePositionY += 0.5;
    }
    else if (this.player.cursors.up.isDown){
      this.parallax.tilePositionY -= 0.5;
    }
    }

  }
}