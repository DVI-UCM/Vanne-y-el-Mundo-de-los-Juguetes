export default class Amuleto extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor del Amuleto
   * @param {Phaser.Scene} scene Escena a la que pertenece
   * @param {number} x Coordenada x
   * @param {number} y Coordenada y
   */
  constructor(scene, x, y, texture){
    super(scene, x, y, texture);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);
      
    this.scene.tweens.add({
      targets: this,
      scaleX: 0.8,
      scaleY: 0.8,
      ease: 'Sine.easeInOut',
      duration: 1000,
      repeat: -1,
      yoyo: true
    });
  }
}