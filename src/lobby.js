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
    this.load.setPath('assets/sprites'); 
    this.load.image("background", "tilemap_nivel1_background.png");
    this.load.image("brick", "brickSpecial08.png");
    this.load.image('button-1', 'blue_button02.png');
    this.load.image('button-2', 'blue_button03.png');

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
    this.graphics_levels;
    this.levelThumbsGroup = this.physics.add.staticGroup();
    this.is_exit = false;
    this.graphics_exit;
    this.exitInfo;
    this.okBtn;
    this.okText;
    this.cancelBtn;
    this.cancelText;

    this.player = new Player(this, 500, 500);

    this.btnLevels = this.physics.add.staticSprite(270, 295, 'brick');
    this.physics.add.collider(this.btnLevels, this.player, () => {
      if(!this.is_levelSelector){
        this.showLevelSelector();
      }
      else{
        this.destroyLevelSelector();
      }
    });

    this.btnExit = this.physics.add.staticSprite(background.displayWidth - 160, 330, 'brick');
    this.physics.add.collider(this.btnExit, this.player, () => {
      /*let tween = this.tweens.add({
        targets: this.btnExit,
        y: 10,
        duration: 500,
        yoyo: true,
        ease: 'Cubic.easeOut',
        repeat: 0
      });*/
      if(!this.is_exit){
        this.showExitNotice();
      }
      else{
        this.destroyExitNotice();
      }
    });


    this.physics.world.setBounds(0, 0, background.displayWidth, background.displayHeight);
    this.cameras.main.setBounds(0, 0, background.displayWidth, background.displayHeight);
    this.cameras.main.startFollow(this.player);

  }

  showLevelSelector() {
    this.graphics_levels = this.add.graphics().fillRoundedRect(100,100, 300, 300, 32).fillStyle(0xE2AB4B, 0.5);

    for(let i = 0; i < 3; i ++){
      for(let j = 0; j < 3; j ++){  
        let levelNumber = i*3 + j + 1;
        let levelThumb = this.addButton(j*100 + 100, i*100 + 100, levelNumber, () => {
          var level = "level" + levelNumber;
          this.scene.start(level);
        });
        this.levelThumbsGroup.add(levelThumb);
      }
    }
    this.is_levelSelector = true;
  }

  destroyLevelSelector(){
    this.levelThumbsGroup.clear(true);
    this.graphics_levels.clear();
    this.is_levelSelector = false;
  }

  showExitNotice(){
    this.graphics_exit = this.add.graphics({x: this.btnExit.x - 300, y: this.btnExit.y - 200}).fillRoundedRect(0, 0, 300, 200, 32).fillStyle(0xE2AB4B, 0.5);
    this.okBtn = this.add.sprite(this.graphics_exit.x + 85, this.graphics_exit.y + 150, 'button-1').setInteractive();
    this.okBtn.setScale(.65);
    this.cancelBtn = this.add.sprite(this.graphics_exit.x + 215, this.graphics_exit.y + 150, 'button-1',).setInteractive();
    this.cancelBtn.setScale(.65);

    this.okBtn.on('pointerdown', () => {
      this.okBtn.setTexture('button-2');
    });
    this.okBtn.on('pointerup', () => {
      this.okBtn.setTexture('button-1');
      this.scene.start("inicio");
    });
    this.cancelBtn.on('pointerdown', () => {
      this.cancelBtn.setTexture('button-2');
    });
    this.cancelBtn.on('pointerup', () => {
      this.cancelBtn.setTexture('button-1');
      this.destroyExitNotice();
    });

    this.exitInfo = this.add.text(this.graphics_exit.x + 50, this.graphics_exit.y + 40, "¿Seguro que quieres salir?", {font: "16px Arial", fill: "#ffffff"}).setOrigin(0);
    this.okText = this.add.text(this.okBtn.x, this.okBtn.y, "Salir", {font: "16px Arial", fill: "#ffffff"}).setOrigin();
    this.cancelText = this.add.text(this.cancelBtn.x, this.cancelBtn.y, "Cancelar", {font: "16px Arial", fill: "#ffffff"}).setOrigin();
    this.is_exit = true;
  }

  destroyExitNotice(){
    this.graphics_exit.clear();
    this.exitInfo.destroy();
    this.okBtn.destroy();
    this.okText.destroy();
    this.cancelBtn.destroy();
    this.cancelText.destroy();
    this.is_exit = false;
  } 

  update(){
    
  }

}