export default class ContinueButton extends Phaser.GameObjects.Sprite {
    constructor(scene, data) {
      super(scene, 500, 230, 'continueButton');
      this.scene.add.existing(this);
      let name = data._sceneKey;
      let numero = name.charAt(5);
      let nextNumero = parseInt(numero) + 1;
      let nextName = "level" + nextNumero;
  
      this.setInteractive();
  
      this.on('pointerover', () => {
        this.setFrame(1);
      });
      this.on('pointerout', () => {
        this.setFrame(0);
      });
      this.on('pointerdown', () => { this.setScale(0.95, 0.95) } );
      this.on('pointerup', () => {
        if(nextNumero == 7){
            this.scene.scene.start('levelSelector');
        }
        else{
            this.scene.scene.start('prelevels', {_sceneKey: nextName });
            this.scene.scene.remove('congratulations');
        }
      });
    }
  }
  