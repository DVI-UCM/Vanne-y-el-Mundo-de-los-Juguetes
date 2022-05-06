## Vanne y el mundo de los juguetes.
### Creado por el grupo **Los peluchitos** en el que estamos: Álvaro Plaza, David Lago, Lluc Bonet y Marcos de la Fuente

![alt text](https://github.com/DVI-UCM/Vanne-y-el-mundo-de-los-Juguetes/blob/509fa2050674bc7cc41bab48bfac276ccff8606b/captura%20de%20pantalla.png)

## [Enlace a la página pública del juego](https://dvi-ucm.github.io/Vanne-y-el-mundo-de-los-Juguetes/)

Plataforma: Navegador web

Versión: 0.1

#### -Sinopsis de jugabilidad: 
Juego de plataformas y puzzles. El personaje principal, Vanne, deberá avanzar en los diferentes escenarios, junto a su compañero Xinn, enfrentándose a todo tipo de enemigos para conseguir completar todo el amuleto que le fue robado y poder volver a su tamaño original. En los niveles de Xinn, el abrir las puertas hace referencia a la posibilidad de escapatoria de Vanne en cuanto consiga el amuleto completo.

#### -Categoría: 
Acción - Plataformas

#### -Rango de edad: 
7-99

#### -PEGI info: 
+7

#### -Público: 
Público de todas las edades

#### -Lore/Context: 
Mundo de fantasía de los propios juguetes

#### -Core Loop de un nivel:
Vamos a implementar un core loop lineal donde el jugador deberá completar los niveles para progresar a través de la narrativa y desbloquear nuevos capítulos.
#### -Prepare: 
Elegir un nivel.
#### -Challenge: 
El propio nivel. Sortear obstáculos y eliminar enemigos. Conseguir abrir puertas o reunir el amuleto completo.

#### -Mecánicas:
Saltos y movimientos del jugador, y de los enemigos, ataques con arma o disparos para eliminar enemigos, golpeo de los enemigos para matarte. Una sola vida, tanto por parte de los enemigos como del propio jugador.

#### -Cámara:
Mundo 2D
Vista de desplazamiento lateral en perspectiva plana (“side scroller”)
Empleo de parallax en algunos niveles.

#### -Espacios:
Cada nivel tendrá un background diferente según el marco simbólico del nivel.
Toda ambientación sigue la  línea del mundo de los juguetes, es decir, como un espacio infantil.
Los mundos, a los que hace referencia los backgrounds, son: el mundo piruleta, de hielo, de carreras, de lego, del espacio y de ciudad.

#### -Reglas:
El usuario no puede sobrepasar el límite del mapa.
Los niveles se continuan tras finalizar cualquiera.
El usuario puede elegir el orden. Aunque se recomienda seguir el orden numérico.
Debe reunir todas las piezas del amuleto (en los niveles de Vanne).
Debe matar todos los enemigos, conseguir la llave y salir por la puerta (en los niveles de Xinn).
La dificultad del juego está también en no haber guardado propio de los niveles. Se juega en una vez, de seguido.

#### -Acciones operativas: 
4-way-movement; golpear
Caminar: El jugador puede caminar usando las teclas.
 Teclas de las flechas derecha e izquierda
Saltar: Jugador puede saltar usando:
 Flecha hacia arriba
Agacharse: Jugador puede saltar usando:
 Flecha hacia abajo
Atacar: El jugador puede atacar a los enemigos empleando
 Barra espaciadora

 Estas acciones en Vanne son en el propio personaje, pero en los niveles de Xinn, son la nave las que acciona esto, en la que por ejemplo la nave ataca disparando

#### -Recursos: 
Plataformas: para saltar sobre ellas
Enemigos: Pequeños osos; secuaces de Billy
Vidas: Veces que puede ser golpeado el usuario/enemigo hasta ser eliminado.
Llaves: Para abrir puertas en los niveles y aumentar así su dificultad

#### -Recursos no visibles:
Daño
Velocidad
Magnitud de salto

#### -Puntuación: 
No hay una puntuación determinada, simplemente sigue el patrón del juego para conseguir el objetivo del mismo.

#### -Gráficos: 2D.
Empleando herramientas como:
Páginas para la construcción de los personajes.
Al igual que Vanne como los enemigos se buscaron de páginas web que proporcionasen spritesheets gratuitos con todos los movimientos posibles.
Nave de Xinn: Empleo de una nave espacial en la que viaja. Imagenes tanto de horizontal como vertical, como ambos sentidos.

#### -Fondos: 
Empleo de Photoshop para los fondos y Tiled para la generación de mapas y plataformas.

#### -Paletas de colores:
https://coolors.co/e5d9f2-f5efff-cdc1ff-b9abfc-a594f9-7371fc
https://color.adobe.com/es/create/color-wheel

#### -Música. Enlace web:
https://www.fesliyanstudios.com/es/royalty-free-music/downloads-c/8-bit-music/6
https://patrickdearteaga.com/es/chiptune-8-bit-retro-es/
Usamos una canción para cada nivel, al igual que en el lobby del juego.
Los sonidos generados por los personajes pertenecen a diferentes sitios web.

#### -Tabla de información:

| Usuario | Vidas | Velocidad |
| ------------- | ------------- | ------------- |
| Vanne | 1 | 2 |
| Xinn | 1 | 2 |
| Enemigos peluches | 1 | 1 |
| Enemigos calabaza | 1 | 2 |
| Enemigos comecocos | 1 | 2 |


#### -Arquitectura software del juego.
 
Assets(imágenes)  -> Backgrounds (diferenciados por los niveles de Vanne, los prelevels y todo lo demás común)
                  -> Sounds (música y diferentes sonidos del juego)
                  -> Sprites (el jugador, tanto Vanne como la nave, los amuletos, los enemigos...)
                  -> Tiles (plataformas de los mapas)
Src -> Components (botones de selección) [invocados en las pantallas de información de los niveles (scenes)]
    -> Scenes (pantallas de información y los propios niveles) [dónde se invocan los sprites]
    -> Sprites (los objetos, los enemigos, los jugadores) [la clase base/objeto general]
[Lo más destacable del código]

#### -Informe de pruebas, con los datos extraídos y las conclusiones.
 
Hemos realizado diferentes pruebas con una diversidad amplia de usuarios, todo ello en torno a nuestro círculo. Es así, cómo se generan las diferentes opiniones y conclusiones sacadas del videojuego, que tuvimos en cuenta a la hora de matizar los últimos detalles del mismo. 
Marcos probó el juego con un par de niños de sus clases de robótica (aprox 11 años) y un par de compañeros (aprox 22 años) de su grupo scout 
Lluc hizo la prueba con sus compañeras de futbol, 2 usuarias, del equipo de la facultad de Física de la UCM.
David hizo la prueba con su padre (programador avanzado en videojuegos) y su madrastra (diseñadora grafica) y salvo alguna pequeña paleta de colores y algun pequeño fallo (que ya hemos arreglado) nos felicitaron por el trabajo
Adrián hizo la prueba con su grupo de compañeros de la carrera, 3 usuarios, que inclusó les interesó la asignatura tras esta prueba.
La conclusión de esto es que para ser un juego indie, hecho desde cero tanto desde nuestro conocimiento como desde la parte creativa, en líneas generales está muy bien, gusta a los usuarios y se pueden entretener lo que dura en sí, al máximo 15-20 minutos.

