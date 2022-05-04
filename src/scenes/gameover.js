import RestartButton  from "../components/restart-button.js";
import ReturnButton  from "../components/returnLobby-button.js";

export default class Gameover extends Phaser.Scene {
  constructor() {
    super({ key: 'gameover' });
  }

  preload() {
    this.load.image('backGroundGameOver', 'assets/backgrounds/gameOverBackGround.jpg');
    this.load.image('gameover', 'assets/sprites/gameover.png');
    this.load.spritesheet('buttonRestart', 'assets/sprites/restart.png', { frameWidth: 190, frameHeight: 49 }); 
    this.load.spritesheet('buttonReturnLobby', 'assets/sprites/returnLobby.png', { frameWidth: 190, frameHeight: 49 });
  }

  init(data) {
    this.keyData = data;
  }
  
  create() {
    this.add.image(0, 0, 'backGroundGameOver').setOrigin(0).setDepth(0);
    this.gameoverImage = this.add.image(500, 90, 'gameover');
    this.restartButton = new RestartButton(this, this.keyData);
    this.returnButton = new ReturnButton(this, this.keyData);
  }
}