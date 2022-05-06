export default class CompleteAmulet extends Phaser.Scene {
    constructor() {
      super({ key: 'completeAmulet' });
    }
  
    preload() {
        this.load.image('amulet', 'assets/sprites/amuletos/amulet.png');
        this.load.image('amulet2', 'assets/sprites/amuletos/amulet2.png');
        this.load.image('amulet3', 'assets/sprites/amuletos/amulet3.png');
    }

    init(data) {
        this.keyData = data._sceneKey;
        this.amuletKey = data._amuletKey;
    }
    
    create() {
        this.amuletFinal = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, this.amuletKey);
        this.amuletFinal.setScale(1.5);
        let _this = this;
        this.tweens.add({
            targets: this.amuletFinal,
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