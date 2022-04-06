export default class FullScreenButton extends Phaser.GameObjects.Sprite {
    constructor(scene, x , y) {
        super(scene, x, y, 'fullScreen');

        this.scene.add.existing(this);
        this.setInteractive();

        this.on('pointerdown', function (ptr) { this.setScale(0.9, 0.9) } );
        this.on('pointerup', () => {
        if (this.scene.scale.isFullscreen){
            this.setTexture("fullScreen");
            this.scene.scale.stopFullscreen();
        }
        else{
            this.setTexture("fullScreen2");
            this.scene.scale.startFullscreen();
        }
    });
    }
}