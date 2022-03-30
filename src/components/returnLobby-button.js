


export default class ReturnButton extends Phaser.GameObjects.Sprite {
    constructor(scene) {
      super(scene, 400, 300, 'buttonReturnLobby')
      this.scene.add.existing(this)
      // this.relatedScene = scene;
      this.setDepth(1)
      // }
      this.setInteractive();
  
      this.on('pointerover', () => {
        this.setFrame(1);
      });
      this.on('pointerout', () => {
        this.setFrame(0);
      });
      this.on('pointerdown', () => {
        //this.scene.scene.start("lobby");
        this.scene.returnLobby()
      });
    }
  }
  