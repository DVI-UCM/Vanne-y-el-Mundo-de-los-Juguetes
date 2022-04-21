export default class ReturnButton extends Phaser.GameObjects.Sprite {
    constructor(scene, data) {
      super(scene, 400, 300, 'buttonReturnLobby');
      
      this.name = data._sceneKey;
      this.scene.add.existing(this);
      this.setInteractive();
  
      this.on('pointerover', () => {
        this.setFrame(1);
      });
      this.on('pointerout', () => {
        this.setFrame(0);
      });
      this.on('pointerdown', () => { this.setScale(0.95) } );
      this.on('pointerup', () => {
        this.scene.scene.stop(this.name);

        this.scene.scene.start("lobby");
      });
    }
  }
  