
import ExitButton from '../components/exit-button.js';

/**
 * @extends Phaser.Scene
 */
export default class prelevels extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'prelevels' });
  }


  init(data){
    this.nextLevel = data._sceneKey;
  }

  preload(){
    this.load.image('bgPreLv1', 'assets/backgrounds/prelevels/fondoEstandar.png');
    this.load.image('bgPreLv2', 'assets/backgrounds/prelevels/fondoEstandar.png');
    this.load.image('bgPreLv3', 'assets/backgrounds/prelevels/fondoEstandar.png');
    this.load.image('bgPreLv4', 'assets/backgrounds/prelevels/fondoEstandar.png');
    this.load.image('bgPreLv5', 'assets/backgrounds/prelevels/fondoEstandar.png');
    this.load.image('bgPreLv6', 'assets/backgrounds/prelevels/fondoEstandar.png');

  }

  create() {
    

    if(this.nextLevel == "level1") this.bgLevel = 'bgPreLv1'
    else if(this.nextLevel == "level2") this.bgLevel = 'bgPreLv2'
    else if(this.nextLevel == "level3") this.bgLevel = 'bgPreLv3'
    else if(this.nextLevel == "level4") this.bgLevel = 'bgPreLv4'
    else if(this.nextLevel == "level5") this.bgLevel = 'bgPreLv5'
    else if(this.nextLevel == "level6") this.bgLevel = 'bgPreLv6' 

    let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, this.bgLevel);
    let scaleX = this.cameras.main.width / image.width;
    let scaleY = this.cameras.main.height / image.height;
    let scale = Math.max(scaleX, scaleY);
    image.setScale(scale).setScrollFactor(0);

    new ExitButton(this, this.cameras.main.width - 20, 20);
  

    var generalText = "Pulsa espacio para continuar";

    this.generalTextShow = this.add.text(370, 400, generalText,  { fontFamily: 'Franklin Gothic Medium, "Arial Narrow", Arial, sans-serif', fontSize:"20px", fill: '#000000',  align: 'center' });
    this.generalTextShow.lineSpacing = 30;
    this.generalTextShow.depth = 1;

    this.tweens.add({
      targets: [this.generalTextShow],
      alpha: 0,
      ease: 'Cubic.easeIn',
      duration: 500,
      repeat: -1,
      yoyo: true
    });


    this.inputKeys = [
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    ];
    this.levelText = "Error"
    this.showTextLevel()
  }

  showTextLevel(){
      
    if(this.nextLevel == "level1"){
        this.levelText = "Vanne: Recoge todos los fragmentos del amuleto."
    }
    else if(this.nextLevel == "level2"){
        this.levelText = "Xin: Navega por el laberinto. Mata a todos los fantasmas para desbloquear la llave que abre la puerta."
    }
    else if(this.nextLevel == "level3"){
        this.levelText = "Vanne: Recoge todos los fragmentos del amuleto."
    }
    else if(this.nextLevel == "level4"){
        this.levelText = "Xin: Navega por el laberinto. Mata a todos los fantasmas para desbloquear la llave que abre la puerta."
    }
    else if(this.nextLevel == "level5"){
        this.levelText = "Vanne: Recoge todos los fragmentos del amuleto."
    }
    else if(this.nextLevel == "level6"){
        this.levelText = "Xin: Navega por el laberinto. Esta vez solo verás iluminado a tu alrededor. Mata a todos los fantasmas para desbloquear la llave que abre la puerta."
    }

    this.levelTextShow = this.add.text(100, 100, this.levelText,  { fontFamily: 'Franklin Gothic Medium, "Arial Narrow", Arial, sans-serif', fontSize: "35px", fill: '#000000', align: 'center'});
    this.levelTextShow.lineSpacing = 30;
    this.levelTextShow.setWordWrapWidth(800, true);
    this.levelTextShow.depth = 1;

  }

  update(){
    if (this.inputKeys[0].isDown) { 
        this.scene.start(this.nextLevel);
      }
  }

  
}