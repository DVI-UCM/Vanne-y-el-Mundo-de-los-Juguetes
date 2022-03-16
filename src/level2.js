import Wall from './wall.js';
import Player from './playerAerial.js';


/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class Level2 extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'level2' });
  }


  init(){
  }

  preload(){
    this.load.image("blanco", "assets/sprites/white.jpg");

  }
  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() {
    let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'blanco')
    let scaleX = this.cameras.main.width / image.width
    let scaleY = this.cameras.main.height / image.height
    let scale = Math.max(scaleX, scaleY)
    image.setScale(scale).setScrollFactor(0)  

    this.stars = 3;
    //this.bases = this.add.group();
    this.player = new Player(this, 0, 420);
    this.player.body.setAllowGravity(false);
    //Crear el marco del laberinto
    this.marco();
    this.nivel();
    //this.spawn();

  }

  update(){

  }

  /**
   * Genera una estrella en una de las bases del escenario
   * @param {Array<Base>} from Lista de bases sobre las que se puede crear una estrella
   * Si es null, entonces se crea aleatoriamente sobre cualquiera de las bases existentes
   */
  spawn(from = null) {
    Phaser.Math.RND.pick(from || this.bases.children.entries).spawn();
  }

  /**
   * Método que se ejecuta al coger una estrella. Se pasa la base
   * sobre la que estaba la estrella cogida para evitar repeticiones
   * @param {Base} base La base sobre la que estaba la estrella que se ha cogido
   */
  starPickt (base) {
    this.player.point();
      if (this.player.score == this.stars && (this.player.x == 980 && this.player.y ==60)) {
        this.scene.start('end');
      }
      else {
        let s = this.bases.children.entries;
        this.spawn(s.filter(o => o !== base));

      }
  }

  calabazaChoca (base) {
    this.player.muere();
  }

  marco(){
    for(let i = 0; i < 9;i++){
      new Wall(this, this.player, 20, i*40+20);
    }
    for(let i = 0; i < 9;i++){
      new Wall(this, this.player, 980, i*40+160);
    }
    for(let i = 0; i < 25;i++){
      new Wall(this, this.player, i*40+60, 20);
    }
    for(let i = 0; i < 25;i++){
      new Wall(this, this.player, i*40+20, 480);
    } 
  }

  nivel(){
    new Wall(this, this.player, 140, 160);
    new Wall(this, this.player, 140, 180);
    new Wall(this, this.player, 140, 320);
    new Wall(this, this.player, 140, 360);
    new Wall(this, this.player, 140, 400);
    new Wall(this, this.player, 140, 440);

    new Wall(this, this.player, 180, 160);
    new Wall(this, this.player, 180, 180);

    new Wall(this, this.player, 220, 160);
    new Wall(this, this.player, 220, 180);

    new Wall(this, this.player, 260, 160);
    new Wall(this, this.player, 260, 160);
    new Wall(this, this.player, 260, 200);
    new Wall(this, this.player, 260, 240);
    new Wall(this, this.player, 260, 280);
    new Wall(this, this.player, 260, 320);
    new Wall(this, this.player, 260, 340);

    new Wall(this, this.player, 300, 260);

    new Wall(this, this.player, 340, 260);

    new Wall(this, this.player, 380, 60);
    new Wall(this, this.player, 380, 100);
    new Wall(this, this.player, 380, 120);
    new Wall(this, this.player, 380, 260);
    new Wall(this, this.player, 380, 400);
    new Wall(this, this.player, 380, 440);

    new Wall(this, this.player, 420, 260);

    new Wall(this, this.player, 460, 260);

    new Wall(this, this.player, 500, 160);
    new Wall(this, this.player, 500, 180);
    new Wall(this, this.player, 500, 220);
    new Wall(this, this.player, 500, 260);
    new Wall(this, this.player, 500, 300);
    new Wall(this, this.player, 500, 340);
    new Wall(this, this.player, 500, 360);
    new Wall(this, this.player, 500, 400);
    new Wall(this, this.player, 500, 440);

    new Wall(this, this.player, 620, 40);
    new Wall(this, this.player, 620, 80);
    new Wall(this, this.player, 620, 120);
    new Wall(this, this.player, 620, 160);
    new Wall(this, this.player, 620, 180);
    new Wall(this, this.player, 620, 220);
    new Wall(this, this.player, 620, 260);
    new Wall(this, this.player, 620, 300);
    new Wall(this, this.player, 620, 340);

    new Wall(this, this.player, 660, 160);

    new Wall(this, this.player, 700, 160);

    new Wall(this, this.player, 740, 160);
    new Wall(this, this.player, 740, 200);
    new Wall(this, this.player, 740, 240);
    new Wall(this, this.player, 740, 380);
    new Wall(this, this.player, 740, 400);
    new Wall(this, this.player, 740, 440);

    new Wall(this, this.player, 860, 160);
    new Wall(this, this.player, 860, 180);
    new Wall(this, this.player, 860, 220);
    new Wall(this, this.player, 860, 260);
    new Wall(this, this.player, 860, 300);
    new Wall(this, this.player, 860, 340);



    new Wall(this, this.player, 900, 160);

    new Wall(this, this.player, 940, 160);


  }
  
}