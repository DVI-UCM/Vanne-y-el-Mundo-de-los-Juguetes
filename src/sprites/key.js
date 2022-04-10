/**
 * Clase para los objetos estrella que el jugador ha de recoger
 * Una estrella aparece sobre una base. Cuando el jugador la recoge, se crea 
 * una nueva estrella en otra posición, si el juego no ha terminado.
 * @extends Phaser.GameObjects.Sprite
 */
 export default class Key extends Phaser.GameObjects.Sprite {
  
    /**
     * Constructor de Key
     * @param {Sceme} scene Escena en la que aparece la estrella
     * @param {number} x coordenada x
     * @param {number} y coordenada y
     */
    constructor(scene, x, y) {
      super(scene, x, y, 'key');
      this.x =x;
      this.y = y;
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this, true);
    }
  
    /**
     * Redefinición del preUpdate de Phaser
     * @override
     */
    preUpdate() {
      // IMPORTANTE: Si no ponemos esta instrucción y el sprite está animado
      // no se podrá ejecutar la animación del sprite. 
      super.preUpdate();
    }
  }
  