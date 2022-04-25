export default class FullScreenButton extends Phaser.GameObjects.Sprite {
    constructor(scene, x , y) {
        super(scene, x, y, 'fullScreen');

        this.scene.add.existing(this);
        this.setInteractive();
        this.setDepth(1);

        this.on('pointerdown', function (ptr) { this.setScale(0.9, 0.9) } );
        this.on('pointerup', () => {
        if (this.scene.scale.isFullscreen){
            this.setTexture("fullScreen");
            this.scene.scale.stopFullscreen();
            this.scene.scale.scaleMode = Phaser.Scale.FIT;
            this.scene.scale.autoCenter = Phaser.Scale.CENTER_BOTH;
        }
        else{
            this.setTexture("fullScreen2");
            this.scene.scale.startFullscreen();
            this.scene.scale.scaleMode = Phaser.Scale.NONE;
            this.scene.scale.autoCenter = Phaser.Scale.CENTER_HORIZONTALLY;
        }
    });
    }
    position(x,y){
        this.x = x;
        this.y = y;
    }
}