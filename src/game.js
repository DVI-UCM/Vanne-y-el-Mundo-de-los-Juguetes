import Boot from './scenes/boot.js';
import End from './scenes/end.js';
import Inicio from './scenes/inicio.js';
import Lobby from './scenes/lobby.js';
import Level1 from './scenes/level1.js';
import Level2 from './scenes/level2.js';
import Level3 from './scenes/level3coches.js'
import Level4 from './scenes/level4casamu.js'
import Congratulations from './scenes/congratulations.js';
import GameOver from './scenes/gameover.js';




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
    scene: [Boot, Inicio, Lobby, Level1, Level2, Level3, Level4, End, Congratulations,GameOver],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 700 },
            debug: true
        }
    }
};

new Phaser.Game(config);
