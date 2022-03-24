export default class Laser extends Phaser.GameObjects.Sprite {
    /**
     * Constructor del laser
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene, x, y) {
        super(scene, x, y, 'laser');

        //this.body.setCollideWorldBounds();

    }

    shoot(x, y, dir) {
        if(dir != ""){
            this.body.reset(x, y);

            this.setActive(true);
            this.setVisible(true);
            this.speed = 500;
            this.scene.laserCounter--;
        }

        if(dir == "down"){
            this.body.setVelocityY(this.speed);
        }
        else if(dir == "up"){
            this.body.setVelocityY(-this.speed);
        }
        else if(dir == "left"){
            this.body.setVelocityX(-this.speed);
        }
        else if(dir == "right"){
            this.body.setVelocityX(this.speed);
        }

    }

    collide(){
        this.setActive(false);
		this.setVisible(false);
        this.scene.laserCounter++;
    }

    preUpdate(t,dt) {
        super.preUpdate(t,dt);
        this.body.collideWorldBounds=true;
        this.body.onWorldBounds=true;
    
        this.scene.physics.world.on('worldbounds', () => {
            this.collide();
        });
    }
}