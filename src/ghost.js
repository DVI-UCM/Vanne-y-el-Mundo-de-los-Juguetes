import Star from './star.js';
import Level2 from './level2.js';
/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class Ghost extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor del jugador
   * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
   * @param {number} x Coordenada X
   * @param {number} y Coordenada Y
   */
  constructor(scene, x, y, key) {
    super(scene, x, y, key);

    this.die = false;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    // Queremos que el jugador no se salga de los límites del mundo
    // this.body.setCollideWorldBounds();
    this.speed = 200;
    this.setScale(.06);
    // Esta label es la UI en la que pondremos la puntuación del jugador
    this.label = this.scene.add.text(10, 10, "");

    this.body.setVelocityX(this.speed);
  }

  updateDie(a) {
    this.die = a;
  }

  onCollision(){
    this.flipX = !this.flipX;
    this.speed = -this.speed;
    this.body.setVelocityX(this.speed);
  }

  /**
   * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
   * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones 
   * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
   * @override
   */
  preUpdate(t,dt) {
    super.preUpdate(t,dt);
    this.body.collideWorldBounds=true;
    this.body.onWorldBounds=true;

    /*if (this.scene.physics.collide(this.scene.player, this)) {
      this.body.setVelocityX(0);
      this.scene.player.muere();
    }*/
  }
  
}


  
  
