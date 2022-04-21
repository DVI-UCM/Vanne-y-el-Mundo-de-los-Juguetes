/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class Player extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor del jugador
   * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
   * @param {number} x Coordenada X
   * @param {number} y Coordenada Y
   */
  constructor(scene, x, y) {
    super(scene, x, y, 'player_idle');

    this.createAnims();
    
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    
    this.setOrigin(0.5, 1);
    this.anims.play('idle', true);
    
    // Queremos que el jugador no se salga de los límites del mundo
    this.body.setCollideWorldBounds(true, 0, 0);
    this.speed = 300;
    this.jumpSpeed = -400;
    this.attacking = false;
    this.sliding = false;
    this.cursors = this.scene.input.keyboard.createCursorKeys();  
  } 

  createAnims(){
    this.anims.create({
      key: 'idle',
      frames: 'player_idle',
      frameRate: 10, // Velocidad de la animación
      repeat: -1    // Animación en bucle
    });

    this.anims.create({
      key: 'run',
      frames: 'player_run',
      frameRate: 15, // Velocidad de la animación
      repeat: -1    // Animación en bucle
    });

    this.anims.create({
      key: 'jump',
      frames: 'player_jump',
      frameRate: 15, // Velocidad de la animación
      repeat: -1    // Animación en bucle
    });

    this.anims.create({
      key: 'slide',
      frames: 'player_slide',
      frameRate: 10, // Velocidad de la animación
      repeat: 0    
    });

    this.anims.create({
      key: 'attack',
      frames: 'player_attack',
      frameRate: 15 , // Velocidad de la animación
      repeat:0
    });

    /* this.anims.create({
      key: 'jump_attack',
      frames: this.anims.generateFrameNames('player', { prefix: 'jump_attack__00',
      start: 0,
      end: 9}),
      frameRate: 15 , // Velocidad de la animación
    }); */

    this.anims.create({
      key: 'dead',
      frames: 'player_dead',
      frameRate: 5, // Velocidad de la animación
      repeat: 0
    });

    this.on(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + 'slide',  () => {
      this.sliding = false;
      this.body.setSize(58, 100, 0, 0);
    });

    this.on(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + 'attack',  () => {
      this.attacking = false;
      this.body.setSize(58, 100, 0, 0);
    });
  }

  muere(){
    this.body.setVelocity(0);
    this.muerte = true;
    this.anims.play('dead');
  }

  /**
   * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
   * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones 
   * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
   * @override
   */
  preUpdate(t,dt) {
    super.preUpdate(t,dt);

    const slideJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.down);
    const spaceJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space);
    const upJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up);

    if(!this.muerte){
      if(upJustPressed && this.body.onFloor() && !this.attacking && !this.sliding) {
        this.body.setVelocityY(this.jumpSpeed);
        //this.body.setSize(60, 95, 0, 0); 
        //this.body.setOffset(0, 8);
        this.anims.play('jump');
      }

      if (this.cursors.left.isDown && !this.attacking && !this.sliding) {
        this.flipX = true;
        this.body.setVelocityX(-this.speed);
        if(this.body.onFloor()){
          if(slideJustPressed){
            this.sliding = true;
            this.anims.play('slide');  
            this.body.setSize(79, 78); 
          }
          else if(spaceJustPressed){
            this.body.setVelocityX(0);
            this.attacking = true;
            this.body.setSize(85, 100);
            this.body.setOffset(10, 0); 
            this.anims.play('attack');
          }
          else{
            //this.body.setSize(75, 104); 
            this.anims.play('run', true);
            //this.body.setOffset(8, 2);
          }
        }
        else{
          if(spaceJustPressed){
            this.attacking = true;
            this.body.setSize(85, 100);
            this.body.setOffset(10, 0); 
            this.anims.play('jump_attack');
          }
          else{
            //this.body.setSize(60, 95, 0, 0); 
            //this.body.setOffset(0, 8);
            this.anims.play('jump', true);
          }
        }
      }
      else if (this.cursors.right.isDown && !this.attacking && !this.sliding) {
        this.flipX = false;
        this.body.setVelocityX(this.speed);
    
        if(this.body.onFloor()){
          if(slideJustPressed){
            this.sliding = true;
            this.anims.play('slide');  
            this.body.setSize(79, 78);
          }
          else if(spaceJustPressed){
            this.body.setVelocityX(0);
            this.attacking = true;
            this.body.setSize(85, 100);
            this.body.setOffset(10, 0); 
            this.anims.play('attack');
          }
          else{
            //this.body.setSize(75, 104); 
            this.anims.play('run', true);
            //this.body.setOffset(10, 2);
          }
        }
        else{
          if(spaceJustPressed){
            this.attacking = true;
            this.body.setSize(85, 100);
            this.body.setOffset(10, 0); 
            this.anims.play('jump_attack');
          }
          else{
            //this.body.setSize(60, 95, 0, 0); 
            //this.body.setOffset(0, 8);
            this.anims.play('jump', true);
          }
        }
      }
      else if (spaceJustPressed){
        this.attacking = true;
        if(this.body.onFloor()){
          this.body.setSize(85, 100);
          this.body.setOffset(10, 0); 
          this.anims.play('attack');
        }
        else{
          this.anims.play('jump_attack', true);
        }
      }
      else{
        if(!this.attacking && !this.sliding){
          if(this.body.onFloor()){
            //this.body.setSize(58, 100, 0, 0);
            //this.body.setOffset(0, 0);
            this.anims.play('idle', true);
          }
          else {
            //this.body.setSize(60, 95, 0, 0);
            //this.body.setOffset(0, 8); 
            this.anims.play('jump', true);
          }
          this.body.setVelocityX(0);
        }
      }
    }
    else{
      //this.body.setSize(116, 120); 
      this.anims.play('dead', true);
    }

    //codigo de @kittykatattack en https://phaser.discourse.group/t/riding-moving-platforms/7330/6
    if (this.isOnPlatform && this.currentPlatform) {
      this.x += this.currentPlatform.vx;
      this.y += this.currentPlatform.vy;
  
      this.isOnPlatform = false;
      this.currentPlatform = null;
    }
    //--
  }
}
