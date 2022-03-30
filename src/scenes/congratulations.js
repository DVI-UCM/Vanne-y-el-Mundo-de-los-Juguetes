import RestartButton  from "../components/restart-button.js";
import ReturnButton  from "../components/returnLobby-button.js";

export default class Congratulations extends Phaser.Scene {
  constructor() {
    super({ key: 'congratulations' });
  }

  preload() {
    this.load.image('backGroundConcratulations', 'assets/sprites/congratulationsBackGround.jpg');
    this.load.image('congratulations', 'assets/sprites/congratulations.png');
    this.load.spritesheet('buttonRestart', 'assets/sprites/restart.png', { frameWidth: 190, frameHeight: 49 });
    this.load.spritesheet('buttonReturnLobby', 'assets/sprites/returnLobby.png', { frameWidth: 190, frameHeight: 49 });     
  }

  init(data) {
    this.keyData = data;
  }
  
  create() {
    this.add.image(410, 250, 'backGroundConcratulations');
    this.congratulationsImage = this.add.image(400, 90, 'congratulations');
    this.restartButton = new RestartButton(this, this.keyData);
    this.returnButton = new ReturnButton(this);
  }
}