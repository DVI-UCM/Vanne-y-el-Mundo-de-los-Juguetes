export default class Inicio extends Phaser.Scene {
    /**
     * Constructor de la escena
     */
    constructor() {
      super({ key: 'inicio' });
    }

    preload() {
      this.load.setPath('assets/sprites/');

      this.load.image('button-1', 'blue_button02.png')
      this.load.image('button-2', 'blue_button03.png')
    }

    create() {
      this.startBtn = this.add.sprite(400, 300, 'button-1',).setInteractive();

      this.startBtn.on('pointerdown', function (){
        this.startBtn.setTexture('button-2');
      }, this);

      this.startBtn.on('pointerup', function(){
        this.startBtn.setTexture('button-1');
        this.scene.start("level");
      }, this);
    }
}  
