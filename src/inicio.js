export default class Boot extends Phaser.Scene {
    /**
     * Constructor de la escena
     */
    constructor() {
      super({ key: 'inicio' });
    }

    create() {

      var buttonelement = [];
      buttonelement.push(this.add.graphics(0, 0));
      buttonelement.push(this.add.text(0, 0, text, textstyle));
      buttonelement[0].beginFill(color, 1);
      buttonelement[0].drawRoundedRect(x,y,width,height);
      buttonelement[0].endFill();

      //button = this.add.button(game.world.centerX - 95, 400, 'button', actionOnClick, this, 2, 1, 0);

      buttonelement.onInputOver.add(over, this);
      buttonelement.onInputOut.add(out, this);
      buttonelement.onInputUp.add(up, this);
    }

    over(){
      
    }

    out(){

    }

    up(){

    }
}  