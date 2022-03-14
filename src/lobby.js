import Player from './player.js';

/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class Lobby extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'lobby' });

    Phaser.Scene.prototype.addButton = function(x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame)
        {
            // add a button
            var btn = this.add.sprite(x, y, key/*, outFrame*/).setOrigin(0,0).setInteractive();
            //btn.on('pointerover', function (ptr, x, y) { this.setFrame(overFrame) } );
            //btn.on('pointerout',  function (ptr)       { this.setFrame(outFrame) } );
            btn.on('pointerdown', function (ptr)       { this.setScale(0.9, 0.9) } );
            btn.on('pointerup', callback.bind(callbackContext));

            return btn;
        };
  }


  init(){

  }

  preload(){
    this.load.image("background", "assets/sprites/tilemap_nivel1_background.png");
    this.load.image("brick", "assets/sprites/brickSpecial08.png");

    this.load.setPath('assets/sprites/gui');        
        this.load.image('1', 'Number1.png');
        this.load.image('2', 'Number2.png');
        this.load.image('3', 'Number3.png');
        this.load.image('4', 'Number4.png');
        this.load.image('5', 'Number5.png');
        this.load.image('6', 'Number6.png');
        this.load.image('7', 'Number7.png');
        this.load.image('8', 'Number8.png');
        this.load.image('9', 'Number9.png');

  }
  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() {
    let background = this.add.tileSprite(0, 0, 0, 0, "background").setOrigin(0,0);
    background.displayHeight = this.sys.game.config.height;
    background.scaleX = background.scaleY; 

    this.is_levelSelector = false;
    this.graphics;
    this.levelThumbsGroup = this.add.group();;

    this.player = new Player(this, 500, 500);
    this.btnLevels = this.physics.add.staticSprite(270, 295, 'brick');

    
    this.physics.world.setBounds(0, 0, background.displayWidth, background.displayHeight);
    this.cameras.main.setBounds(0, 0, background.displayWidth, background.displayHeight);
    this.cameras.main.startFollow(this.player);

  }

  chooseLevel(btn) {
    //var level = "level" + toString(btn.levelNumber);
    this.scene.start("level2");
  }

  showLevelSelector() {
    this.graphics = this.add.graphics().fillRoundedRect(100,100, 300, 300, 32).fillStyle(0xE2AB4B, 0.5);

    for(let i = 0; i < 3; i ++){
        for(let j = 0; j < 3; j ++){  
            let levelNumber = i*3 + j + 1;
            // adding the thumbnail, as a button which will call thumbClicked function if clicked   		
            let levelThumb = this.addButton(j*100 + 100, i*100 + 100, levelNumber, this.chooseLevel, this);
            levelThumb.levelNumber = levelNumber;
            this.levelThumbsGroup.add(levelThumb);
        }
    }
    this.is_levelSelector = true;
  }

  destroyLevelSelector(){
    this.levelThumbsGroup.clear(true);
    this.graphics.clear();
    this.is_levelSelector = false;
  }

  update(){
    this.physics.collide(this.btnLevels, this.player, () => {
      if(!this.is_levelSelector){
        this.showLevelSelector();
      }
      else{
        this.destroyLevelSelector();
      }
    });
  }
}