import RestartButton  from "../components/restart-button.js";

export default class Congratulations extends Phaser.Scene {
  constructor() {
    super({ key: 'congratulations' });
  }

  preload() {
    this.load.image('backGroundGameOver', 'assets/sprites/congratulationsBackGround.jpg');
    this.load.image('congratulations', 'assets/sprites/congratulations.png');
    this.load.spritesheet('button', 'assets/sprites/restart.png', { frameWidth: 190, frameHeight: 49 });    
  }

  init(data) {
    this.keyData = data;
  }
  
  create() {
    this.restartButton = new RestartButton(this, this.keyData);
    this.add.image(410, 250, 'backGroundGameOver');
    this.congratulationsImage = this.add.image(400, 90, 'congratulations');
  }
}