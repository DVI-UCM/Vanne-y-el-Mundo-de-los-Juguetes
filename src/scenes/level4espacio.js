import Ghost from '../sprites/ghost.js';
import Laser from '../sprites/laser.js';
import SpaceShip from '../sprites/spaceship.js';
import Key from '../sprites/key.js';
import Door from '../sprites/door.js';
import ExitButton from '../components/exit-button.js';

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
  
    this.load.setPath('assets/sounds/');
    this.load.audio("fourmusic","4music.mp3");
    this.load.audio("disparonave","disparonave.mp3");
    this.load.audio("muertenave","muertenave.mp3");
  }
  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() {
    let x = 0;
    let y = 0;
    this.add.image(x, y, 'fondoPantalla').setOrigin(0);
    const totalWidth = this.textures.get('fondoPantalla').getSourceImage().width;
    const totalHeight = this.textures.get('fondoPantalla').getSourceImage().height;

    this.cameras.main.setBounds(0,0, totalWidth, totalHeight);
    this.physics.world.setBounds(0,0, totalWidth, totalHeight);
    //this.cameras.main.setBounds(0, 0, image.displayWidth, image.displayHeight);
    
    var needKeyText = "Mata a todos los\n fantasmas para\n desbloquear la llave\n y abrir la puerta";

    this.textKey = this.add.text(1750, 570, needKeyText,  { font: "20px Arial", fill: '#000000', backgroundColor: 'rgba(255,255,255,1)' });
    this.textKey.lineSpacing = 30;
    this.textKey.depth = 1;
    
    //musica
    this.music = this.sound.add("fourmusic");
    this.music.loop = true;
    this.disparonave = this.sound.add("disparonave");
    this.muertenave = this.sound.add("muertenave");
    if(localStorage.getItem('music') == 'true') { this.music.play(); }


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
    this.ghost3 = new Ghost(this, 1800, 850, 'ghost3');
    this.ghost4 = new Ghost(this, 1050, 600, 'ghost4');
    this.door = new Door(this, 1977, 450);
    this.key;

    this.cameras.main.startFollow(this.player);
    this.ghosts.add(this.ghost1);
    this.ghosts.add(this.ghost2);
    this.ghosts.add(this.ghost3);
    this.ghosts.add(this.ghost4);
    this.lasers.add(new Laser(this, this.player.x, this.player.y));

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

    new ExitButton(this, this.cameras.main.width - 20, 20).setScrollFactor(0);

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
      if(localStorage.getItem('music') == 'true') { this.muertenave.play(); }
      this.endGame();
    });

    this.physics.add.collider(this.lasers, this.ghosts, (laser, ghost) => {
      laser.onCollision();
      ghost.updateDie(true);
      ghost.destroy();

      if(this.ghost1.die && this.ghost2.die && this.ghost3.die && this.ghost4.die){
        this.key = new Key(this, 1725, 375);
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
    });
  }

  endGame(completed = false) {
    this.music.stop();//musica
    
    if(! completed) {
      this.scene.stop(this.scene.key);
      this.scene.start('gameover', {_sceneKey: this.scene.key });
    } 
    else {
      this.scene.stop(this.scene.key);
      this.scene.start('congratulations', {_sceneKey: this.scene.key });
    }
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
    if(this.door.close){
      if(this.player.x > 1950){
        this.textKey.visible = true;
      }
      else {
        this.textKey.visible = false;
      }
    }
  }
}