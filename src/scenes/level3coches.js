import Platform from '../sprites/platform.js';
import Player from '../sprites/player.js';
import Calabaza from '../sprites/calabaza.js';
import ExitButton from '../components/exit-button.js';
import FullScreenButton from '../components/fullScreen-button.js';

/*
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
*/

/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class Level3 extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'level3' });
  }


  init(){

  }

  preload(){
    this.load.image('fondo1carreras', 'assets/backgrounds/level3/fondo1carreras.png');
    this.load.image('fondo2carreras', 'assets/backgrounds/level3/fondo2carreras.png');
    this.load.image('fondo3carreras', 'assets/backgrounds/level3/fondo3carreras.png');
   }
  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() {

    //var image = scene.add.tileSprite(x, y, width, height, textureKey);
    /*
    const width = this.scale.width;
    const height = this.scale.height;
    const totalWidth = width * 3;
    const totalheight = height * 2;
    */
    this.parallax1 = this.add.tileSprite(0, 0, 5000, 1000, 'fondo1carreras');
    this.parallax2 = this.add.tileSprite(0, 0, 5000, 1000,  'fondo2carreras');
    this.parallax3 = this.add.tileSprite(0, 0, 5000, 1000, 'fondo3carreras');








    /* antiguo1
    let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'fondocoches');
    let scaleX = this.cameras.main.width / image.width;
    let scaleY = this.cameras.main.height / image.height;
    let scale = Math.max(scaleX, scaleY);
    
    image.setScale(scale).setScrollFactor(0);  
    let fullScreen = this.add.image(this.cameras.main.width - 50, 20, "fullScreen").setInteractive();
    fullScreen.on('pointerdown', function (ptr) { this.setScale(0.9, 0.9) } );
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
    */
    
    /* ANTIGUO 2
    const width = this.scale.width;
    const height = this.scale.height;
    const totalWidth = width * 3;

    createAligned(this, totalWidth, 'fondo1carreras', 0.80);
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
    */
    

    //this.bases = this.add.group();
    this.player = new Player(this, 500, 500);
    //this.calabaza = new Calabaza(this,0,500);
    this.exit = new ExitButton(this, this.cameras.main.width - 20, 20);
    this.exit.setScrollFactor(0);
    this.fullScreen = new FullScreenButton(this, this.cameras.main.width - 50, 20);
    this.fullScreen.setScrollFactor(0);

    //plataformas
    /* new Platform(this, this.player, 500, 350);
    new Platform(this, this.player, 850, 250);
    new Platform(this, this.player, 500, 150);
    new Platform(this, this.player, 150, 250);
    this.spawn(); */

  }

  update(){
    

    //const cam = this.cameras.main;
    //const speed = 3;
    if(!this.player.muerte){
      if(this.player.cursors.left.isDown){
        //cam.scrollX -= speed;
        this.parallax1.tilePositionX -= 0.15;
        this.parallax2.tilePositionX -= 0.40;
        this.parallax3.tilePositionX -= 1.10;
      }
      else if (this.player.cursors.right.isDown){
       // cam.scrollX += speed;
        this.parallax1.tilePositionX += 0.15;
        this.parallax2.tilePositionX += 0.40;
        this.parallax3.tilePositionX += 1.10;
      }
    }

   // this.exit.setPosition(this.cameras.main.width - 20, 20);
  //this.fullScreen.setPosition(this.cameras.main.width - 50, 20);
  }
  
}