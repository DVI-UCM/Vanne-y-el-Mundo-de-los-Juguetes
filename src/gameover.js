import RestartButton  from "./components/restart-button.js";

export default class Gameover extends Phaser.Scene {
  constructor() {
    super({ key: 'gameover' });
    this.restartButton = new RestartButton(this);
  }

  preload() {
    this.load.image('backGroundGameOver', 'assets/sprites/congratulationsBackGround.jpg');
    this.load.image('gameover', 'assets/sprites/gameover.png');
    this.restartButton.preload();
  }
  
  create() {
    this.add.image(410, 250, 'backGroundGameOver');
    this.restartButton.create();
    this.gameoverImage = this.add.image(400, 90, 'gameover');
  }
}