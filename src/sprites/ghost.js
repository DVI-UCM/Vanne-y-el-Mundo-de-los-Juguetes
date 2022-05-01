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
   * @param {number} dir Direccion del fantasma por defecto horizontal
   */
  constructor(scene, x, y, key, dir = "horizontal") {
    super(scene, x, y, key);
    this.dir = dir;

    this.die = false;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    // Queremos que el jugador no se salga de los límites del mundo
    this.body.setCollideWorldBounds();
    this.speed = 200;
    this.setScale(.06);
    if(this.dir == "horizontal"){
      this.body.setVelocityX(this.speed);
    }

    if(this.dir == "vertical"){
      this.body.setVelocityY(this.speed);
    }
  }

  
  updateDie(a) {
    this.die = a;
  }

  onCollision(){
    if(this.dir == "horizontal"){
      this.flipX = !this.flipX;
      this.speed = -this.speed;
      this.body.setVelocityX(this.speed);
    }
    if(this.dir == "vertical"){
      this.speed = -this.speed;
      this.body.setVelocityY(this.speed);
    }

  }

  /**
   * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
   * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones 
   * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
   * @override
   */
  preUpdate(t,dt) {
    super.preUpdate(t,dt);
    if(this.dir == "horizontal"){
      this.body.setVelocityX(this.speed);
    }

    if(this.dir == "vertical"){
      this.body.setVelocityY(this.speed);
    }
  }
  
}


  
  
