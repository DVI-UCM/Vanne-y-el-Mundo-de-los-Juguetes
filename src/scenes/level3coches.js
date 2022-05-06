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
    this.load.spritesheet('fantasmaV_walk', 'fantasmaV.png', {frameWidth: 194, frameHeight: 278});


    // this.load.setPath('assets/sounds/');
    // this.load.audio("fivemusic","5music.mp3"); 
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

    //musica
    // this.music = this.sound.add("fivemusic");
    // this.music.loop = true;
    // if(localStorage.getItem('music') == 'true') { this.music.play(); }
    
    //mapa
    const map = this.make.tilemap({key: 'level3_map'});
    const tileset = map.addTilesetImage('tilemap_packed', 'level3_tileset');
    
    this.groundLayer = map.createStaticLayer("Suelo", tileset);
    this.pinchos = map.createStaticLayer("Pinchos", tileset);
    map.createStaticLayer("Decoracion_1", tileset);

    this.player = new Player(this, 500, 450);
    this.cameras.main.startFollow(this.player);
    this.fantasmaV = new FantasmaVolador(this, 700, 110, 850, 110);
    this.fantasmaV2 = new FantasmaVolador(this, 50, 400, 190, 400);
    this.fantasmaV3 = new FantasmaVolador(this, 1500, 160, 1860, 160);

    this.createColliders();

  }

  createColliders(){
    this.groundLayer.setCollisionByExclusion([-1]);
    this.groundLayer.setCollisionByProperty({ colisiona: true });
    this.physics.add.collider(this.player, this.groundLayer);
    this.pinchos.setCollisionByExclusion([-1]);
    this.physics.add.collider(this.player, this.pinchos);
    
    this.physics.add.collider(this.fantasmaV, this.groundLayer);
    this.physics.add.collider(this.fantasmaV2, this.groundLayer);
    this.physics.add.collider(this.fantasmaV3, this.groundLayer);



    this.physics.add.collider(this.player, this.fantasmaV, (player, fantasmaV) => {
      if(player.anims.currentAnim.key == 'attack' || player.anims.currentAnim.key == 'jump_attack'){
        fantasmaV.muere();
      }
      else{
        //fantasmaV.anims.play('walk', true);
        fantasmaV.body.setVelocityX(0);
        //player.body.setOffset(29, 0);
        player.muere();
        //this.endGame(); 
      }
    });

    this.physics.add.collider(this.player, this.fantasmaV2, (player, fantasmaV2) => {
      if(player.anims.currentAnim.key == 'attack' || player.anims.currentAnim.key == 'jump_attack'){
        fantasmaV2.muere();
      }
      else{
        //fantasmaV.anims.play('walk', true);
        fantasmaV2.body.setVelocityX(0);
        //player.body.setOffset(29, 0);
        player.muere();
        //this.endGame(); 
      }
    });

    this.physics.add.collider(this.player, this.fantasmaV3, (player, fantasmaV3) => {
      if(player.anims.currentAnim.key == 'attack' || player.anims.currentAnim.key == 'jump_attack'){
        fantasmaV3.muere();
      }
      else{
        //fantasmaV.anims.play('walk', true);
        fantasmaV3.body.setVelocityX(0);
        //player.body.setOffset(29, 0);
        player.muere();
        //this.endGame(); 
      }
    });

  }

  endGame(completed = false) {
    // this.music.stop();
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