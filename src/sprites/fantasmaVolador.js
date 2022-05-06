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
      super(scene, fromX, fromY, 'fantasmaV_walk');
      
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this);
  
      this.fromX = fromX;
      this.fromY = fromY;
      this.toX = toX;
      this.toY = toY;
  
      this.createAnims();
      this.anims.play('walk', true);
      
      this.setScale(.30);
      this.body.setSize(194, 278);
  
      this.body.setCollideWorldBounds(true, 0, 0);
      this.speed = 150;
  }

  createAnims(){
    this.anims.create({
      key: 'walk',
      frames: 'fantasmaV_walk',
      frameRate: 10, // Velocidad de la animación
      repeat: -1    
    });
  }

  muere(){
    this.destroy();
  }
  
  preUpdate(t,dt) {
    super.preUpdate(t,dt);
    if(this.x < this.fromX || this.x >= this.toX) {
      this.flipX = !this.flipX;
      this.speed = -this.speed;
      this.body.setVelocityX(this.speed);
    }
  } 
}
  