---
author: Guillermo Brachetta
title: "El protocolo de buenas noches: Preparando el búnker para dormir"
description: A las 23:00, un webhook desde el iPhone dispara el apagado general. Dos cerraduras inteligentes se traban, bajan las persianas, el termostato baja a 18 °C y Home Assistant negocia la paz doméstica.
slug: el-protocolo-de-buenas-noches
pubDatetime: 2026-11-25T23:00:00+01:00
featured: false
draft: false
tags:
  - home assistant
  - automatizaciones
  - dispositivos
ogImage: ../../../../assets/images/2026-11/25.png
---

![Image](@/assets/images/2026-11/25.png)

A las veintitrés horas, una persona sensata se lava los dientes, apaga el velador y se duerme.

En mi casa, el proceso se parece bastante a un submarino preparándose para una inmersión de emergencia.

Vivimos en los Países Bajos, pero nuestro hogar es una mezcla explosiva de volumen dramático argentino y obstinación pragmática polaca. Cuando algo mínimo sale mal en nuestra vida doméstica, nadie sufre en silencio estoico. Hay una desesperación teatral inmediata, seguida al instante por un interrogatorio filoso y sin anestesia.

Por culpa de este clima cultural, cualquier tecnología instalada en la casa tiene que funcionar con una perfección absoluta, o afrontar un juicio sumario a los gritos.

Cuando apoyo el teléfono en el cargador de la mesa de luz, un atajo de iOS dispara un webhook encriptado directo a mi servidor local. Home Assistant recibe el paquete, se aclara la garganta y da inicio a la secuencia de apagado.

Lo que sigue es una sinfonía mecánica meticulosa que transforma una típica casa familiar holandesa en un búnker automatizado e impenetrable.

## La sinfonía mecánica

El paisaje sonoro de la hora de dormir es profundamente satisfactorio.

Primero entran en acción las cerraduras. Dos cerraduras motorizadas inteligentes en la puerta principal y en la del patio hacen girar sus engranajes internos, encajando pesados cerrojos de acero en los marcos con el chasquido metálico y rotundo de la bóveda de un banco cerrando por el fin de semana. No hace falta bajar en medias y con frío a revisar si el picaporte cede. Si las cerraduras encuentran resistencia, el panel me avisa. Si encajan limpias, la primera etapa de contención está lista.

Casi al mismo tiempo, las persianas enrollables motorizadas empiezan su descenso. Zumban suavemente contra los vidrios, bajando centímetro a centímetro hasta que cada ventana queda cubierta de tela opaca. Afuera, la lluvia holandesa golpea contra los ladrillos. Adentro, el mundo se reduce a nuestras cuatro paredes.

Después le toca al clima. El sistema de calefacción recibe sus nuevas órdenes de marcha y recorta los radiadores a unos disciplinados 18 °C. Si por casualidad quedó una ventana apenas entornada en el cuarto de huéspedes, el sistema ni se gasta en discutir con el radiador; simplemente corta esa válvula por completo hasta la mañana siguiente.

Por último, el sistema de seguridad se despereza. El hub Aqara en el pasillo emite un pitido discreto, armando los sensores de las puertas y los detectores periféricos de movimiento en modo nocturno. A partir de este instante, cualquier intento no autorizado de abrir una puerta exterior le va a regalar al vecindario unos noventa decibeles de chillido digital.

Se siente magnífico. Durante unos cuatro segundos, te sentís el comandante al mando de un navío de guerra de última generación.

Hasta que la realidad toca a la puerta, por lo general en forma de queja a los gritos desde la planta alta.

## Los límites del poder absoluto

En desarrollo de software, desmantelar un entorno es algo lineal: matás todos los procesos, bajás las conexiones de la base de datos y limpiás la memoria.

En domótica, te das cuenta enseguida de que tu sala de servidores está habitada por otros seres humanos que tienen derechos civiles y opiniones.

En los primeros tiempos de esta instalación, mi automatización de Buenas Noches era sumamente arrogante. Tenía una única llamada de servicio, totalitaria: `light.turn_off` apuntando a `all`.

La lógica era impecable, elegante y completamente invivible.

Si ejecutás un apagón a ciegas en toda la casa a las once de la noche, no conseguís tranquilidad doméstica. Conseguís el caos.

Al final del pasillo, inevitablemente hay alguien frente al espejo del baño con espuma de dentífrico en la pera, sumido de golpe en la oscuridad más absoluta y sin previo aviso. Arriba, en el ático, las adolescentes (cuyos relojes circadianos internos consideran que las 23:00 es el principio de la tarde) ven cómo sus lámparas de escritorio se apagan en medio de un ensayo escolar o de un video.

