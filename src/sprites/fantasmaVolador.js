/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
 export default class FantasmaVolador extends Phaser.GameObjects.Sprite {
  
    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} fromX Coordenada X de inicio. Si el sprite cambia de sentido lo hará en este punto.
     * @param {number} fromY Coordenada Y de inicio. Si el sprite cambia de sentido lo hará en este punto.
     * @param {number} toX Coordenada X final. Si el sprite cambia de sentido lo hará en este punto.
     * @param {number} toY Coordenada Y final. Si el sprite cambia de sentido lo hará en este punto.
     */
     constructor(scene, fromX, fromY, toX, toY) {
      super(scene, fromX, fromY, 'fantasmaV');
      
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this);
  
      this.fromX = fromX;
      this.fromY = fromY;
      this.toX = toX;
      this.toY = toY;
  
  
      this.createAnims();
      this.anims.play('walk', true);

      
      this.die = false;
    
      // Queremos que el jugador no se salga de los límites del mundo
      this.vel = {x: 150, y: -400};
      this.body.setVelocityX(this.vel.x);
      this.setScale(.30);
      this.body.setSize(194, 278);
  
      this.body.setCollideWorldBounds(true, 0, 0);
      this.speed = 200;
      this.body.setVelocityX(this.speed);
    }
  
    createAnims(){
      this.anims.create({
        key: 'walk',
        frames: 'fantasmaV_walk',
        frameRate: 10,
        repeat: -1
    });
  
      
    }
  
    muere(){
      this.destroy();
    }
  
    /**
     * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
     * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones 
     * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
     * @override
     */
     preUpdate(t,dt) {
      super.preUpdate(t,dt);
      if(this.x < this.fromX || this.x >= this.toX) {
        this.flipX = !this.flipX;
        this.speed = -this.speed;
        this.body.setVelocityX(this.speed);
      }
    } 
    
  }
  