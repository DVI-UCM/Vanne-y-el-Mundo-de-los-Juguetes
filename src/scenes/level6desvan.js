import Ghost from '../sprites/ghost.js';
import Laser from '../sprites/laser.js';
import Key from '../sprites/key.js';
import Door from '../sprites/door.js';
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
    this.load.image('LEGO_LEVEL6', 'assets/tiles/level6/lego_level6.png');
    this.load.image('portal', 'assets/tiles/level6/portal.png');
    this.load.tilemapTiledJSON('MAPA6', 'assets/tiles/level6/MAPA6.json');
    this.load.image("fondoPantalla", "assets/backgrounds/fondociudad.png");
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
    //this.parallax = this.add.tileSprite(0, 0, 5000, 2500, 'fondoPantalla');

    const totalWidth = this.textures.get('fondoPantalla').getSourceImage().width;
    const totalHeight = this.textures.get('fondoPantalla').getSourceImage().height;


    this.cameras.main.setBounds(0,0, totalWidth, totalHeight);
    this.physics.world.setBounds(0,0, totalWidth, totalHeight);

    
   
    
    this.ghosts = this.physics.add.group({
      allowGravity:false
    });
    this.lasers = this.physics.add.group({
      allowGravity: false
    });
    
    this.player = new SpaceShip(this, 0, 200).setDepth(1);
    this.player.body.setAllowGravity(false);
    this.ghost1 = new Ghost(this, 600, 150, 'ghost');
    this.ghost2 = new Ghost(this, 200, 375, 'ghost2');
    this.door = new Door(this, 1977, 600);
    this.key;

    this.cameras.main.startFollow(this.player);
    this.ghosts.add(this.ghost1);
    this.ghosts.add(this.ghost2);
    this.lasers.add(new Laser(this, this.player.x, this.player.y ));

    var needKeyText = "Necesitas matar a\ntodos los fantasmas\ny desbloquear la llave\npara abrir la puerta";

    this.textKey = this.add.text(1750, 720, needKeyText,  { font: "20px Arial", fill: '#000000', backgroundColor: 'rgba(255,255,255,1)' });
    this.textKey.lineSpacing = 30;
    this.textKey.depth = 1;

    this.inputKeys = [
			this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
			this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
		];

   
    //CREAR MAPA
    this.map = this.make.tilemap({ 
      key: 'MAPA6',
      tileWidth: 50, 
      tileHeight: 50
  
    });

    const tileset1 = this.map.addTilesetImage('LEGO_LEVEL6', 'LEGO_LEVEL6');
    const tileset2 = this.map.addTilesetImage('portal', 'portal');
    
    this.groundLayer = this.map.createLayer("Capa de patrones 1", [tileset1, tileset2]);
    //------------------

    this.exit = new ExitButton(this, this.cameras.main.width - 20, this.cameras.main.height -320);
    this.fullScreen = new FullScreenButton(this, this.cameras.main.width - 50, this.cameras.main.height - 320);

    this.createColliders();
     //CREAR LUCES
    this.createLights();
  }

  createLights(){
    const x = 1000
		const y = 500

		this.cover = this.add.image(x, y, 'fondoPantalla') //Capa de encima
		this.cover.setTint(0x004c99)


		const width = this.cover.width
		const height = this.cover.height

		const rt = this.make.renderTexture({
			width,
			height,
			add: false
		})

		const maskImage = this.make.image({
			x,
			y,
			key: rt.texture.key,
			add: false
		})

		this.cover.mask = new Phaser.Display.Masks.BitmapMask(this, maskImage)
		this.cover.mask.invertAlpha = true

//El 200 es el tamaño del circulo
		this.light = this.add.circle(0, 0, 200, 0x000000, 1)
		this.light.visible = false

		this.input.on(Phaser.Input.Events.POINTER_MOVE, this.playerLightMove, this)

		this.renderTexture = rt
	}

  playerLightMove()
	{
		const x = this.player.x- this.cover.x + this.cover.width * 0.5
		const y = this.player.y - this.cover.y + this.cover.height * 0.5

		this.renderTexture.clear()
		this.renderTexture.draw(this.light, x, y)
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
        this.key = new Key(this, 1575, 675);
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
      else{
        this.needKey = this.add.text(1777, 400, 'Necesitas matar a todos los fantasmas y desbloquear la llave para abrir la puerta', { 
          fontSize: '20px', 
          fill: '#fff', 
          fontFamily: 'verdana, arial, sans-serif'
        })
      }
    });
}

  endGame(completed = false) {
    if(! completed) {
      this.scene.launch('gameover', {_sceneKey: this.scene.key });
    } 
    else {
      this.scene.launch('congratulations', {_sceneKey: this.scene.key });
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

  
  checkTp(){
    //Inicial
    if(this.player.x >=60 && this.player.x <= 90 && this.player.y <= 90 && this.player.y >= 60){
      this.player.y = 125;
      this.player.x = 175; 
    }
    if(this.player.x >=160 && this.player.x <= 190 && this.player.y <= 90 && this.player.y >= 60){
      this.player.y = 125;
      this.player.x = 75; 
    }
    //Medio 1
    if(this.player.x >=260 && this.player.x <= 290 && this.player.y <= 940 && this.player.y >= 910){
      this.player.y = 925; 
      this.player.x = 425; 
    }
    if(this.player.x >=360 && this.player.x <= 390 && this.player.y <= 940 && this.player.y >= 910){
      this.player.y = 875 ;
      this.player.x = 275;  
    }

    //Medio 2
    if(this.player.x >=860 && this.player.x <= 890 && this.player.y <= 90 && this.player.y >= 60){
      this.player.y = 125; 
      this.player.x = 975; 
    }
    if(this.player.x >=960 && this.player.x <= 990 && this.player.y <= 90 && this.player.y >= 60){
      this.player.y = 125; 
      this.player.x = 875; 
    }

    //Medio 3
    if(this.player.x >=960 && this.player.x <= 990 && this.player.y <= 440 && this.player.y >= 410){
      this.player.x = 1125; 
    }
    if(this.player.x >=1060 && this.player.x <= 1090 && this.player.y <= 440 && this.player.y >= 410){
      this.player.x = 925; 

    }    
    //Final
    if(this.player.x >=1810 && this.player.x <= 1840 && this.player.y <= 940 && this.player.y >= 910){
      this.player.y = 850; 
      this.player.x = 1925;
    }
    if(this.player.x >=1910 && this.player.x <= 1940 && this.player.y <= 940 && this.player.y >= 910){
      this.player.y = 850; 
      this.player.x = 1825;
    }
  }

  update(){
    //this.exit.position(this.cameras.main.width - 20, this.cameras.main.height -320);
    //this.fullScreen.position(this.cameras.main.width - 50, this.cameras.main.height -320);
    // If key was just pressed down, shoot the laser.
    this.checkTp();
    this.playerLightMove();
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
 
    if(this.door.close){
      if(this.player.x > 950){
        this.textKey.visible = true;
      }
      else {
        this.textKey.visible = false;
      }
    }
  /*if(!this.player.muerte){
    if(this.player.cursors.left.isDown){
      this.parallax.tilePositionX -= 0.3;
    }
    else if (this.player.cursors.right.isDown){
      this.parallax.tilePositionX += 0.3;
    }
    else if (this.player.cursors.down.isDown){
      this.parallax.tilePositionY += 0.3;
    }
    else if (this.player.cursors.up.isDown){
      this.parallax.tilePositionY -= 0.3;
    }
  }*/
  }
}
  