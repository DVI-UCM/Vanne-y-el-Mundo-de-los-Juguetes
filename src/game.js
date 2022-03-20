import Boot from './boot.js';
import End from './end.js';
import Inicio from './inicio.js';
import Lobby from './lobby.js';
import Level1 from './level1.js';
import Level2 from './level2.js';
import Congratulations from './congratulations.js';
import GameOver from './gameover.js';


/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 500,
    backgroundColor: "#4488aa",
    scale: {
        // mode: Phaser.Scale.FIT,  
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    pixelArt: true,
    scene: [Boot, Inicio, Lobby, Level1, Level2, End, Congratulations,GameOver],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 700 },
            debug: true
        }
    }
};

new Phaser.Game(config);
