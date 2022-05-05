import ReturnButton  from "../components/returnLobby-button.js";

export default class Final extends Phaser.Scene {
  constructor() {
    super({ key: 'final' });
  }

  preload() {
    this.load.image('pantallaFinal', 'assets/backgrounds/prelevels/pantallaFinal.png');
    this.load.spritesheet('buttonReturnLobby', 'assets/sprites/returnLobby.png', { frameWidth: 190, frameHeight: 49 });   
  }

  init(data) {
    this.keyData = data;
  }
  
  create() {
    this.add.image(0, 0, 'pantallaFinal').setOrigin(0).setDepth(0);
    this.returnButton = new ReturnButton(this);
  }
}