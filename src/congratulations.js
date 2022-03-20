import RestartButton  from "./components/restart-button.js";

export default class Congratulations extends Phaser.Scene {
  constructor() {
    super({ key: 'congratulations' });
    this.restartButton = new RestartButton(this);
  }

  preload() {
    this.load.image('backGroundConc', 'assets/sprites/congratulationsBackGround.jpg');
    this.load.image('congratulations', 'assets/sprites/congratulations.png');
    this.restartButton.preload();
  }
  
  create() {
    this.add.image(410, 250, 'backGroundConc');
    this.restartButton.create();
    this.congratsImage = this.add.image(400, 90, 'congratulations');
  }
}