---
author: Guillermo Brachetta
title: "Cómo le enseñé a mi cama a cegarme a las 3 de la mañana"
description: "Cómo intentar encender la luz del dormitorio sólo cuando no hay nadie durmiendo terminó en aprender a soldar, meter cuatro sensores bajo el colchón y ser encandilado a las 3 de la mañana por mi propio pie."
slug: como-le-ensene-a-mi-cama-a-cegarme-a-las-3-am
pubDatetime: 2026-11-17T10:30:00+01:00
featured: false
draft: false
tags:
  - home assistant
  - esp32
  - domótica
  - automatizaciones
ogImage: ../../../../assets/images/2026-11/17.png
---

![Image](@/assets/images/2026-11/17.png)

Nadie empieza a usar Home Assistant pensando que se va a pasar el fin de semana soldando cables para meterlos abajo de un colchón.

Siempre arranca con una idea simple y sensata: _«Estaría bueno que las luces del dormitorio se prendieran cuando entramos, salvo que alguno de los dos ya esté en la cama»._

Caminar hasta la llave de luz en la pared lleva unos tres segundos. Funciona siempre y sin fallar jamás. Como era de esperar, decidí automatizarlo.

## Empezando con un sensor de presencia

Mi primer intento fue un sensor de ondas milimétricas Aqara FP2. En la aplicación dividís la habitación en zonas (una zona «Cama», una zona de «Tránsito» alrededor de la cama y una zona «Placard») y el sensor va rastreando por dónde nos movemos en el cuarto.

En los papeles, tendría que haber alcanzado y sobrado. En la realidad, al radar le cuesta un Perú distinguir entre una persona durmiendo abajo de una frazada y una pila de almohadones. A veces el sensor estaba seguro de que seguíamos en la cama a las dos de la tarde; otras veces nos tapábamos con las sábanas y desaparecíamos del mapa por completo.

Para que la automatización funcionara de verdad, Home Assistant necesitaba saber a ciencia cierta si alguno de los dos estaba acostado.

## Aprender a soldar por una lamparita

Así fue como una simple regla de iluminación se transformó en un proyecto de ingeniería de hardware. Me compré un ESP32, cables, decapante, termocontraíble y dos pequeños sensores de presión tipo celda (uno para mi lado de la cama y otro para el de Nina), y me senté a aprender a soldar.

Una vez que logré que el cableado anduviera y escribí el YAML para ESPHome, descubrí que meter sensores de presión abajo de un colchón es puro ensayo y error. Si el sensor queda corrido un par de centímetros, deja de detectarte en el instante en que te ponés de costado. Si lo ponés en el lugar equivocado sobre los elásticos, el propio peso del colchón lo activa y Home Assistant asume que estás en la cama todo el santo día (como si yo fuera un Santiagueño).

Así que me pasé buena parte de una tarde levantando el colchón, corriendo los sensores unos milímetros, tirándome a rodar por la cama, mirando los valores en el teléfono, levantándome otra vez y repitiendo el circo hasta que los números tuvieron sentido.

## 380 líneas de YAML

Con los sensores de la cama operativos, combiné todo con las zonas del FP2.

Lo que empezó como «prender la luz cuando entra alguien» es ahora una automatización de **más de 380 líneas de YAML**, **20 entidades**, **68 condiciones** y **21 bloques `if` anidados**:

- Desde 90 minutos antes del atardecer hasta el amanecer, consulta `sensor.bedroom_ight_sensor` (con una falta de ortografía en «light» que ya quedó regada por demasiados lugares como para corregirla) para ver si la habitación tiene menos de 100 lux.
- Si ambos lados de la cama y la zona Cama del FP2 llevan dos minutos despejados, entrar a la zona de Tránsito enciende las dos luces de la cama al 100% y los dos veladores.
- Si uno de los dos ya está en la cama y el otro entra, el lado del que duerme queda apagado y sólo se enciende el otro lado al 10%.
- Si los dos estamos en la cama, no se prende absolutamente nada.
- Cinco helpers `input_boolean` (más una segunda automatización que vigila si un cambio vino de un ser humano o del propio Home Assistant) se aseguran de que si cambiamos una luz manualmente, el sensor de presencia no te la apague en la cara hasta que el cuarto quede vacío.
- Y al final, al salir de la zona del placard, le manda el comando `turn_off` a las tres lamparitas de IKEA, espera dos segundos, y se lo vuelve a mandar a la lamparita rebelde que haya decidido ignorar la primera orden.

## Encandilado por mi propio pie a las 3 de la mañana

Me fui a dormir orgullosamente satisfecho con el despliegue de genialidad. Hasta que, en medio de la noche, me moví estando dormido.

Como esos primeros sensores eran bastante chicos, correrme apenas unos centímetros hacia un costado alcanzó para que el sensor creyera que me había levantado. Al mismo tiempo, mi pie asomó por el borde de la zona Cama e invadió la zona de «Tránsito».

Para lo que Home Assistant entendía, no había nadie en la cama y alguien acababa de entrar al dormitorio. Así que cumplió con su deber con devoción intachable y me clavó las luces en los ojos en plena fase REM.

## Agregar más sensores

Es evidente que cuando un sistema sobrecomplicado falla a las 3 de la mañana, la única solución lógica y sensata es enchufarle más hardware.

Los sensores chicos sólo funcionaban si dormías clavado en el punto exacto donde te habías acostado, lo cual es fantástico para una estatua de mármol, pero menos práctico para un ser humano. Así que el soldador salió del cajón para el segundo round. Esta vez encargué dos sensores de tira de 30 cm y los conecté al mismo ESP32 junto con los originales, llevando la cama a un total de cuatro sensores bajo el colchón (y convirtiendo la parte inferior de nuestra cama en algo que parece sospechosamente un experimento de laboratorio clandestino).

Entre las tiras más anchas de 30 cm, otro rato levantando el colchón para calibrar la posición y un retraso de dos minutos en Home Assistant antes de declarar que un lado de la cama está oficialmente vacío, ahora puedo mover las piernas de noche sin provocar un amanecer nuclear.

Y lo más insólito de todo es que ahora funciona exactamente como lo imaginé al principio. Cuando uno de los dos ya duerme y el otro llega más tarde, sólo el lado vacío se enciende con una luz tenue, sin tocar una tecla ni despertar a nadie.

Si sacamos las cuentas, hicieron falta aprender a soldar, armar cuatro sensores para la cama y casi 400 líneas de YAML para ahorrarnos tres segundos en la tecla de la pared. A razón de tres segundos por día, recuperaré la inversión en algún momento alrededor de 2048 (suponiendo que ningún cable se desuelde antes). Y mirando el resto de la casa, ya se me están ocurriendo un par de ideas más.