Un coro de quejas en dos idiomas retumba por el hueco de la escalera. Y ahí te ves, corriendo a los manotazos a buscar el teléfono, desbloqueando la pantalla con dedos dormidos y restaurando las luces del ático con cara de culpa mientras tratás de explicar que la automatización solo quería colaborar.

Los scripts totalitarios no sobreviven a la vida de familia. Hacía falta diplomacia.

## Lógica condicional para la paz doméstica

Para evitar una rebelión armada, el script de Buenas Noches tuvo que pasar de ser un garrote ciego a convertirse en un tratado diplomático de alta sensibilidad.

Ahora la automatización pasa por un laberinto de condiciones antes de tocar una sola tecla de luz:

```yaml
sequence:
  - action: lock.lock
    target:
      entity_id:
        - lock.front_door
        - lock.back_door

  - action: cover.close_cover
    target:
      entity_id: cover.all_roller_shades

  - action: climate.set_temperature
    target:
      entity_id: climate.central_heating
    data:
      temperature: 18

  # Capa de diplomacia doméstica
  - if:
      - condition: state
        entity_id: binary_sensor.bathroom_presence_fp300
        state: "off"
      - condition: numeric_state
        entity_id: sensor.bathroom_humidity
        below: 65
    then:
      - action: light.turn_off
        target:
          entity_id: light.bathroom_lights

  # Respetar el ático solo si las chicas están en casa
  - if:
      - condition: state
        entity_id: binary_sensor.girls_at_home
        state: "off"
    then:
      - action: light.turn_off
        target:
          entity_id: light.attic_all

  - action: light.turn_off
    target:
      entity_id: light.ground_floor_all
```

### La regla del baño

La red de seguridad más crítica de toda la casa es la verificación del baño. Los sensores infrarrojos baratos acá no sirven para nada: si te quedás quieto quince segundos lavándote la cara, asumen que la habitación está vacía y te apagan la luz.

Para evitar quedar a oscuras mientras te enjuagás el jabón de los ojos, instalé un sensor de presencia Aqara FP300. Al usar radar de ondas milimétricas, detecta el sutil movimiento del pecho de alguien que está, sencillamente, respirando.

Si el FP300 detecta a alguien adentro, la rutina de Buenas Noches respeta educadamente la luz del botiquín. La persona que esté adentro puede terminar de lavarse los dientes en paz, sin enterarse del apagado administrativo que barre el resto de la casa. Recién cuando sale al pasillo y el sensor queda despejado, el baño apaga sus propias luces treinta segundos después.

Nadie queda atrapado a oscuras con un cepillo de dientes. Hay matrimonios que se salvaron por mucho menos.

### La zona de exclusión del ático

El piso superior exige un nivel de diplomacia todavía mayor.

El ático es territorio de las chicas, pero concederle inmunidad diplomática irrestricta a todo un piso sería un desperdicio. Si salieron con amigos o no duermen en casa, dejar cuartos vacíos iluminados atenta contra cualquier principio de eficiencia algorítmica.

Así que antes de que el script toque la planta alta, Home Assistant consulta los rastreadores de presencia. Si el sistema confirma que las chicas no están en la casa, el ático se suma al apagón general sin ninguna piedad.

En cambio, si figuran como presentes, su territorio adquiere estatus soberano. Si quieren quedarse leyendo bajo una lámpara de escritorio hasta la medianoche, es su prerrogativa.

En lugar de cortarles la corriente, el sistema simplemente le avisa a los sensores del pasillo superior que los pisos de abajo ya se fueron a dormir. Si alguna baja en puntas de pie a la 01:30 a buscar un vaso de agua, la cocina no se enciende a pleno sol. Ilumina apenas una tira ámbar discreta y tenue a lo largo del zócalo (lo justo y necesario para encontrar el vaso sin despertar a nadie).

## Dormir adentro de la máquina

Para las 23:05, el tratado ya fue respetado.

La planta baja está a oscuras. Los cerrojos están clavados en sus marcos. Las persianas están selladas contra la llovizna holandesa y la temperatura desciende de manera pareja hacia los 18 °C. En algún rincón del ático, un débil rectángulo de luz se asoma por debajo de una puerta, inofensivo y tolerado por el motor de automatización.

¿Es ridículo hacer pasar tu rutina de ir a dormir por una plataforma de domótica de nivel empresarial, con radar de ondas milimétricas, bifurcaciones condicionales, rastreo de presencia y cerrojos motorizados?

Probablemente sí. Una llave de bronce tradicional y dos dedos lograrían más o menos la misma seguridad física en cuarenta segundos.

Pero hay un placer teatral muy particular en acostarse en la cama, escuchar cómo se traban las cerraduras y saber que el búnker está cerrado a cal y canto, vigilando su perímetro y esperando en silencio hasta la mañana.
