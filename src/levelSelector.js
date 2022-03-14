export default class LevelSelector extends Phaser.Scene {
  
    /**
     * Constructor de la escena
     */
    constructor() {
        super({ key: 'levelSelector' });

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
        this.load.image('play', 'Icon_play.png');
    }

    /**
     * Creación de los elementos de la escena principal de juego
     */
    create() {
        var levelThumbsGroup = this.add.group();
        for(var i = 0; i < 3; i ++){
            for(var j = 0; j < 3; j ++){  
               var levelNumber = i*3 + j + 1;
               // adding the thumbnail, as a button which will call thumbClicked function if clicked   		
               var levelThumb = this.addButton(j*100 + 100, i*100 + 100, levelNumber, this.chooseLevel, this);
               levelThumb.levelNumber = levelNumber;
               levelThumbsGroup.add(levelThumb);
           }
       }
    }

    chooseLevel(btn) {
        //var level = "level" + toString(btn.levelNumber);
        this.scene.start("level2");
    }

    update() {

    }
}
