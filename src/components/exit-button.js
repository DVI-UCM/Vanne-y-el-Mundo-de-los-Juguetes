export default class ExitButton extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'exit');
        
        this.scene.add.existing(this);
        this.anchor;
        this.setInteractive();
        this.setDepth(1);

        this.on('pointerdown', function (ptr) { this.setScale(0.9, 0.9) } );
        this.on('pointerup', () => {
            this.scene.scene.start("lobby");
        });
    }
    position(x,y){
        this.x = x;
        this.y = y;
    }
}