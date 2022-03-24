import Star from './star.js';
import Calabaza from './calabaza.js';

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
      frames: this.anims.generateFrameNames('player', { prefix: 'slide__00',
      start: 0,
      end: 9}),
      frameRate: 15, // Velocidad de la animación
      repeat: 0    // Animación en bucle
    });

    this.anims.create({
      key: 'attack',
      frames: this.anims.generateFrameNames('player', { prefix: 'attack__00',
      start: 0,
      end: 9}),
      frameRate: 15 , // Velocidad de la animación
    });

    this.anims.create({
      key: 'jump_attack',
      frames: this.anims.generateFrameNames('player', { prefix: 'jump_attack__00',
      start: 0,
      end: 9}),
      frameRate: 15 , // Velocidad de la animación
    });

    this.anims.create({
      key: 'dead',
      frames: 'player_dead',
      frameRate: 5, // Velocidad de la animación
      repeat: 0
    });

    this.anims.play('idle', true);

    this.score = 0;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    // Queremos que el jugador no se salga de los límites del mundo
    //this.body.setCollideWorldBounds();
    this.body.setCollideWorldBounds(true, 0, 0);
    this.speed = 300;
    this.jumpSpeed = -600;

    // Esta label es la UI en la que pondremos la puntuación del jugador
    this.label = this.scene.add.text(10, 10, "");
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.updateScore();
    
  }

  /**
   * El jugador ha recogido una estrella por lo que este método añade un punto y
   * actualiza la UI con la puntuación actual.
   */
  point() {
    this.score++;
    this.updateScore();
  }
  
  /**
   * Actualiza la UI con la puntuación actual
   */
  updateScore() {
    this.label.text = 'Score: ' + this.score;
  }

  muere(){
    this.body.setVelocity(0, 0);
    this.muerte = true;
    this.anims.play('dead');
    //this.scene.scene.start('end');
    //this.label.text = 'Has muerto: ' + this.score;
  }

  /**
   * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
   * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones 
   * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
   * @override
   */
  preUpdate(t,dt) {
    super.preUpdate(t,dt);

    if(!this.muerte){
      if(this.cursors.up.isDown && this.body.onFloor()) {
        this.body.setVelocityY(this.jumpSpeed);
        this.anims.play('jump', true);
      }

      if (this.cursors.left.isDown) {
        this.flipX = true;
        this.body.setVelocityX(-this.speed);
        if(this.body.onFloor()){
          if(this.cursors.down.isDown)
            this.anims.play('slide', true);
          else{
            this.anims.play('run', true);
            this.body.setOffset(8, 2);
          }
        }
      }
      else if (this.cursors.right.isDown) {
        this.flipX = false;
        this.body.setVelocityX(this.speed);

        if(this.body.onFloor()){
          if(this.cursors.down.isDown)
            this.anims.play('slide', true);
          else{
            this.anims.play('run', true);
            this.body.setOffset(10, 2);
          }
        }
        else{
          this.anims.play('jump', true);
        }
      }
      else if (this.cursors.space.isDown){
        if(this.body.onFloor()) 
          this.anims.play('attack', true);
        else
          this.anims.play('jump_attack', true);
      }
      else{
        if(this.body.onFloor()){
          this.anims.play('idle', true);
          this.body.setOffset(0);
        }
        else {
          this.anims.play('jump', true);
        }
        this.body.setVelocityX(0);
      }  

      if(this.muerte){
        this.anims.play('dead', true);
      }
    }
  }
}
