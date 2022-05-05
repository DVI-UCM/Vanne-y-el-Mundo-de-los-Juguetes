## Vanne y el mundo de los juguetes.
### Creado por el grupo **Los peluchitos** en el que estamos: Álvaro Plaza, David Lago, Lluc Bonet y Marcos de la Fuente

![alt text](https://github.com/DVI-UCM/Vanne-y-el-mundo-de-los-Juguetes/blob/509fa2050674bc7cc41bab48bfac276ccff8606b/captura%20de%20pantalla.png)

## [Enlace a la página pública del juego](https://dvi-ucm.github.io/Vanne-y-el-mundo-de-los-Juguetes/)

Plataforma: Navegador web

Versión: 0.1

#### -Sinopsis de jugabilidad: 
Juego de plataformas y puzzles. El personaje principal, Vanne, deberá avanzar en los diferentes escenarios, junto a su compañero Xinn, enfrentándose a todo tipo de enemigos para conseguir completar todo el amuleto que le fue robado y poder volver a su tamaño original.

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
El propio nivel. Sortear obstáculos y eliminar enemigos

#### -Mecánicas:
Saltos y movimientos del jugador, y de los enemigos, disparos para eliminar enemigos, golpeo de los enemigos para matarte

#### -Cámara:
Mundo 2D
Vista de desplazamiento lateral en perspectiva plana (“side scroller”)

#### -Espacios:
Cada nivel tendrá un background diferente según el marco simbólico del nivel

#### -Reglas:
El usuario no puede sobrepasar el límite del mapa ni del tiempo.
No podrá continuar desde un punto medio de un nivel.
El guardado automático solo se establece al finalizar el nivel

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

#### -Recursos: 
Plataformas: para saltar sobre ellas
Enemigos: Pequeños osos; secuaces de Billy
Vidas: Veces que puede ser golpeado el usuario/enemigo hasta ser eliminado

#### -Recursos no visibles:
Daño
Velocidad

#### -Puntuación: 
Cada nivel superado otorga X puntos, siendo X el tiempo restante para terminar el nivel. Además, cada enemigo derrotado sumará una cierta cantidad de puntos al marcador total del personaje, que dependerá de la dificultad para derrotarlo. 

#### -Gráficos: 2D.
Empleando herramientas como:
Páginas para la construcción de los personajes.
Vanne: https://www.gameart2d.com/cute-girl-free-sprites.html
Xinn: Empleo de una nave espacial en la que viaja.

#### -Fondos: 
Empleo de Photoshop y sobretodo Tiled para la generación de fondos y mapas.

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




#### -Arquitectura software del juego (UML, o muy similar).
 
#### -Informe de pruebas, con los datos extraídos y las conclusiones.
 
Hemos realizado diferentes pruebas con una diversidad amplia de usuarios, todo ello en torno a nuestro círculo. Es así, cómo se generan las diferentes opiniones y conclusiones sacadas del videojuego, que tuvimos en cuenta a la hora de matizar los últimos detalles del mismo. 
Marcos probó el juego con un par de niños de sus clases de robótica (aprox 11 años) y un par de compañeros (aprox 22 años) de su grupo scout 
L
David hizo la prueba con su padre (programador avanzado en videojuegos) y su madrastra (diseñadora grafica) y salvo alguna pequeña paleta de colores y algun pequeño fallo (que ya hemos arreglado) nos felicitaron por el trabajo
A
La conclusión de esto es que para ser un juego indie, hecho desde cero tanto desde nuestro conocimiento como desde la parte creativa, en líneas generales está muy bien, gusta a los usuarios y se pueden entretener lo que dura en sí, al máximo 15-20 minutos.

