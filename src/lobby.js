import Player from './player.js';

/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class Lobby extends Phaser.Scene {
  
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'lobby' });
  }


  init(){

  }

  preload(){
    this.load.image("background", "assets/sprites/tilemap_nivel1_background.png");
    this.load.image("brick", "assets/sprites/brickSpecial08.png");

  }
  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() {
    let background = this.add.tileSprite(0, 0, 0, 0, "background").setOrigin(0,0);
    background.displayHeight = this.sys.game.config.height;
    background.scaleX = background.scaleY; 

    this.stars = 1;
    this.player = new Player(this, 500, 500);
    this.btnLevels = this.physics.add.staticSprite(270, 295, 'brick');

    
    this.physics.world.setBounds(0, 0, background.displayWidth, background.displayHeight);
    this.cameras.main.setBounds(0, 0, background.displayWidth, background.displayHeight);
    this.cameras.main.startFollow(this.player);

  }

  update(){
    this.physics.collide(this.btnLevels, this.player, () => {
      this.scene.start('levelSelector');
    });
  }
}