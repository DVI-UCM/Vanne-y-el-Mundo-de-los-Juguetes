/**
 * Clase para los objetos estrella que el jugador ha de recoger
 * Una estrella aparece sobre una base. Cuando el jugador la recoge, se crea 
 * una nueva estrella en otra posición, si el juego no ha terminado.
 * @extends Phaser.GameObjects.Sprite
 */
 export default class Door extends Phaser.GameObjects.Sprite {
  
    /**
     * Constructor de door
     * @param {Sceme} scene Escena en la que aparece la estrella
     * @param {bool} close Si esta cerrado o abierto
     * @param {number} x coordenada x
     * @param {number} y coordenada y
     */
    constructor(scene, x, y) {
      //if(!close)super(scene, x, y, 'closeDoor');
      //else super(scene, x, y, 'openDoor');
      super(scene, x, y, 'closeDoor');
      this.close = true;
      this.x =x;
      this.y = y;
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this, true);
    }
  
    setOpen(){
      this.close = false;
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
  