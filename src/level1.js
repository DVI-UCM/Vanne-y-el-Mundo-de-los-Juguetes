import Platform from './platform.js';
import Player from './player.js';
import Calabaza from './calabaza.js';

/**
 * 
 * @param {Phaser.Scene} scene 
 * @param {number} totalWidth 
 * @param {string} texture 
 * @param {number} scrollFactor 
 */
const createAligned = (scene, totalWidth, texture, scrollFactor) => {
  const w = scene.textures.get(texture).getSourceImage().width;
  const count = Math.ceil(totalWidth / w) * scrollFactor;
  let x = 0;
  for(let i = 0; i < count; i++){
    const c = scene.add.image(x, scene.scale.height, texture)
      .setOrigin(0,1)
      .setScrollFactor(scrollFactor);

    x += c.width;
  }
}

/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class Level1 extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'level1' });
  }


  init(){

  }

  preload(){
    this.load.image("chuche", "assets/sprites/chuche.png");
  }
  
  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() {
    //let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'chuche');
    //let scaleX = this.cameras.main.width / image.width;
    //let scaleY = this.cameras.main.height / image.height;
    //let scale = Math.max(scaleX, scaleY);
    
    //image.setScale(scale).setScrollFactor(0);  

    //parallax
    /* this.chuche = this.add.tileSprite(0,
      //this.game.height - this.game.cache.getImage('chuche').height,
      this.game.height - this.textures.get('chuche').height,
      this.game.width,
      //this.cache.getImage('chuche').height,
      this.textures.get('chuche').height,
      'chuche'
    ); */

    //Fondo parallax
    const width = this.scale.width;
    const height = this.scale.height;
    const totalWidth = width * 3;

    createAligned(this, totalWidth, 'chuche', 0.80);
    this.cameras.main.setBounds(0,0, totalWidth, height);

    this.exit = this.add.image(this.cameras.main.width - 20, 20, "exit").setInteractive();
    this.exit.on('pointerdown', function (ptr) { this.setScale(0.9, 0.9) } );
    this.exit.on('pointerup', () => {
      this.scene.start("lobby");
    });

    this.fullScreen = this.add.image(this.cameras.main.width - 50, 20, "fullScreen").setInteractive();
    this.fullScreen.on('pointerdown', function (ptr) { this.setScale(0.9, 0.9) } );
    this.fullScreen.on('pointerup', () => {
      if (this.scale.isFullscreen){
        this.fullScreen.setTexture("fullScreen");
        this.scale.stopFullscreen();
      }
      else{
        this.fullScreen.setTexture("fullScreen2");
          this.scale.startFullscreen();
      }
    });

    this.stars = 5;
    this.player = new Player(this, 500, 500);
    this.calabaza = new Calabaza(this, 50, 500);

    new Platform(this, this.player, 500, 350);
    new Platform(this, this.player, 850, 250);
    new Platform(this, this.player, 500, 150);
    new Platform(this, this.player, 150, 250);
    //this.spawn();

  }
  endGame(completed = false) {
    if(! completed) {
      this.scene.start('gameover');
    } else {
      this.scene.start('congratulations');
    }
  }
  update(){
    //parallax
    //this.chuche.tilePositionX -=0.4;

    const cam = this.cameras.main;
    const speed = 3;
    if(!this.player.muerte){
      if(this.player.cursors.left.isDown){
        cam.scrollX -= speed;
      }
      else if (this.player.cursors.right.isDown){
        cam.scrollX += speed;
      }
    }

    this.exit.setPosition(this.cameras.main.width - 20, 20);
    this.fullScreen.setPosition(this.cameras.main.width - 50, 20);
  }

  /**
   * Genera una estrella en una de las bases del escenario
   * @param {Array<Base>} from Lista de bases sobre las que se puede crear una estrella
   * Si es null, entonces se crea aleatoriamente sobre cualquiera de las bases existentes
   */
  // spawn(from = null) {
  //   Phaser.Math.RND.pick(from || this.bases.children.entries).spawn();
  // }

  /**
   * Método que se ejecuta al coger una estrella. Se pasa la base
   * sobre la que estaba la estrella cogida para evitar repeticiones
   * @param {Base} base La base sobre la que estaba la estrella que se ha cogido
   */
  // starPickt (base) {
  //   this.player.point();
  //     if (this.player.score == this.stars/*&& this.ant.die*/) {
  //       this.scene.start('end');
  //     }
  //     else {
  //       let s = this.bases.children.entries;
  //       this.spawn(s.filter(o => o !== base));

  //     }
  // }

  /*calabazaChoca () {
    this.player.muere();
  }*/
  
}