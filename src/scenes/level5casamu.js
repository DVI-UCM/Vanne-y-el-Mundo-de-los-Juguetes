import Cupcake from '../sprites/cupcake.js';
import ExitButton from '../components/exit-button.js';
import FullScreenButton from '../components/fullScreen-button.js';
import Player from '../sprites/player.js';
import Slime from '../sprites/slime.js';



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
    this.load.setPath('assets/backgrounds/level5/');
    this.load.image("hielo1", "hielo6.png");
    this.load.image("hielo2", "hielo7.png");
    this.load.image("hielo3", "hielo1.png");
    this.load.image("hielo4", "hielo2.png");
    this.load.image("hielo5", "hielo3.png");
    this.load.image("hielo6", "hielo4.png");
    this.load.image("hielo7", "hielo5.png");


    this.load.setPath('assets/tiles/level5/');
    this.load.image('level5_tileset', 'iceWorld.png');
    this.load.tilemapTiledJSON('level5_map', 'iceWorld.json');

    this.load.setPath('assets/sprites/enemigos/');
    this.load.atlas('slime', 'slime/slime.png', 'slime/slime.json');

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
    //createAligned(this, totalWidth, 'hielo4', 0.35, 0, 1);
    //createAligned(this, totalWidth, 'hielo5', 0.35, 0, 1);
    //createAligned(this, totalWidth, 'hielo6', 0.35, 0, 1);


    this.physics.world.setBounds(0, 0, totalWidth, height, true, true, false, false);
    this.cameras.main.setBounds(0, 0, totalWidth, height);
    this.cameras.main.centerOn(0, 30);

  
    this.exit = new ExitButton(this, this.cameras.main.width - 20, 20);
    this.exit.setScrollFactor(0);
    this.fullScreen = new FullScreenButton(this, this.cameras.main.width - 50, 20);
    this.fullScreen.setScrollFactor(0);

    const map = this.make.tilemap({key: 'level5_map'});

    const tileset = map.addTilesetImage('IceWorld', 'level5_tileset');
    
    map.createLayer("Agua", tileset);
    this.groundLayer = map.createLayer("Suelo", tileset);
    map.createLayer("Decoracion_1", tileset);
    map.createLayer("Decoracion_2", tileset);

    
    this.player = new Player(this, 150, 125);
    this.cameras.main.startFollow(this.player);
    //this.cupcake = new Cupcake(this, 100, 80); 

    this.slime = new Slime(this, 630, 200, 860, 200);

    
    
    this.createColliders();
  }

  createColliders(){
    this.groundLayer.setCollisionByProperty({ colision: true });
    this.physics.add.collider(this.player, this.groundLayer);
    // this.physics.add.collider(this.monstruos, this.groundLayer);
    this.physics.add.collider(this.slime, this.groundLayer);



    //codigo de @kittykatattack en https://phaser.discourse.group/t/riding-moving-platforms/7330/6
    /* const collisionMovingPlatform = (sprite, platform) => {
      if (platform.body.touching.up && sprite.body.touching.down) {
        sprite.isOnPlatform = true;
        sprite.currentPlatform = platform;      
      }
      else{
        //this.player.muere();
      }
    }; */

    //Only allow collisions from top
    /* const isCollisionFromTop = (sprite, platform) => {
      return platform.body.y > sprite.body.y;
    };

    this.physics.add.collider(
      this.player,
      this.slime,
      collisionMovingPlatform,
      isCollisionFromTop,
      this
    ); */
    //-- 

    this.physics.add.collider(this.player, this.slime, (player, slime) => {
      //if(!player.body.touching.down){
        /* if(player.anims.currentAnim.key == 'attack'){
          slime.muere();
        }
        else{ */
          slime.anims.play('idle', true);
          slime.body.setVelocityX(0);
          player.body.setOffset(29, 0);
          player.muere();
          this.endGame(); 
        //}
        
     /*  }
      else {
        slime.muere();
      } */
    });



  }

  endGame(completed = false) {
      if(!completed) {
        this.scene.launch('gameover', {_sceneKey: this.scene.key });
      } else {
        this.scene.launch('congratulations', {_sceneKey: this.scene.key });
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