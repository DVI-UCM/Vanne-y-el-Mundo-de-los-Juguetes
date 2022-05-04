import ContinueButton  from "../components/continue-button.js";
import ReturnButton  from "../components/returnLobby-button.js";

export default class Congratulations extends Phaser.Scene {
  constructor() {
    super({ key: 'congratulations' });
  }

  preload() {
    this.load.image('backGroundCongratulations', 'assets/backgrounds/congratulationsBackGround.jpg');
    this.load.image('congratulations', 'assets/sprites/congratulations.png');
    this.load.spritesheet('continueButton', 'assets/sprites/continue.png', { frameWidth: 190, frameHeight: 49 });
    this.load.spritesheet('buttonReturnLobby', 'assets/sprites/returnLobby.png', { frameWidth: 190, frameHeight: 49 });     
  }

  init(data) {
    this.keyData = data;
  }
  
  create() {
    this.add.image(0, 0, 'backGroundCongratulations').setOrigin(0).setDepth(0);
    this.congratulationsImage = this.add.image(500, 90, 'congratulations');
    this.continueButton = new ContinueButton(this, this.keyData);
    this.returnButton = new ReturnButton(this);
  }
}