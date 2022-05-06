import Boot from './scenes/boot.js';
import End from './scenes/end.js';
import LevelSelector from './scenes/levelSelector.js';
import Level1 from './scenes/level1.js';
import Level2 from './scenes/level2.js';
import Level3 from './scenes/level3coches.js'
import Level4 from './scenes/level4espacio.js'
import Level5 from './scenes/level5casamu.js'
import Level6 from './scenes/level6desvan.js'
import Final from './scenes/final.js'
import Congratulations from './scenes/congratulations.js';
import GameOver from './scenes/gameover.js';
import PreLevel from './scenes/prelevels.js'
import CompleteAmulet from './scenes/completeAmulet.js';

/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let config = {
    type: Phaser.AUTO,

    parent:'parent',
    
    width: 1000,
    height: 500,
    backgroundColor: "#253529",
    scale: {
        // mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    pixelArt: true,
    scene: [Boot, LevelSelector, Level1, Level2, Level3, Level4, Level5, Level6, PreLevel, End, Final, Congratulations, GameOver, CompleteAmulet],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            debug: false
        }
    }
};

new Phaser.Game(config);
