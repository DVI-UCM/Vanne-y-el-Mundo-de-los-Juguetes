import Ghost from '../sprites/ghost.js';
import Laser from '../sprites/laser.js';
import Key from '../sprites/key.js';
import Door from '../sprites/door.js';
import SpaceShip from '../sprites/spaceship.js';
import ExitButton from '../components/exit-button.js';

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
    this.load.image('LEGO_LEVEL2', 'assets/tiles/level2/LEGO_LEVEL2.png');
    this.load.tilemapTiledJSON('MAPA2', 'assets/tiles/level2/MAPA2.json');
    this.load.image('lego', 'assets/backgrounds/LEGO_FONDO_1000x500.jpg');
  
    this.load.setPath('assets/sounds/');
    this.load.audio("twomusic","2music.mp3");
    this.load.audio("disparonave","disparonave.mp3");
    this.load.audio("muertenave","muertenave.mp3");
  }
  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() {
    let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'lego');
    let scaleX = this.cameras.main.width / image.width;
    let scaleY = this.cameras.main.height / image.height;
    let scale = Math.max(scaleX, scaleY);
    image.setScale(scale).setScrollFactor(0);


    new ExitButton(this, this.cameras.main.width - 20, 20).setScrollFactor(0);

    //musica
    this.music = this.sound.add("twomusic");
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
    
    this.endGameBool = false;
    this.player = new SpaceShip(this, 0, 412);
    this.player.body.setAllowGravity(false);
    this.ghost1 = new Ghost(this, 800, 420, 'ghost');
    this.ghost2 = new Ghost(this, 350, 200, 'ghost2');
    this.door = new Door(this, 977, 100);
    
    this.ghosts.add(this.ghost1);
    this.ghosts.add(this.ghost2);
    this.lasers.add(new Laser(this, this.player.x, this.player.y));


    let needKeyText = "Mata a todos los\n fantasmas para\n desbloquear la llave\n y abrir la puerta";

    this.textKey = this.add.text(750, 220, needKeyText,  { font: "20px Arial", fill: '#000000', backgroundColor: 'rgba(255,255,255,0.8)' });
    this.textKey.lineSpacing = 30;
    this.textKey.depth = 1;
    this.textKey.visible = false;

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
    this.physics.add.collider(this.lasers, this.groundLayer, (laser) => {
      laser.onCollision();
    });
    this.physics.add.collider(this.ghosts, this.groundLayer, (ghost) => {
        ghost.onCollision();
      });

    this.physics.add.collider(this.player, this.ghosts, () => {
      this.player.body.setVelocityX(0);
      this.player.muere();
      this.muertenave.play();
      this.endGame();
    });

    this.laserCollider = this.physics.add.collider(this.lasers, this.ghosts, (laser, ghost) => {
      laser.onCollision();
      ghost.updateDie(true);
      ghost.destroy();

      if(this.ghost1.die && this.ghost2.die){
        this.key = new Key(this, 375, 420);
        this.physics.add.overlap(this.player, this.key, (player, key) =>{
          this.door.setTexture('openDoor');
          this.door.setOpen();
          this.key.destroy();
        });
      }
    });

    this.physics.add.overlap(this.player, this.door, (player, door)=>{
      if(!door.close){//Si la puerta está abierta
        this.player.body.setVelocityX(0);
        this.endGame(true); //Termino el juego
      }
      else{
        this.textKey.visible = true;
        /* if(this.player.x > 950){
        }
        else {
          this.textKey.visible = false;
        } */
      }
    });

    this.door.on('overlapend', () => {
      if(this.door.close)
        this.textKey.visible = false;
    });
  }

  endGame(completed = false) {
    this.music.stop();
    if(! completed) {
      this.scene.stop(this.scene.key);
      this.scene.start('gameover', {_sceneKey: this.scene.key });
    } 
    else {
      this.scene.stop(this.scene.key);
      this.scene.start('congratulations', {_sceneKey: this.scene.key });
    }
  }

  update(){
    //this.textKey.visible = false;
   
    /* if(this.door.close){
      if(this.player.x > 950){
        this.textKey.visible = true;
      }
      else {
        this.textKey.visible = false;
      }
    } */
  }
}