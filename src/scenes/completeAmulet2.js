export default class CompleteAmulet2 extends Phaser.Scene {
    constructor() {
      super({ key: 'completeAmulet2' });
    }
  
    preload() {
        this.load.image('amulet2', 'assets/sprites/amulet2.png');
    }

    init(data) {
        this.keyData = data._sceneKey;
    }
    
    create() {
        this.amuletFinal2 = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'amulet2');
        this.amuletFinal2.setScale(1.5);
        let _this = this;
        this.tweens.add({
            targets: this.amuletFinal2,
            scaleX: 2,
            scaleY: 2,
            ease: 'Sine.easeInOut',
            duration: 2000,
            completeDelay: 500,
            repeat: 0,
            yoyo: false,
            onComplete: function () {
                _this.endGame();
            }
        });
    }

    endGame() {
        //this.music.stop();
        this.scene.stop(this.scene.key);
        this.scene.launch('congratulations', {_sceneKey: this.keyData});
    }
}