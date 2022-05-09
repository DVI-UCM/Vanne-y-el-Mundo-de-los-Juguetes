import Amuleto from '../sprites/amuleto.js';
import Player from '../sprites/player.js';
import ExitButton from '../components/exit-button.js';
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
    this.load.spritesheet('fantasmaV_walk', 'fantasmav.png', {frameWidth: 194, frameHeight: 278});

    this.load.setPath('assets/sprites/amuletos');
    this.load.image('amulet3_piece1', 'amulet3_piece1.png');
    this.load.image('amulet3_piece2', 'amulet3_piece2.png');
    this.load.image('amulet3_piece3', 'amulet3_piece3.png');
    this.load.image('amulet3_piece4', 'amulet3_piece4.png');
 
    this.load.setPath('assets/sounds/');
    this.load.audio("threemusic","3music.mp3"); 
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

    //musica
  
    this.music = this.sound.add("threemusic");
    this.music.loop = true;
    if(localStorage.getItem('music') == 'true') { this.music.play(); }

    //mapa
    const map = this.make.tilemap({key: 'level3_map'});
    const tileset = map.addTilesetImage('tilemap_packed', 'level3_tileset');
    
    this.groundLayer = map.createStaticLayer("Suelo", tileset);
    this.pinchos = map.createStaticLayer("Pinchos", tileset);
    map.createStaticLayer("Decoracion_1", tileset);

    //amuletos
    this.amuletCount = 0;
    this.amuletos = this.physics.add.staticGroup({allowGravity: false, immovable: true});
    this.amuletos.add(new Amuleto(this, 42, 105, 'amulet3_piece1'));
    this.amuletos.add(new Amuleto(this, 756, 84, 'amulet3_piece2'));
    this.amuletos.add(new Amuleto(this, 1932, 315, 'amulet3_piece3'));
    this.amuletos.add(new Amuleto(this, 2751, 84, 'amulet3_piece4'));

    //personajes
    this.player = new Player(this, 100, 450);
    this.cameras.main.startFollow(this.player);
    
    this.fantasmasV = this.physics.add.group();

    this.fantasmasV.add(new FantasmaVolador(this, 370, 420, 589, 420));
    this.fantasmasV.add(new FantasmaVolador(this, 750, 110, 830, 110));
    this.fantasmasV.add(new FantasmaVolador(this, 1530, 420, 1713, 420));
    this.fantasmasV.add(new FantasmaVolador(this, 1857, 420, 2049, 420));
    this.fantasmasV.add(new FantasmaVolador(this, 2172, 420, 2364, 420));
    this.fantasmasV.add(new FantasmaVolador(this, 2487, 420, 2553, 420));
    this.fantasmasV.add(new FantasmaVolador(this, 2697, 420, 2868, 420));

    this.fantasmasV.children.iterate( function (child) {
      child.body.setVelocityX(150);
    });

    this.createColliders();

  }

  createColliders(){
    this.groundLayer.setCollisionByExclusion([-1]);
    this.physics.add.collider(this.player, this.groundLayer);
    this.pinchos.setCollisionByExclusion([-1]);
    this.physics.add.collider(this.player, this.pinchos, () => {
      this.player.muere();
    });

    this.physics.add.collider(this.fantasmasV, this.groundLayer);
    this.physics.add.collider(this.fantasmasV, this.pinchos);

    this.physics.add.collider(this.player, this.fantasmasV, (player, fantasmaV) => {
      if(player.anims.currentAnim.key == 'attack' || player.anims.currentAnim.key == 'jump_attack'){
        fantasmaV.muere();
      }
      else{
        fantasmaV.body.setVelocityX(0);
        player.muere();
      }
    });

    this.physics.add.overlap(this.player, this.amuletos, (player, amuleto) => {
      amuleto.destroy();
      this.amuletCount++;
      if(this.amuletCount == 4){
        this.cameras.main.fadeOut(1000, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
          this.music.stop();
          this.scene.stop(this.scene.key);
          this.scene.launch('completeAmulet', {_sceneKey: this.scene.key, _amuletKey: 'amulet3' });
        });
      }
    });

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