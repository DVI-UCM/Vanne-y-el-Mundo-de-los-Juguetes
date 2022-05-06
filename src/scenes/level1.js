import Calabaza from '../sprites/calabaza.js';
import ExitButton from '../components/exit-button.js';
import MonstruoVolador from '../sprites/monstruoVolador.js';
import Player from '../sprites/player.js';
import Amuleto from '../sprites/amuleto.js';


/**
 * 
 * @param {Phaser.Scene} scene 
 * @param {number} totalWidth 
 * @param {string} texture 
 * @param {number} scrollFactor 
 */
const createAligned = (scene, totalWidth, texture, scrollFactor, originX, originY) => {
  const w = scene.textures.get(texture).getSourceImage().width;
  const h = scene.textures.get(texture).getSourceImage().height;
  const count = Math.ceil(totalWidth / w) * scrollFactor;
  let x = 0;
  let img;
  for(let i = 0; i < count; i++){
    const c = scene.add.image(x, scene.scale.height, texture)
      .setOrigin(originX,originY)
      .setScrollFactor(scrollFactor);

    x += c.width;
    img = c
  }

  return img;
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
    this.load.setPath('assets/sprites/amuletos');
    this.load.image('amulet_piece1', 'amulet_piece1.png');
    this.load.image('amulet_piece2', 'amulet_piece2.png');
    this.load.image('amulet_piece3', 'amulet_piece3.png');

    this.load.setPath('assets/backgrounds/level1/');
    this.load.image("chuche1", "Far_Layer_Background.png");
    this.load.image("chuche2", "Middle_Layer_Background.png");
    this.load.image("chuche3", "Close_Layer_Background.png");
    this.load.image("chuche4", "Clouds.png");

    this.load.setPath('assets/tiles/level1/');
    this.load.image('level1_tileset', 'candy_world_tileset_resize.png');
    this.load.tilemapTiledJSON('level1_map', 'level1_map.json');
  
    this.load.setPath('assets/sounds/');
    this.load.audio("onemusic","1music.mp3");

  }
  
  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() {
    //Fondo parallax
    const width = this.scale.width;
    const height = this.scale.height;
    const totalWidth = width * 2;


    this.music = this.sound.add("onemusic");
    this.music.loop = true;
    if(localStorage.getItem('music') == 'true') { this.music.play(); }

    createAligned(this, totalWidth, 'chuche1', 0.35, 0, 1);
    createAligned(this, totalWidth, 'chuche2', 0.45, 0, 1);
    createAligned(this, totalWidth, 'chuche3', 0.65, 0, 1);
    createAligned(this, totalWidth, 'chuche4', 0.35, 0, 1);

    this.physics.world.setBounds(0, 0, totalWidth, height, true, true, false, false);
    this.cameras.main.setBounds(0, 0, totalWidth, height);
    this.cameras.main.centerOn(0, 30);

    new ExitButton(this, this.cameras.main.width - 20, 20).setScrollFactor(0);

    const map = this.make.tilemap({key: 'level1_map'});

    const tileset = map.addTilesetImage('Candy_world', 'level1_tileset');
      
    this.groundLayer = map.createLayer("Suelo", tileset);
    map.createLayer("Decoracion_1", tileset);
    map.createLayer("Decoracion_2", tileset);
    map.createLayer("Decoracion_3", tileset); 

    
    this.player = new Player(this, 50, 425);
    this.cameras.main.startFollow(this.player);

    this.calabaza = new Calabaza(this, 680, 200, 928, 200);

    this.monstruos = this.physics.add.group({allowGravity: false, immovable: true});
    this.monstruos.add(new MonstruoVolador(this, 100, 250));
    
    var _this = this;
    this.monstruos.children.iterate(function (child) {
      _this.tweens.add({
        targets: child,
        x: 300,
        ease: 'Linear',
        duration: 1500,
        yoyo: true,
        flipX: true,
        repeat: -1,
        //codigo de @kittykatattack en https://phaser.discourse.group/t/riding-moving-platforms/7330/6
        //Para que player se mueva con la plataforma
        onUpdate: () => {
          child.vx = child.body.position.x - child.previousX;
          child.vy = child.body.position.y - child.previousY;
          child.previousX = child.body.position.x; 
          child.previousY = child.body.position.y; 
        }
        //--
      });
    });
    
    this.amuletCount = 0;
    this.amuletos = this.physics.add.staticGroup({allowGravity: false, immovable: true});
    this.amuletos.add(new Amuleto(this, 100, 80, 'amulet_piece1'));
    this.amuletos.add(new Amuleto(this, 1056, 336, 'amulet_piece2'));
    this.amuletos.add(new Amuleto(this, 1632, 224, 'amulet_piece3'));

    this.createColliders();
  }
  
  createColliders(){
    this.groundLayer.setCollisionByProperty({ colisiona: true });
    this.physics.add.collider(this.player, this.groundLayer);
    this.physics.add.collider(this.calabaza, this.groundLayer);
    this.physics.add.collider(this.monstruos, this.groundLayer);


    //codigo de @kittykatattack en https://phaser.discourse.group/t/riding-moving-platforms/7330/6
    const collisionMovingPlatform = (sprite, platform) => {
      if (platform.body.touching.up && sprite.body.touching.down) {
        sprite.isOnPlatform = true;
        sprite.currentPlatform = platform;      
      }
    };

    //Only allow collisions from top
    const isCollisionFromTop = (sprite, platform) => {
      return platform.body.y > sprite.body.y;
    };

    this.physics.add.collider(
      this.player,
      this.monstruos,
      collisionMovingPlatform,
      isCollisionFromTop,
      this
    );
    //-- 

    this.physics.add.collider(this.player, this.calabaza, (player, calabaza) => {
      if(player.anims.currentAnim.key == 'attack' || player.anims.currentAnim.key == 'jump_attack'){
        calabaza.muere();
      }
      else{
        calabaza.anims.play('idle', true);
        calabaza.body.setVelocityX(0);
        player.muere();
        //this.endGame(); 
      }
    });

    this.physics.add.overlap(this.player, this.amuletos, (player, amuleto) => {
      amuleto.destroy();
      this.amuletCount++;
      if(this.amuletCount == 3){
        this.cameras.main.fadeOut(1000, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
          this.music.stop();
          this.scene.stop(this.scene.key);
          this.scene.launch('completeAmulet', {_sceneKey: this.scene.key, _amuletKey: 'amulet' });
        });
      }
    });
  }

  endGame(completed = false) {
    this.music.stop();
    if(!completed) {
      this.scene.stop(this.scene.key);
      this.scene.start('gameover', {_sceneKey: this.scene.key });
    } else {
      this.scene.stop(this.scene.key);
      this.scene.start('congratulations', {_sceneKey: this.scene.key });
    }
  }
  update(){
    //parallax
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
  }
}