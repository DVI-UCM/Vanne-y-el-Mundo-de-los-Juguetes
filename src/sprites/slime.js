/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
 export default class Slime extends Phaser.GameObjects.Sprite {
  
    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} fromX Coordenada X de inicio. Si el sprite cambia de sentido lo hará en este punto.
     * @param {number} fromY Coordenada Y de inicio. Si el sprite cambia de sentido lo hará en este punto.
     * @param {number} toX Coordenada X final. Si el sprite cambia de sentido lo hará en este punto.
     * @param {number} toY Coordenada Y final. Si el sprite cambia de sentido lo hará en este punto.
     */
     constructor(scene, fromX, fromY, toX, toY) {
      super(scene, fromX, fromY, 'slime');
      
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this);
  
      this.fromX = fromX;
      this.fromY = fromY;
      this.toX = toX;
      this.toY = toY;
  
  
      this.createAnims();
      this.anims.play('idle');
      
      this.die = false;
    
      // Queremos que el jugador no se salga de los límites del mundo
      this.body.setCollideWorldBounds(true, 0, 0);
      
      //this.setScale(.10);
      
      this.speed = 50;
      //this.body.setVelocityX(this.speed);
  
    }
  
    createAnims(){
      /* this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNames('slime', 
        { prefix: 'idle__',
          start: 0,
          end: 13
        }),
        frameRate: 10, // Velocidad de la animación
        repeat: -1    // Animación en bucle
      }); */
  
      this.anims.create({
          key: 'idle',
          frames: 'slime_idle',
          frameRate: 10,
          repeat: -1
      });

      /* this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNames('slime', 
        { prefix: 'walk__',
          start: 0,
          end: 27
        }),
        frameRate: 10, // Velocidad de la animación
        repeat: -1    // Animación en bucle
      }); */

      /* this.anims.create({
        key: 'damage',
        frames: this.anims.generateFrameNames('slime', { prefix: 'damage__',
        start: 0,
        end: 11}),
        frameRate: 10, // Velocidad de la animación
        repeat: -1    // Animación en bucle
      }); */

    //   this.anims.create({
    //     key: 'down',
    //     frames: this.anims.generateFrameNames('slime', { prefix: 'down__',
    //     start: 0,
    //     end: 0}),
    //     frameRate: 10, // Velocidad de la animación
    //     repeat: -1    // Animación en bucle
    //   });
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
      this.body.collideWorldBounds=true;
      this.body.onWorldBounds=true;
  
      this.scene.physics.world.on('worldbounds', (body, up, down, left, right) => {
        if(left || right){
          this.flipX = !this.flipX;
          this.speed = -this.speed;
          this.body.setVelocityX(this.speed);
        }
      });
  
      if(this.x < this.fromX || this.x >= this.toX) {
        this.flipX = !this.flipX;
        this.speed = -this.speed;
        this.body.setVelocityX(this.speed);
      }
    } 
    
  }
  