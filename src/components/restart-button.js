


export default class RestartButton extends Phaser.GameObjects.Sprite {
  constructor(scene, data) {
    super(scene, 400, 230, 'button')
    this.scene.add.existing(this)
    // this.relatedScene = scene;
    this.name = data.key;
    this.setDepth(1)
    // }

    // // otros métodos de la clase
    // // preload() {
    // //     this.relatedScene.load.spritesheet('button', 'assets/sprites/restart.png', { frameWidth: 190, frameHeight: 49 });

    // // }
    // create() {
    // this.startButton = this.relatedScene.add.sprite(400, 230, 'button')
    this.setInteractive();

    this.on('pointerover', () => {
      this.setFrame(1);
    });
    this.on('pointerout', () => {
      this.setFrame(0);
    });
    this.on('pointerdown', () => {
      this.scene.scene.start(this.name);
    });
  }
}
