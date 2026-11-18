---
author: Guillermo Brachetta
title: "Automatizaciones que cuidan a otras automatizaciones"
description: Comprás una lamparita inteligente para leer en la cama sin levantarte y, tres años después, estás escribiendo scripts centinela para vigilar a otros scripts en el placard de servicios.
slug: automatizaciones-que-cuidan-a-otras-automatizaciones
pubDatetime: 2026-11-27T10:00:00+01:00
featured: false
draft: false
tags:
  - home assistant
  - automatizaciones
  - domótica
  - dispositivos
ogImage: ../../../../assets/images/2026-11/27.png
---

![Image](@/assets/images/2026-11/27.png)

Compré una lamparita inteligente. Ese fue el error.

La lamparita funcionó, lo cual fue todavía peor, porque me dio ideas. Le dije a mi novia que automatizar las luces nos iba a ahorrar tiempo. Esa sola frase debería calificar como negligencia criminal.

Nadie que instale Home Assistant ahorra tiempo. Lo que hacés en realidad es agarrar una casa que funcionaba a la perfección con cables de cobre y teclas mecánicas, y convertirla en un frágil departamento de sistemas donde sos el único empleado, trabajando en turnos nocturnos no remunerados.

Porque una vez que tenés ochenta dispositivos dialogando con un servidor en el placard de servicios, descubrís la regla fundamental de la domótica moderna: las cosas que automatizás no se quedan automatizadas. Necesitan supervisión. Una supervisión constante y ansiosa.

## El segundo trabajo

En los viejos tiempos, una tecla de luz era un pedazo de metal tocando a otro pedazo de metal. Tenía una vida útil estimada de cuarenta años. No tenía firmware, no se conectaba a una red local y jamás en la vida te pedía revisar un archivo de log porque se le venció un token de API.

Hoy por hoy, prender una lámpara en mi living implica toda una cadena de negociaciones diplomáticas.

El botón inalámbrico le habla por Zigbee a una antena enchufada a una mini PC. La mini PC pasa la carga útil a través de un contenedor con Zigbee2MQTT, que reenvía un topic MQTT a Home Assistant, que evalúa tres condiciones, verifica si el sol está por debajo del horizonte y, finalmente, manda una orden de regreso por el cable hacia un relé oculto detrás del revoque.

Cuando esta cadena funciona, te sentís un genio. Cuando falla, te quedás parado en el medio de la oscuridad en medias, mirando una pared vacía y preguntándote si el canal 25 de Zigbee estará sufriendo interferencias por culpa del microondas.

Y ahí es donde empieza la pendiente. Te negás a aceptar que tu brillante sistema pueda trastabillar. En lugar de simplificar la instalación, hacés lo que hace cualquier programador obstinado: escribís más software para vigilar al software existente.

## Centinelas en el placard de servicios

En algún momento del último año, mis automatizaciones cruzaron un límite. Dejaron de controlar la casa y empezaron a cuidarse entre ellas como niñeras.

Tomemos el coordinador de Zigbee. Cada par de semanas, por motivos que solo conocen los dioses del silicio, la antena USB entra en un estado catatónico. No se cuelga del todo, lo cual sería muy conveniente; simplemente deja de escuchar. Las teclas físicas siguen funcionando porque están cableadas directo a los relés, pero las automatizaciones quedan sordas. Apretás un botón y la casa simplemente te ignora.

Así que armé una automatización centinela (un watchdog). Cada diez minutos, Home Assistant revisa la marca temporal del último mensaje recibido desde el puente Zigbee. Si pasan doce minutos sin una sola señal de vida, el centinela ni se gasta en pedir intervención humana: reinicia el contenedor por la fuerza, resetea el puerto serie y me manda una notificación discreta al teléfono.

Puedo estar cenando con amigos, en medio de una charla sobre un concierto o una pieza musical, y el reloj me vibra con un aviso: _"Zigbee2MQTT unresponsive. Container restarted."_

Miro de reojo la muñeca, tomo un sorbo de vino y no digo nada. Los invitados piensan que estoy mirando un mail urgente. En realidad, acabo de registrar en silencio que mi placard de servicios se acaba de hacer RCP a sí mismo.

## La patrulla fronteriza de Apple

Después está el rastreo de presencia, que es su propia tragedia circular.

Las automatizaciones necesitan saber si estamos en casa. Si la casa cree que salimos, la calefacción baja a 18 °C y el sistema de seguridad se arma solo. Si cree que estamos adentro, no toca ni los radiadores ni las luces.

Para esto, Home Assistant escucha la integración de iCloud de Apple. Pero Apple trata a cualquier servidor externo como si fuera un acosador peligroso. Si Home Assistant sondea la ubicación del teléfono con demasiada frecuencia, Apple le estrangula la conexión sin avisar.

Y cuando Apple estrangula la conexión, las coordenadas se congelan. Hace dos semanas, mi servidor se convenció de que mi pareja estaba estacionada indefinidamente en un supermercado a tres kilómetros de distancia, a pesar de que estaba sentada en el sillón leyendo un libro frente a mí. La casa ya se estaba preparando para apagarle la calefacción teniéndola ahí en la misma habitación.

Para resolverlo, tuve que escribir una automatización que cuide a la integración de iCloud. Mira el router Wi-Fi local: si el teléfono de ella está asociado al punto de acceso, anula el rastreador en la nube y fuerza el estado a "home". Mientras tanto, un script de recuperación que corre cada hora le hace ping a la integración para volver a autenticar antes de que a Apple se le ocurra hacer otro berrinche.

## ¿Quién vigila a los vigilantes?

La verdadera locura de todo este tinglado es que genera un bucle recursivo interminable.

Si tenés un script centinela que reinicia la antena, ¿qué pasa cuando falla el script centinela? Si tenés una automatización que te avisa cuando se corrompe un backup, ¿cómo sabés si el servicio de notificaciones sigue conectado?

Te descubrís a vos mismo evaluando poner un segundo centinela para vigilar al primero. Empezás a pensar en pings canario, canales secundarios de notificación y puentes redundantes para una casa que solo tiene tres pisos.

Mi pareja entró a la cocina la otra noche mientras yo miraba fijamente una terminal en mi laptop, ajustando una tarea de cron que controla si el script de un sensor había superado el tiempo de espera.

Me preguntó qué estaba haciendo.

_"Estoy arreglando la automatización que controla si la otra automatización todavía funciona"_, le dije.

Se quedó callada, miró la tecla de luz perfectamente común y corriente en la pared que maneja la lámpara del techo, y me preguntó, con infinita delicadeza, por qué no podíamos simplemente usar los dedos como la gente normal.

No tuve ninguna respuesta sensata. Pero diez minutos después, se interceptó un error silencioso, un contenedor se reinició en segundo plano y la luz de la cocina se prendió de manera automática cuando ella volvió a entrar.

Es un absurdo total, claro que sí. Pero el búnker resistió y nadie tuvo que tocar una tecla.
