import ExitButton from '../components/exit-button.js';
import Player from '../sprites/player.js';
import Slime from '../sprites/slime.js';
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
export default class Level5 extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'level5' });
  }

  init(){

  }

  preload(){
    this.load.setPath('assets/sprites/amuletos');
    this.load.image('amulet2_piece1', 'amulet2_piece1.png');
    this.load.image('amulet2_piece2', 'amulet2_piece2.png');
    this.load.image('amulet2_piece3', 'amulet2_piece3.png');
    this.load.image('amulet2_piece4', 'amulet2_piece4.png');

    
    this.load.setPath('assets/backgrounds/level5/');
    this.load.image("hielo1", "hielo6.png");
    this.load.image("hielo2", "hielo7.png");
    this.load.image("hielo3", "hielo1.png");
    this.load.image("hielo7", "hielo5.png");


    this.load.setPath('assets/tiles/level5/');
    this.load.tilemapTiledJSON('level5_map', 'iceWorld.json');
    this.load.image('moving_platform', 'moving_platform.png');

    this.load.setPath('assets/tiles/level3/');
    this.load.image('level3_tileset', 'tilemap_packed.png');

    this.load.setPath('assets/sprites/enemigos/slime/');
    this.load.spritesheet('slime_idle', 'idle_spritesheet.png', {frameWidth: 40, frameHeight: 33});
    
    this.load.setPath('assets/sounds/');
    this.load.audio("fivemusic","5music.mp3");  
  }


  create() {
    //Fondo parallax
    const width = this.scale.width;
    const height = this.scale.height;
    const totalWidth = width * 2;

    createAligned(this, totalWidth, 'hielo1', 0.35, 0, 1);
    createAligned(this, totalWidth, 'hielo2', 0.45, 0, 1);
    createAligned(this, totalWidth, 'hielo3', 0.65, 0, 1);
    createAligned(this, totalWidth, 'hielo7', 0.35, 0, 1);


    this.physics.world.setBounds(0, 0, totalWidth, height, true, true, false, false);
    this.cameras.main.setBounds(0, 0, totalWidth, height);
    this.cameras.main.centerOn(0, 30);

  
    new ExitButton(this, this.cameras.main.width - 20, 20).setScrollFactor(0);

    //musica
    this.music = this.sound.add("fivemusic");
    this.music.loop = true;
    if(localStorage.getItem('music') == 'true') { this.music.play(); }

    //mapa
    const map = this.make.tilemap({key: 'level5_map'});

    const tileset = map.addTilesetImage('tilemap_packed', 'level3_tileset');
    
    map.createLayer("Agua", tileset);
    this.groundLayer = map.createLayer("Suelo", tileset);
    map.createLayer("Decoracion_1", tileset);
    map.createLayer("Decoracion_2", tileset);
    
    //movimiento horizontal
    this.movingPlatforms_h = this.physics.add.group({allowGravity: false, immovable: true});
    this.movingPlatform_h = this.add.sprite(1345, 399, 'moving_platform').setScale(1.2);
    this.movingPlatforms_h.add(this.movingPlatform_h);
    
    let _this = this;
    this.movingPlatforms_h.children.iterate(function (child) {
      _this.tweens.add({
        targets: child,
        x: 1113,
        ease: 'Linear',
        duration: 2000,
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

    //movimiento vertical
    this.movingPlatforms_v = this.physics.add.group({allowGravity: false, immovable: true});
    this.movingPlatform_v = this.add.sprite(1365, 399, 'moving_platform').setScale(1.2);
    this.movingPlatforms_v.add(this.movingPlatform_v);

    this.movingPlatforms_v.children.iterate(function (child) {
      _this.tweens.add({
        targets: child,
        y: 252,
        ease: 'Linear',
        duration: 2000,
        yoyo: true,
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
    

    //personajes
    this.player = new Player(this, 150, 125);
    this.cameras.main.startFollow(this.player);

    this.slime = new Slime(this, 405, 340, 546, 340);
    this.slime2 = new Slime(this, 1050, 252, 1239, 252);
    this.slime3 = new Slime(this, 1512, 252, 1701, 252);

    //amuletos
    this.amuletCount = 0;
    this.amuletos = this.physics.add.staticGroup({allowGravity: false, immovable: true});
    this.amuletos.add(new Amuleto(this, 346, 136, 'amulet2_piece1'));
    this.amuletos.add(new Amuleto(this, 1170, 116, 'amulet2_piece2'));
    this.amuletos.add(new Amuleto(this, 1150, 294, 'amulet2_piece3'));
    this.amuletos.add(new Amuleto(this, 1932, 378, 'amulet2_piece4'));

    this.createColliders();
  }

  createColliders(){
    this.groundLayer.setCollisionByExclusion([-1]);
    this.physics.add.collider(this.player, this.groundLayer);

    this.physics.add.collider(this.slime, this.groundLayer);
    this.physics.add.collider(this.slime2, this.groundLayer);
    this.physics.add.collider(this.slime3, this.groundLayer);

    this.physics.add.collider(this.player, this.slime, (player, slime) => {
        if(player.anims.currentAnim.key == 'attack' || player.anims.currentAnim.key == 'jump_attack'){
          slime.muere();
        }
        else{
          slime.anims.play('idle', true);
          slime.body.setVelocityX(0);
          player.muere();
        }
    });

    this.physics.add.collider(this.player, this.slime2, (player, slime2) => {
      if(player.anims.currentAnim.key == 'attack' || player.anims.currentAnim.key == 'jump_attack'){
        slime2.muere();
      }
      else{
        slime2.anims.play('idle', true);
        slime2.body.setVelocityX(0);
        player.muere();
      }
    });

    this.physics.add.collider(this.player, this.slime3, (player, slime3) => {
      if(player.anims.currentAnim.key == 'attack' || player.anims.currentAnim.key == 'jump_attack'){
        slime3.muere();
      }
      else{
        slime3.anims.play('idle', true);
        slime3.body.setVelocityX(0);
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
          this.scene.launch('completeAmulet', {_sceneKey: this.scene.key, _amuletKey: 'amulet2' });
        });
      }
    });

    //this.physics.add.collider(this.movingPlatforms_h, this.groundLayer);


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
      this.movingPlatforms_h,
      collisionMovingPlatform,
      isCollisionFromTop,
      this
    );

    this.physics.add.collider(
      this.player,
      this.movingPlatforms_v,
      collisionMovingPlatform,
      isCollisionFromTop,
      this
    );
    //--
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