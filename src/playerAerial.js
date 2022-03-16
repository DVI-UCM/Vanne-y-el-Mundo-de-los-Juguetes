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
    super(scene, x, y, 'player');

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNames('player', { prefix: 'idle__00',
      start: 0,
      end: 9}),
      frameRate: 10, // Velocidad de la animación
      repeat: -1    // Animación en bucle
    });

    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNames('player', { prefix: 'run__00',
      start: 0,
      end: 9}),
      frameRate: 15, // Velocidad de la animación
      repeat: -1    // Animación en bucle
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
      frames: this.anims.generateFrameNames('player', { prefix: 'dead__00',
      start: 0,
      end: 9}),
      frameRate: 10, // Velocidad de la animación
      repeat: 0    // Animación en bucle
    });

    this.anims.play('idle', true);

    this.score = 0;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    // Queremos que el jugador no se salga de los límites del mundo
    this.body.setCollideWorldBounds();
    this.speed = 200;
    //this.jumpSpeed = -600;
    this.setScale(.35);
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
    this.body.setVelocityX(0);
    this.body.setVelocityY(0);
    //this.flipX = false;
    this.muerte = true;
    this.anims.play('dead');
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
    
    if (this.cursors.up.isDown) {
      this.body.setVelocityY(-this.speed);
      this.anims.play('run', true);
    }

    if (this.cursors.down.isDown){
      this.body.setVelocityY(this.speed);
      this.anims.play('run', true);
    }

    if (this.cursors.left.isDown) {
      this.flipX = true;
      this.body.setVelocityX(-this.speed);
      this.anims.play('run', true);
    }
    else if (this.cursors.right.isDown) {
      this.flipX = false;
      this.body.setVelocityX(this.speed);
      this.anims.play('run', true);

    }
    else{
      this.anims.play('idle', true);
    }

    if(this.muerte){
      this.anims.play('dead', true);
    }
  }
  
}
