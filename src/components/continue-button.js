export default class ContinueButton extends Phaser.GameObjects.Sprite {
    constructor(scene, data) {
      super(scene, 400, 230, 'buttonRestart');
      this.scene.add.existing(this);
      this.name = data.key;
      this.numero = this.name[this.name.length-1]
      this.name = this.name.substring(0,  this.name.length - 1)
      this.numero = parseInt(this.numero)+1;
      this.name = this.name + this.numero;
  
      this.setInteractive();
  
      this.on('pointerover', () => {
        this.setFrame(1);
      });
      this.on('pointerout', () => {
        this.setFrame(0);
      });
      this.on('pointerdown', () => { this.setScale(0.95, 0.95) } );
      this.on('pointerup', () => {
        if(this.name[this.name.length-1] == 6){
            this.scene.scene.start('levelSelector');
        }
        else{
            this.scene.scene.start(this.name);
            this.scene.scene.remove('congratulations')
        }
      });
    }
  }
  