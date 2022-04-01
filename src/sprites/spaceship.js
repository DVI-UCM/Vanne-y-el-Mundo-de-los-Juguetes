/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class SpaceShip extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor del jugador
   * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
   * @param {number} x Coordenada X
   * @param {number} y Coordenada Y
   */
  constructor(scene, x, y) {
    super(scene, x, y, 'spaceshipRight');

    this.score = 0;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    // Queremos que el jugador no se salga de los límites del mundo
    this.body.setCollideWorldBounds();
    this.speed = 200;
    //this.setScale(.95);

    this.cursors = this.scene.input.keyboard.createCursorKeys();
  }

  muere(){
    this.body.setVelocity(0, 0);
    this.muerte = true;
  }

  /**
   * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
   * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones 
   * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
   * @override
   */
  preUpdate(t,dt) {
    super.preUpdate(t,dt);
    this.body.setVelocity(0, 0);
    
    if(!this.cursors.space.isDown){
      if (this.cursors.up.isDown) {
        this.body.setVelocityY(-this.speed);
        this.setTexture('spaceshipUp');
        this.body.setSize(25, 45);
        this.flipY = false;
      }
      else if (this.cursors.down.isDown){
        this.body.setVelocityY(this.speed);
        this.setTexture('spaceshipUp');
        this.body.setSize(25, 45);
        this.flipY = true;
      }
      if (this.cursors.left.isDown) {
        this.body.setVelocityX(-this.speed);
        this.setTexture('spaceshipRight');
        this.body.setSize(45, 25);
        this.flipX = true;
      }
      else if (this.cursors.right.isDown) {
        this.body.setVelocityX(this.speed);
        this.setTexture('spaceshipRight');
        this.body.setSize(45, 25);
        this.flipX = false;
      }
    }

    if(this.muerte){
      //this.anims.play('dead', true);
    }
  }
  
}
