/**
 * Escena para la precarga de los assets que se usarán en el juego.
 * Esta escena se puede mejorar añadiendo una imagen del juego y una 
 * barra de progreso de carga de los assets
 * @see {@link https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/} como ejemplo
 * sobre cómo hacer una barra de progreso.
 */
export default class Boot extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'boot' });
  }

  init(){
    
  }
  
  /**
   * Carga de los assets del juego
   */
  preload() {
    let progressBar = this.add.graphics();
    let progressBox = this.add.graphics();
    this.startBox = this.add.graphics();

    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;

    progressBox.fillStyle(0x222222, 0.8).fillRect((this.width / 2) - (320/2), (this.height / 2) - 30, 320, 30);

    let loadingText = this.make.text({
        x: this.width / 2,
        y: this.height / 2 - 50,
        text: 'Loading...',
        style: {
            font: '20px monospace',
            fill: '#ffffff'
        }
    });
    loadingText.setOrigin(0.5, 0.5);

    let percentText = this.make.text({
      x: this.width / 2,
      y: this.height / 2 - 15,
      text: '0%',
      style: {
          font: '18px monospace',
          fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    this.startText = this.make.text({
      x: this.width / 2,
      y: this.height - 75, 
      text: '',
      style: {
        font: '18px bungee',
        fill: '#ffffff'
      }
    });
    this.startText.setOrigin(0.5);
    
    // Con setPath podemos establecer el prefijo que se añadirá a todos los load que aparecen a continuación
    this.load.setPath('assets/sprites/');
    this.load.image('closeDoor','closeDoor.png');
    this.load.image('key', 'key.png')
    this.load.image("laser", "shoot_blue.png");
    this.load.image('lego_verde', 'lego_verde.png');
    this.load.image('openDoor','openDoor.png');
    
    this.load.setPath('assets/sprites/gui');
    this.load.image("exit", "grey_crossGrey.png");

    this.load.setPath('assets/backgrounds/');
    this.load.image("castillo_background", "castillo.png");

    this.load.setPath('assets/sprites/enemigos/');
    this.load.atlas('calabaza', 'calabaza/calabaza.png', 'calabaza/calabaza.json');

    this.load.image('ghost','fantasma/ghost.png');
    this.load.image('ghost2','fantasma/ghost2.png');
    this.load.image('ghost3','fantasma/ghost3.png');
    this.load.image('ghost4','fantasma/ghost4.png');
    this.load.image('monstruoVolador','monstruo_volador/monstruoVolador.png');

    
    this.load.setPath('assets/sprites/nave/');
    this.load.image('spaceshipUp', 'spaceshipUp.png');
    this.load.image('spaceshipRight', 'spaceshipRight.png');
    
    this.load.setPath('assets/sprites/player/');
    this.load.spritesheet('player_attack', 'attack_spritesheet.png', {frameWidth: 105, frameHeight: 113});
    this.load.spritesheet('player_dead', 'dead_spritesheet.png', {frameWidth: 116, frameHeight: 120});
    this.load.spritesheet('player_idle', 'idle_spritesheet.png', {frameWidth: 58, frameHeight: 100});
    this.load.spritesheet('player_jump', 'jump_spritesheet.png', {frameWidth: 80, frameHeight: 109});
    this.load.spritesheet('player_jump_attack', 'jump_attack_spritesheet.png', {frameWidth: 99, frameHeight: 117});
    this.load.spritesheet('player_run', 'run_spritesheet.png', {frameWidth: 75, frameHeight: 104});
    this.load.spritesheet('player_slide', 'slide_spritesheet.png', {frameWidth: 79, frameHeight: 80});


    this.load.on('progress', function (value) {
      console.log(value);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1)
        .fillRect((this.width / 2) - (320/2), (this.height / 2) - 30, 320 * value, 30);
      percentText.setText(parseInt(value * 100) + '%');
    });
              
    this.load.on('fileprogress', function (file) {
        console.log(file.src);
    });

    this.load.on('complete', function () {
      console.log('complete');

      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();

    });
  }


   
  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
   * nivel del juego
   */
  create() {
    //Para poder mutear el juego en todas las escenas
    localStorage.setItem('music', 'true');

    this.add.image(0, 0, 'castillo_background').setOrigin(0).setDepth(0);
    this.startBox.fillStyle(0x222222, 0.8).fillRoundedRect(this.width / 2 - (280/2), this.height - 100, 280, 50, 10).setDepth(1);
    this.startText.setText('Pulsa espacio para empezar').setDepth(1);
    
    this.tweens.add({
      targets: [this.startText],
      alpha: 0,
      ease: 'Cubic.easeIn',
      duration: 500,
      repeat: -1,
      yoyo: true
    });

    this.input.on('pointerdown', function(){
      this.scene.start('levelSelector');
    }, this);

    this.inputKeys = [
			this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    ];

  }

  update(){
    if (this.inputKeys[0].isDown) {
      this.scene.start('levelSelector');
    }
  }
}
