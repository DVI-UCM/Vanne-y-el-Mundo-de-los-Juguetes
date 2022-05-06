# Vanne y el mundo de los juguetes.
### Creado por el grupo **Los peluchitos** en el que estamos: Álvaro Plaza, David Lago, Lluc Bonet y Marcos de la Fuente

![Captura de pantalla del juego](https://github.com/DVI-UCM/Vanne-y-el-mundo-de-los-Juguetes/blob/509fa2050674bc7cc41bab48bfac276ccff8606b/captura%20de%20pantalla.png)

### [Enlace a la página web del juego](https://dvi-ucm.github.io/Vanne-y-el-mundo-de-los-Juguetes/)

## GDD

### Datos generales

Género: Acción, aventuras, puzzle


PEGI: +7


### Sinopsis: 
Juego de plataformas y puzzles. El personaje principal, Vanne, deberá avanzar en los diferentes escenarios, junto a su compañero Xinn, enfrentándose a todo tipo de enemigos para conseguir juntar los fragmentos de los 3 amuletos que le fueron robados y así poder volver a su tamaño original. Xinn por su parte, buscará las llaves de las puertas. Cuando consiga abrir la puerta final y Vanne reúna todos los amuletos, Vanne podrá volver al mundo real.


### Lore: 
Vanne y el conejito de peluche Billy eran dos amigos inseparables. Con la ayuda de 3 amuletos se adentraban en el Mundo de los Juguetes, donde vivían numerosas aventuras.

Por su 7º cumpleaños, los padres de Vanne le regalaron un nuevo peluche, Xinn, con el que pronto se convertiría en su nuevo mejor amigo. En un ataque de celos, Billy maldijo a Vanne, atrapándola en el Mundo de los Juguetes y rompiendo todos los amuletos para que nunca pudiera salir de él. 

Ahora Vanne y Xinn buscan desesperadamente la manera de volver al mundo real.  Vanne busca las piezas rotas de 3 amuletos que se encuentran esparcidos por diferentes mundos y Xinn, con su nave espacial surca diferentes laberintos de Lego en busca de llaves para que, una vez encontrados y restaurados todos los amuletos, abra la puerta al mundo real y Vanne pueda regresar a él.

### Core Loop de un nivel:
El jugador deberá completar los niveles para progresar a través de la narrativa.
 - Prepare: Elegir un nivel.
 - Challenge: El propio nivel. Sortear obstáculos y eliminar enemigos. Conseguir abrir puertas o reunir las piezas de un amuleto roto.


###  Mecánicas y dinámicas:

Nos encontramos con dos tipos de niveles, unos protagonizados por Vanne y otros por Xinn dentro de su nave espacial.

Los que protagoniza Vanne son niveles de plataformeo donde el jugador podrá correr, saltar, atacar y deslizarse para recoger todos los fragmentos de los amuletos, esquivando trampas y matando enemigos. 

Por otra parte, los niveles que protagoniza Xinn, son niveles más bien de rompecabezas. El jugador podrá moverse arriba, abajo, derecha e izquierda para moverse por el laberinto y también podrá disparar bolas de luz para atacar a los enemigos. El jugador deberá encontrar la salida de un laberinto, después de matar a todos los enemigos lo cual hará aparecer la llave que abre la puerta de salida.

Ambos jugadores, así como todos los enemigos, dispondrán de una sola vida. Así encontramos un equilibrio entre la dificultad que supone superar un nivel sin errores y la sencillez al poder eliminar enemigos en un solo golpe.


### Controles
El jugador deberá usar el teclado y en algunos puntos del juego podrá usar el ratón.

En la pantalla de selección de niveles, el usuario podrá usar los números del teclado para seleccionar un nivel, también los podrá seleccionar pinchando con el ratón.

Controles en los niveles de Vanne:
- Flechas derecha e izquierda: para desplazarse lateralmente.
- Flecha arriba: para saltar hacia arriba.
- Flecha arriba + flecha derecha/izquierda: salto con desplazamiento lateral.
- Flecha abajo + flecha derecha/izquierda: para deslizarse lateralmente.
- Espacio: atacar.

Controles en los niveles de Xinn:
- Flechas derecha e izquierda: para desplazar la nave lateralmente.
- Flechas arriba y abajo: para desplazar la nave verticalmente.
- Espacio + flechas: para atacar disparando en la dirección de la flecha que pulses.


### Cámara:

Ambos tipos de niveles son en 2 dimensiones. 
Vanne se desplaza lateralmente en perspectiva plana.

A Xinn, en cambio, lo veremos desde una vista aérea.

Empleo de parallax en los niveles de Vanne para dar al usuario una mejor sensación de profundidad, perspectiva y movimiento.


### Espacios:
Cada nivel tendrá un background diferente según el marco simbólico del nivel.
Toda ambientación sigue la  línea del mundo de los juguetes, es decir, como un espacio infantil.
Los mundos, a los que hace referencia los backgrounds, son: el mundo piruleta, de hielo, de carreras, de lego, del espacio y de ciudad.

### Reglas:
El usuario no puede sobrepasar el límites laterales del mapa.
Los niveles se continúan tras finalizar cualquiera.
El usuario puede elegir el orden, aunque se recomienda seguir el orden numérico.
En los niveles de Vanne esta debe reunir todas las piezas del amuleto para poder continuar.
En los niveles de Xinn este debe matar a todos los enemigos, conseguir la llave y salir por la puerta para poder continuar.


### Recursos del jugador: 
- Plataformas estáticas y móviles: Vanne podrá saltar sobre ellas y alcanzar fragmentos de los amuletos.
- Enemigos: fantasmas, fantasmas voladores, calabazas con patas y slimes
- Vidas: El jugador dispondrá de una única vida para superar el nivel.
- Llaves: Para abrir puertas en los niveles. Aparecerán tras derrotar a todos los enemigos de Xinn.

### Recursos no visibles:
Velocidad: cada jugador y cada enemigo tienen velocidades distintas.
Magnitud de salto: Vanne y los enemigos slimes tienen capacidad de salto.

### Puntuación: 
No hay una puntuación determinada, simplemente sigue el patrón del juego para conseguir el objetivo del mismo.

### Gráficos:
Todos los elementos gráficos son en dos dimensiones.
Para la creación de spritesheets para las animaciones de Vanne y de los enemigos se han usado herramientas como https://spritesheet.org/ para unir diferentes imágenes .png en una e https://imageresizer.com/ para redimensionar imágenes.

Nave de Xinn: Empleo de una nave espacial en la que viaja. Imágenes tanto de horizontal como vertical en ambos sentidos.

### Fondos: 
Empleo de Photoshop para los fondos y Tiled para la generación de los mapas.

### Paletas de colores:
Hemos intentado ajustar los tilesets y sprites de forma que tuvieran armonía entre ellos. Nos hemos ayudado de las siguientes herramientas online:
https://coolors.co/e5d9f2-f5efff-cdc1ff-b9abfc-a594f9-7371fc
https://color.adobe.com/es/create/color-wheel


### Música:
Usamos una canción para cada nivel, al igual que en la página donde se selecciona el nivel.
Los sonidos generados por los personajes pertenecen a diferentes sitios web.
https://www.fesliyanstudios.com/es/royalty-free-music/downloads-c/8-bit-music/6
https://patrickdearteaga.com/es/chiptune-8-bit-retro-es/


### Tabla de información:

| Usuario | Vidas | Velocidad | Velocidad de salto |
| ------------- | ------------- | ------------- |------|
| Vanne | 1 | 300 | -400 |
| Xinn | 1 | 200 | x |
| Enemigos fantasmas | 1 | 200 | x |
| Enemigos fantasmas voladores | 1 | 150 | x|
| Enemigos calabaza | 1 | 100 | x |
| Enemigos slime | 1 | 150  | -350 |


### Arquitectura software del juego.
 
Assets(imágenes):
- Backgrounds (diferenciados por los niveles de Vanne, los prelevels y todo lo demás común).
- Sounds (música y diferentes sonidos del juego).
- Sprites (el jugador, tanto Vanne como la nave, los amuletos, los enemigos...).
- Tiles (mapas de los niveles).

src:
- Components (botones de selección) [invocados en las pantallas de información de los niveles (scenes)]
- Scenes (pantallas de información y los propios niveles) [dónde se invocan los sprites]
- Sprites (los objetos, los enemigos, los jugadores) [la clase base/objeto general]


### Informe de pruebas
 
Hemos realizado diferentes pruebas con usuarios diversos, dentro de nuestro círculo. Es así, cómo se generan las diferentes opiniones y conclusiones sacadas del videojuego, que tuvimos en cuenta a la hora de matizar los últimos detalles del mismo. 

Marcos:

    - Laura Esteban y Martín Fernández: no entendieron que para conseguir la llave en los laberintos tenían que matar a todos los fantasmas. A partir de esa observación añadimos un cartelito que aparece al navegar por la puerta sin tener la llave.

    - Christian Atienza y Enrique Ortiz: Marcos no tuvo que explicarles nada y supieron avanzar a través del juego.

Lluc:

    - Clara Martínez: al principio le costó entender la dinámica del juego. También le resultaron fáciles los niveles de plataformas. 
    A partir de sus comentarios, pusimos una pequeña descripción del juego y de los controles del mismo en el propio html. También metimos más plataformas y enemigos en los niveles de Vanne.

David:

    - Jorge Lago: hizo la prueba con su padre (programador avanzado en videojuegos) y su madrastra Victoria Rodríguez (diseñadora gráfica) y salvo alguna pequeña paleta de colores y algun pequeño fallo (que ya hemos arreglado) nos felicitaron por el trabajo.

Álvaro:

    -  Gonzalo Meneses: no terminó de entender que el monstruo volador del nivel 1 era una plataforma móvil para alcanzar el fragmento de amuleto.

La conclusión de esto es que para ser un juego indie, hecho desde cero tanto desde nuestro conocimiento como desde la parte creativa, en líneas generales está bien, gusta a los usuarios y se pueden entretener lo que dura en sí, al máximo 15-20 minutos.

