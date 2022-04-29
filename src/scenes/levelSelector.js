export default class LevelSelector extends Phaser.Scene {
    /**
     * Constructor de la escena
     */
    constructor() {
      super({ key: 'levelSelector' });
    }

    preload(){
        this.load.image('lvlSelBg', 'assets/backgrounds/lvlSelectorBg.jpg');
        this.load.setPath('assets/sprites/gui');        
        this.load.image('1', 'Number1.png');
        this.load.image('2', 'Number2.png');
        this.load.image('3', 'Number3.png');
        this.load.image('4', 'Number4.png');
        this.load.image('5', 'Number5.png');
        this.load.image('6', 'Number6.png');
        this.load.image('sound_on', 'button_sound_on.png');
        this.load.image('sound_off', 'button_sound_off.png');
   
        this.load.setPath('assets/sounds/');
        this.load.audio("lobbym","lobbymusic.mp3");
      
      }

    create(){

        this.inputKeys = [
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE),
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO),
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE),
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR),
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE),
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SIX)
        ];

        //musica
        this.lobbym = this.sound.add("lobbym");
        this.lobbym.loop = true;

        if(localStorage.getItem('music') == 'true')
          this.lobbym.play();

        this.levelThumbsGroup = this.physics.add.staticGroup();
        this.add.image(0,0, 'lvlSelBg').setOrigin(0);
        this.lvlSelBoard = this.add.graphics({x: 300, y: 100 }).fillRoundedRect(0, 0, 400, 300, 32).fillStyle(0xE2AB4B, 0.8);
        
        this.pageText = this.add.text(this.game.config.width/2, this.lvlSelBoard.y + 35, "Selecciona un nivel", {
            fontFamily: 'Franklin Gothic Medium, "Arial Narrow", Arial, sans-serif',
            fontSize: "22px",
            fill: "#ffffff",
            align: "center"
        });
        this.pageText.setOrigin(0.5);

        this.lvlSelBoard_x = this.lvlSelBoard.x + 50
        this.lvlSelBoard_y = this.lvlSelBoard.y + 80
        for(let i = 0; i < 2; i ++){
            for(let j = 0; j < 3; j ++){  
              let levelNumber = i*3 + j + 1;
              let levelThumb = this.add.image(j*100 + this.lvlSelBoard_x, i*100 + this.lvlSelBoard_y, levelNumber).setOrigin(0).setInteractive();
              levelThumb.on('pointerdown', () => {
                var level = "level" + levelNumber;
                this.lobbym.stop();
                this.scene.start('prelevels' ,{_sceneKey: level });
              });
              this.levelThumbsGroup.add(levelThumb);
            }
        }

        let texture = 'sound_on'
        if(localStorage.getItem('music') == 'false'){
          texture = 'sound_off';
        }
        this.sound_OnOff = this.add.image(965, 35, texture).setInteractive();
        
        this.sound_OnOff.on('pointerdown', () => {
          this.sound_OnOff.setScale(0.9);
        });
        this.sound_OnOff.on('pointerup', () => {
          this.sound_OnOff.setScale(1);
          if(localStorage.getItem('music') == 'true'){
            this.sound_OnOff.setTexture('sound_off');
            localStorage.setItem('music', 'false');
            this.lobbym.stop();
          }
          else {
            this.sound_OnOff.setTexture('sound_on');
            localStorage.setItem('music', 'true');
            this.lobbym.play();
          }
        });
    }

    update(){
      for(let i = 0; i < this.inputKeys.length; i++){
        if(this.inputKeys[i].isDown){
          let levelNum = i + 1
          let level = "level" + levelNum;
          this.lobbym.stop();
          this.scene.start('prelevels' ,{_sceneKey: level });
        }
      }
    }
}