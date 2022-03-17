import Wall from './wall.js';
import Player from './playerAerial.js';
import Ghost from './ghost.js';



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
    this.load.image("lego", "assets/sprites/fondoPrueba.png");

  }
  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() {
    let background = this.add.tileSprite(0, 0, 0, 0, "lego").setOrigin(0,0);
    background.displayHeight = this.sys.game.config.height;
    background.scaleX = background.scaleY; 
    background.setScrollFactor(0);

    let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'lego');
    let scaleX = this.cameras.main.width / image.width;
    let scaleY = this.cameras.main.height / image.height;
    let scale = Math.max(scaleX, scaleY);
    image.setScale(scale).setScrollFactor(0);
    
    let exit = this.add.image(this.cameras.main.width - 20, 20, "exit").setInteractive();
    exit.setDepth(1);
    exit.on('pointerdown', function (ptr) { this.setScale(0.9, 0.9) } );
    exit.on('pointerup', () => {
      this.scene.start("lobby");
    });

    let fullScreen = this.add.image(this.cameras.main.width - 50, 20, "fullScreen").setInteractive();
    fullScreen.setDepth(1);
    fullScreen.on('pointerdown', () => { this.setScale(0.9, 0.9) } );
    fullScreen.on('pointerup', () => {
      if (this.scale.isFullscreen){
        fullScreen.setTexture("fullScreen");
        this.scale.stopFullscreen();
      }
      else{
        fullScreen.setTexture("fullScreen2");
          this.scale.startFullscreen();
      }
    });

    this.stars = 3;
    this.walls = this.physics.add.staticGroup();
    this.player = new Player(this, 0, 412);
    this.ghost = new Ghost(this, 800, 420);

    this.player.body.setAllowGravity(false);
    this.ghost.body.setAllowGravity(false);

    //Crear el marco del laberinto
    this.marco();
    this.nivel();

    this.physics.add.collider(this.walls, this.player);
    this.physics.add.collider(this.walls, this.ghost, () => {
      this.ghost.onCollision();
    });
    this.physics.add.collider(this.player, this.ghost);

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

  marco(){
    for(let i = 0; i < 9;i++){
      this.walls.add(new Wall(this, this.player,this.ghost, 20, i*40+20));
    }
    for(let i = 0; i < 9;i++){
      this.walls.add(new Wall(this, this.player,this.ghost, 980, i*40+160));
    }
    for(let i = 0; i < 25;i++){
      this.walls.add(new Wall(this, this.player,this.ghost, i*40+60, 20));
    }
    for(let i = 0; i < 25;i++){
      this.walls.add(new Wall(this, this.player,this.ghost, i*40+20, 480));
    } 
  }

  nivel(){
    this.walls.add(new Wall(this, this.player,this.ghost, 140, 160));
    this.walls.add(new Wall(this, this.player,this.ghost, 140, 180));
    this.walls.add(new Wall(this, this.player,this.ghost, 140, 320));
    this.walls.add(new Wall(this, this.player,this.ghost, 140, 360));
    this.walls.add(new Wall(this, this.player,this.ghost, 140, 400));
    this.walls.add(new Wall(this, this.player,this.ghost, 140, 440));

    this.walls.add(new Wall(this, this.player,this.ghost, 180, 160));
    this.walls.add(new Wall(this, this.player,this.ghost, 180, 180));

    this.walls.add(new Wall(this, this.player,this.ghost, 220, 160));
    this.walls.add(new Wall(this, this.player,this.ghost, 220, 180));

    this.walls.add(new Wall(this, this.player,this.ghost, 260, 160));
    this.walls.add(new Wall(this, this.player,this.ghost, 260, 160));
    this.walls.add(new Wall(this, this.player,this.ghost, 260, 200));
    this.walls.add(new Wall(this, this.player,this.ghost, 260, 240));
    this.walls.add(new Wall(this, this.player,this.ghost, 260, 280));
    this.walls.add(new Wall(this, this.player,this.ghost, 260, 320));
    this.walls.add(new Wall(this, this.player,this.ghost, 260, 340));

    this.walls.add(new Wall(this, this.player,this.ghost, 300, 260));

    this.walls.add(new Wall(this, this.player,this.ghost, 340, 260));

    this.walls.add(new Wall(this, this.player,this.ghost, 380, 60));
    this.walls.add(new Wall(this, this.player,this.ghost, 380, 100));
    this.walls.add(new Wall(this, this.player,this.ghost, 380, 120));
    this.walls.add(new Wall(this, this.player,this.ghost, 380, 260));
    this.walls.add(new Wall(this, this.player,this.ghost, 380, 400));
    this.walls.add(new Wall(this, this.player,this.ghost, 380, 440));

    this.walls.add(new Wall(this, this.player,this.ghost, 420, 260));

    this.walls.add(new Wall(this, this.player,this.ghost, 460, 260));

    this.walls.add(new Wall(this, this.player,this.ghost, 500, 160));
    this.walls.add(new Wall(this, this.player,this.ghost, 500, 180));
    this.walls.add(new Wall(this, this.player,this.ghost, 500, 220));
    this.walls.add(new Wall(this, this.player,this.ghost, 500, 260));
    this.walls.add(new Wall(this, this.player,this.ghost, 500, 300));
    this.walls.add(new Wall(this, this.player,this.ghost, 500, 340));
    this.walls.add(new Wall(this, this.player,this.ghost, 500, 360));
    this.walls.add(new Wall(this, this.player,this.ghost, 500, 400));
    this.walls.add(new Wall(this, this.player,this.ghost, 500, 440));

    this.walls.add(new Wall(this, this.player,this.ghost, 620, 40));
    this.walls.add(new Wall(this, this.player,this.ghost, 620, 80));
    this.walls.add(new Wall(this, this.player,this.ghost, 620, 120));
    this.walls.add(new Wall(this, this.player,this.ghost, 620, 160));
    this.walls.add(new Wall(this, this.player,this.ghost, 620, 180));
    this.walls.add(new Wall(this, this.player,this.ghost, 620, 220));
    this.walls.add(new Wall(this, this.player,this.ghost, 620, 260));
    this.walls.add(new Wall(this, this.player,this.ghost, 620, 300));
    this.walls.add(new Wall(this, this.player,this.ghost, 620, 340));

    this.walls.add(new Wall(this, this.player,this.ghost, 660, 160));

    this.walls.add(new Wall(this, this.player,this.ghost, 700, 160));

    this.walls.add(new Wall(this, this.player,this.ghost, 740, 160));
    this.walls.add(new Wall(this, this.player,this.ghost, 740, 200));
    this.walls.add(new Wall(this, this.player,this.ghost, 740, 240));
    this.walls.add(new Wall(this, this.player,this.ghost, 740, 380));
    this.walls.add(new Wall(this, this.player,this.ghost, 740, 400));
    this.walls.add(new Wall(this, this.player,this.ghost, 740, 440));

    this.walls.add(new Wall(this, this.player,this.ghost, 860, 160));
    this.walls.add(new Wall(this, this.player,this.ghost, 860, 180));
    this.walls.add(new Wall(this, this.player,this.ghost, 860, 220));
    this.walls.add(new Wall(this, this.player,this.ghost, 860, 260));
    this.walls.add(new Wall(this, this.player,this.ghost, 860, 300));
    this.walls.add(new Wall(this, this.player,this.ghost, 860, 340));

    this.walls.add(new Wall(this, this.player,this.ghost, 900, 160));

    this.walls.add(new Wall(this, this.player,this.ghost, 940, 160));
  }
  
}