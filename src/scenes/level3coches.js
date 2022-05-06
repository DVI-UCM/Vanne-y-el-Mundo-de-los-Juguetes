import Player from '../sprites/player.js';
import ExitButton from '../components/exit-button.js';
import FullScreenButton from '../components/fullScreen-button.js';
import FantasmaVolador from '../sprites/fantasmaVolador.js';


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

    this.load.setPath('assets/tiles/level3/');
    this.load.image('level3_tileset', 'tilemap_packed.png');
    this.load.tilemapTiledJSON('level3_map', 'level3_map.json');

    this.load.setPath('assets/sprites/enemigos/fantasmaV/');
    this.load.spritesheet('fantasmaV', 'fantasmaV.png', {frameWidth: 6240, frameHeight: 420});

   }

  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() {
    //Fondo parallax
    const width = this.scale.width;
    const height = this.scale.height;
    const totalWidth = width * 3;

    createAligned(this, totalWidth, 'fondo1carreras', .15, 0, 1);
    createAligned(this, totalWidth, 'fondo2carreras', .4, 0, 1);
    createAligned(this, totalWidth, 'fondo3carreras', .9, 0, 1);

    this.physics.world.setBounds(0, 0, totalWidth, height);
    this.cameras.main.setBounds(0, 0, totalWidth, height);
    this.cameras.main.centerOn(0, 30);

    
    
    new ExitButton(this, this.cameras.main.width - 20, 20).setScrollFactor(0);
    new FullScreenButton(this, this.cameras.main.width - 50, 20).setScrollFactor(0);
    
    const map = this.make.tilemap({key: 'level3_map'});
    
    const tileset = map.addTilesetImage('tilemap_packed', 'level3_tileset');
    
    this.groundLayer = map.createStaticLayer("Suelo", tileset);
    this.pinchos = map.createStaticLayer("Pinchos", tileset);
    map.createStaticLayer("Decoracion_1", tileset);

    this.player = new Player(this, 500, 450);
    this.cameras.main.startFollow(this.player);

    this.fantasma = new FantasmaVolador(this, 417, 224, 640, 224);

    this.createColliders();

  }

  createColliders(){
    this.groundLayer.setCollisionByExclusion([-1]);
    this.physics.add.collider(this.player, this.groundLayer);

    this.pinchos.setCollisionByExclusion([-1]);
    this.physics.add.collider(this.player, this.pinchos);
  }

  endGame(completed = false) {
    this.music.stop();
    if(!completed) {
        this.scene.stop(this.scene.key)
        this.scene.start('gameover', {_sceneKey: this.scene.key });
      } else {
        this.scene.stop(this.scene.key)
        this.scene.start('congratulations', {_sceneKey: this.scene.key });
      }
  }
  update(){

  }
  
}