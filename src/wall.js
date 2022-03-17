/**
 * Clase que representa las plataformas que aparecen en el escenario de juego.
 * Cada plataforma es responsable de crear la base que aparece sobre ella y en la 
 * que, durante el juego, puede aparecer una estrella
 */
export default class Wall extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor de la Plataforma
   * @param {Phaser.Scene} scene Escena a la que pertenece la plataforma
   * @param {Player} player Jugador del juego
   * @param {Player} ghost Jugador del juego
   * @param {number} x Coordenada x
   * @param {number} y Coordenada y
   */
  constructor(scene, player, ghost, x, y) {
    super(scene, x, y, 'lego_verde');
    this.player = player;
    this.ghost = ghost;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);
    // this.scene.physics.add.collider(this, this.player); 
    // this.scene.physics.add.collider(this, this.ghost);
  }

}
