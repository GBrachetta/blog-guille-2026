---
author: Guillermo Brachetta
title: "El juego de dados de Mozart"
description: "Cómo compuse la música y escribí el código en JavaScript para mi propia versión del juego de dados musical de Mozart."
slug: el-juego-de-dados-de-mozart
pubDatetime: 2026-11-17T09:30:00+01:00
featured: true
draft: false
tags:
  - música barroca
  - clave
  - software
  - javascript
ogImage: ../../../../assets/images/2026-11/dice-game.png
---

En el siglo XVIII había un juego de salón muy popular llamado _Musikalisches Würfelspiel_, o juego de dados musical. El más famoso de todos se publicó en 1792 y se le atribuyó a Mozart. La idea es sencilla: tenés un grupo de fragmentos musicales breves y una tabla de números. Tirás dos dados por cada compás, buscás el fragmento correspondiente en la tabla y vas armando una pieza musical completa, sin necesidad de saber absolutamente nada de composición.

Hace un tiempo me puse a buscar una versión decente en internet. La gran mayoría de las que encontré estaban rotas, no andaban en el celular o sonaban espantoso porque cada compás era apenas un miserable MIDI rígido, con un silencio insoportable antes de que arrancara el siguiente.

Como paso la mitad de mi vida metido en la música barroca y la otra mitad escribiendo código, pensé que podía armar algo bastante mejor. De ahí nació [Musical Dice](https://gbrachetta.github.io/Musical-Dice/).

![Musical Dice](@/assets/images/2026-11/dice-game.png)

## Escribir la música primero

Al principio pensé en usar la partitura original de 1792, pero en cuanto empecé a jugar con la idea, me dieron ganas de componer la música yo mismo.

En el juego histórico se va cambiando de a un compás por vez. Técnicamente funciona, pero musicalmente un solo compás resulta demasiado corto. Cuesta mucho lograr una verdadera sensación de fraseo cuando la música cambia de dirección cada tres tiempos.

Así que cambié un poco la estructura. En vez de compases individuales, usé fragmentos de dos compases. Compuse doce piezas completas en compás ternario, cada una de 24 compases (básicamente un tema y 11 variaciones que siguen con exactitud el mismo esquema armónico).

Como las doce piezas comparten la misma armonía en cada paso, podés tomar los compases 1 y 2 de la primera pieza, continuarlos con los compases 3 y 4 de la séptima, saltar a la cuarta pieza para los compases 5 y 6, y todo se hilvana a la perfección. El final de cualquier fragmento desemboca de manera natural en el comienzo del siguiente.

Con 12 opciones para cada una de las 12 secciones de dos compases, hay $12^{12}$ piezas posibles. Eso da casi 8,9 billones de combinaciones, así que prácticamente cada tiro de dados te entrega una pieza que nadie escuchó jamás, ni que nadie volverá a escuchar.

## Lograr que suene fluido en el navegador

Una vez que la música estuvo lista, el principal desafío técnico fue el audio.

Si simplemente cargás un puñado de archivos MP3 en JavaScript y reproducís el siguiente cuando termina el anterior, el navegador deja un pequeño hueco entre archivo y archivo. En la música, hasta una fracción de segundo te arruina el pulso, y en un instrumento como el clave, cortar la resonancia entre compás y compás suena completamente artificial.

Para solucionar eso usé [Howler.js](https://howlerjs.com/), que se encarga de la precarga y de la sincronización de la reproducción, y le dediqué bastante tiempo a asegurarme de que los empalmes entre fragmentos quedaran impecables. Podés tirar los dados y dejar que la aplicación elija las doce secciones por vos, o hacer clic en la cuadrícula para probar distintas combinaciones antes de darle a play.

Si querés probarlo, podés jugar con [Musical Dice acá](https://gbrachetta.github.io/Musical-Dice/) o curiosear el [código en GitHub](https://github.com/GBrachetta/Musical-Dice).
