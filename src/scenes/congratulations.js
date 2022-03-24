import RestartButton  from "../components/restart-button.js";

export default class Congratulations extends Phaser.Scene {
  constructor() {
    super({ key: 'congratulations' });
    
  }

  preload() {
    this.load.image('backGroundGameOver', 'assets/sprites/congratulationsBackGround.jpg');
    this.load.image('congratulations', 'assets/sprites/congratulations.png');
    this.load.spritesheet('button', 'assets/sprites/restart.png', { frameWidth: 190, frameHeight: 49 });
    
    // this.restartButton.preload(); 
    
  }

  init(data) {
    this.keyData = data;
  }
  
  create() {
    this.restartButton = new RestartButton(this, this.keyData);
    // this.restartButton.create();
    this.add.image(410, 250, 'backGroundGameOver');
    this.gameoverImage = this.add.image(400, 90, 'gameover');
  }
}