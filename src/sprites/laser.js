export default class Laser extends Phaser.GameObjects.Sprite {
    /**
     * Constructor del laser
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene, x, y) {
        super(scene, x, y, 'laser');

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setActive(false).setVisible(false);
        this.body.setCircle(15, 5, 0);
    }

    shoot(x, y, dir) {
        if(dir != ""){
            this.body.reset(x, y-20);

            this.setActive(true).setVisible(true);
            this.speed = 500;
        
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
    }

    onCollision(){
        this.setActive(false).setVisible(false);
    }

    preUpdate(t,dt) {
        super.preUpdate(t,dt);
        this.body.collideWorldBounds=true;
        this.body.onWorldBounds=true;
    
        this.scene.physics.world.on('worldbounds', () => {
            this.onCollision();
        });
    }
}