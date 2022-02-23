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

      this.load.image('button-1', 'blue_button02.png')
      this.load.image('button-2', 'blue_button03.png')
    
    }

    create() {
      var width = this.cameras.main.width / 2;
      var height = this.cameras.main.height / 2;
      
      this.startBtn = this.add.sprite(width, height - 40, 'button-1',).setInteractive();
      this.continueBtn = this.add.sprite(width, height + 40, 'button-1',).setInteractive();

      //startText = this.add.text(0, 0, "Start new game", {font: "32px Arial", fill: "#ff0044"})
      //startText.x = this.startBtn.x
      //startText.y = this.startText.y

      this.startBtn.on('pointerdown', function (){
        this.startBtn.setTexture('button-2');
      }, this);

      this.startBtn.on('pointerup', function(){
        this.startBtn.setTexture('button-1');
        this.scene.start("level");
      }, this);

      this.continueBtn.on('pointerdown', function (){
        this.continueBtn.setTexture('button-2');
      }, this);

      this.continueBtn.on('pointerup', function(){
        this.continueBtn.setTexture('button-1');
        this.scene.start("level");
      }, this);
    }

    update(time,delta){

    }

    over(){
      
    }
    
}  
