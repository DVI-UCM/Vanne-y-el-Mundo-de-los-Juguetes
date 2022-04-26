
import ExitButton from '../components/exit-button.js';
import FullScreenButton from '../components/fullScreen-button.js';

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
    
    
    //parallax aqui abajo
    //this.parallax = this.add.tileSprite(0, 0, 2000, 1000, 'lego');


    this.exit = new ExitButton(this, this.cameras.main.width - 20, 20);
    this.fullScreen = new FullScreenButton(this, this.cameras.main.width - 50, 20);

    var generalText = "Pulsa espacio para continuar";

    this.generalTextShow = this.add.text(200, 400, generalText,  { font: "20px Arial", fill: '#000000',  align: 'center' });
    this.generalTextShow.lineSpacing = 30;
    this.generalTextShow.depth = 1;


    this.inputKeys = [
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    ];
    this.levelText = "Error"
    this.showTextLevel()
  }

  showTextLevel(){
      
    if(this.nextLevel == "level1"){
        this.levelText = "El proximo nivel 1 sera: \n Un nivel de plataformas "
    }
    else if(this.nextLevel == "level2"){
        this.levelText = "El proximo nivel 2 sera: \n Un nivel de laberintos \n en el que tendras que abrir la puerta"
    }
    else if(this.nextLevel == "level3"){
        this.levelText = "El proximo nivel 3 sera: \n Un nivel de plataformas "
    }
    else if(this.nextLevel == "level4"){
        this.levelText = "El proximo nivel 4 sera: \n Un nivel de laberintos \n en el que tendras que explorar y buscar la puerta"
    }
    else if(this.nextLevel == "level5"){
        this.levelText = "El proximo nivel 5 sera: \n Un nivel de plataformas "
    }
    else if(this.nextLevel == "level6"){
        this.levelText = "El proximo nivel 6 sera: \n Un nivel de laberintos \n en el que no hay apenas luz "
    }

    this.levelTextShow = this.add.text(200, 100, this.levelText,  { font: "40px Arial", fill: '#000000', align: 'center'});
    this.levelTextShow.lineSpacing = 30;
    this.levelTextShow.depth = 1;

  }

  update(){
    if (this.inputKeys[0].isDown) { 
        this.scene.stop('prelevels')
        this.scene.start(this.nextLevel);
      }
  }

  
}