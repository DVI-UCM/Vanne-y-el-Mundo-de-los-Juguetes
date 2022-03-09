import Star from './star.js';
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
    super(scene, x, y, 'calabaza');

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNames('calabaza', { prefix: 'idle__00',
      start: 0,
      end: 9}),
      frameRate: 10, // Velocidad de la animación
      repeat: -1    // Animación en bucle
    });

    this.anims.create({
        key: 'run',
        frames: this.anims.generateFrameNames('calabaza', { prefix: 'run__00',
        start: 0,
        end: 7}),
        frameRate: 10, // Velocidad de la animación
        repeat: -1    // Animación en bucle
      });

    this.anims.play('run', true);
    
    this.die = false;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    // Queremos que el jugador no se salga de los límites del mundo
    this.body.setCollideWorldBounds(true);
    this.speed = 100;
    this.jumpSpeed = -600;
    this.setScale(.15);
    // Esta label es la UI en la que pondremos la puntuación del jugador
    this.label = this.scene.add.text(10, 10, "");
  }

  /**
   * Actualiza la UI con la puntuación actual
   */
  updateDie(a) {
    this.die = a;
  }

  /**
   * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
   * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones 
   * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
   * @override
   */
  preUpdate(t,dt) {
    super.preUpdate(t,dt);
    if(this.body.x == 0){
        this.body.setVelocityX(this.speed);
    }
    if(this.body.x == 930){
        this.flipX = true;
        this.body.setVelocityX(-this.speed);
        this.anims.play('run', true);
    }

    if (this.scene.physics.overlap(this.scene.player, this)) {
        this.body.setVelocityX(0);
        this.anims.play('idle', true);
        this.scene.calabazaChoca(this.base);
        //this.destroy();
    }
  }
  
}
