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
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;

    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect((width / 2) - (320/2), (height / 2) - 30, 320, 30);

    var loadingText = this.make.text({
        x: width / 2,
        y: height / 2 - 50,
        text: 'Loading...',
        style: {
            font: '20px monospace',
            fill: '#ffffff'
        }
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 15,
      text: '0%',
      style: {
          font: '18px monospace',
          fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    var startText = this.make.text({
      x: width / 2,
      y: height / 2 - 15, 
      text: '',
      style: {
        font: '18px bungee',
        fill: '#ffffff'
      }
    });
    startText.setOrigin(0.5, 0.5);
    
    // Con setPath podemos establecer el prefijo que se añadirá a todos los load que aparecen a continuación
    this.load.setPath('assets/sprites/');
    this.load.image('platform', 'platform.png');
    this.load.image('base', 'base.png');
    this.load.image('star', 'star.png');
    this.load.atlas('player', 'ninjagirl.png', 'ninjagirl_atlas.json');

    this.load.on('progress', function (value) {
      console.log(value);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect((width / 2) - (320/2), (height / 2) - 30, 320 * value, 30);
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

        startText.setText('Haz click para empezar')
    });
  }

  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
   * nivel del juego
   */
  create() {
    this.input.on('pointerdown', function(){
      this.scene.start('inicio');
    }, this);
  }
}