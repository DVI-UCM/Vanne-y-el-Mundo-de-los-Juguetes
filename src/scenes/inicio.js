export default class Inicio extends Phaser.Scene {
    /**
     * Constructor de la escena
     */
    constructor() {
      super({ key: 'inicio' });
    }

    init(){

    }

    preload() {
      this.load.setPath('assets/sprites/');

      this.load.image('button-1', 'blue_button02.png');
      this.load.image('button-2', 'blue_button03.png');
    
    }

    create() {
      var width = this.cameras.main.width / 2;
      var height = this.cameras.main.height / 2;
      
      this.startBtn = this.add.sprite(width, height - 40, 'button-1',).setInteractive();
      this.continueBtn = this.add.sprite(width, height + 40, 'button-1',).setInteractive();

      var startText = this.add.text(0, 0, "Empezar juego nuevo", {font: "16px Arial", fill: "#ffffff"}).setOrigin(0.5 , 0.5);
      startText.x = this.startBtn.x;
      startText.y = this.startBtn.y;

      var continueText = this.add.text(0, 0, "Continuar juego", {font: "16px Arial", fill: "#ffffff"}).setOrigin(0.5 , 0.5);
      continueText.x = this.continueBtn.x;
      continueText.y = this.continueBtn.y;

      this.startBtn.on('pointerdown', () => {
        this.startBtn.setTexture('button-2');
      });

      this.startBtn.on('pointerup', () => {
        this.startBtn.setTexture('button-1');
        this.scene.start("lobby");
      });

      this.continueBtn.on('pointerdown', () => {
        this.continueBtn.setTexture('button-2');
      });

      this.continueBtn.on('pointerup', () => {
        this.continueBtn.setTexture('button-1');
        this.scene.start("lobby");
      });
    }
}  
