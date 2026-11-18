---
author: Guillermo Brachetta
title: "Mi setup de Home Assistant (Parte 2): Telemetría, matrimonio y el arte de no preguntar jamás '¿Por dónde venís?'"
description: "Multisensores en cada rincón inimaginable, curvas de consumo para el lavarropas y un HomePod que consulta el tráfico de Waze para anunciar la llegada de Nina al minuto exacto."
slug: mi-setup-de-home-assistant-parte-2
pubDatetime: 2026-11-23T10:00:00+01:00
featured: false
draft: false
tags:
  - home assistant
  - automatizaciones
  - dispositivos
  - sensores
ogImage: ../../../../assets/images/2026-11/23.png
---

![Image](@/assets/images/2026-11/23.png)

En la [Parte 1](/es/posts/mi-setup-de-home-assistant-parte-1/), confesé cómo mi dignidad de adulto funcional se disolvió en la comodidad más absoluta: levantar una máquina virtual en un NAS Synology con seis gigas de RAM, empotrar módulos Zigbee por todas las paredes y negarme rotundamente a tocar una tecla de luz o gritarle órdenes a un asistente de voz.

Tener un servidor potentísimo metido en el placard técnico, sin embargo, no sirve absolutamente para nada si tu casa es ciega por naturaleza. Podés pasarte el fin de semana escribiendo las automatizaciones más elegantes del mundo, pero si el sistema no tiene la menor idea de dónde estás parado, qué estás haciendo o cuánta luz natural entra por la ventana, no es más que un reloj carísimo con delirios de grandeza.

Lo que nos lleva directo a la siguiente fase de la obsesión: convertir cada ambiente de la casa en un laboratorio de observación meteorológica y humana.

## El ritual del náufrago desesperado

Si mirás con atención las esquinas, los marcos de las puertas y los estantes de la biblioteca de nuestra casa, vas a encontrar pequeños multisensores a batería por todos lados. Miden temperatura, humedad e iluminancia ambiental en luxes. En las puertas y ventanas exteriores, sensores magnéticos de contacto llevan un inventario silencioso de qué está abierto y qué cerrado.

El verdadero salto de calidad, sin embargo, fue tirar a la basura los sensores de movimiento convencionales.

Cualquiera que haya convivido con los típicos detectores infrarrojos pasivos (los clásicos sensores PIR) conoce a la perfección esa humillación tan particular. Te sentás en el sillón con un libro o una partitura. Te quedás completamente quieto durante tres minutos, concentrado en lo que estás leyendo. De golpe, la habitación entera se hunde en la oscuridad más absoluta.

Llegado ese punto, tenés dos opciones: o te levantás de tu cómodo asiento para que te vuelva a ver, o empezás a sacudir los brazos en la penumbra como un náufrago desesperado haciéndole señas a un helicóptero que pasa de largo, todo para convencer a un pedazo de plástico de cinco euros de que todavía existís.

Mi paciencia se agotó rápido con semejante disparate. Hoy la casa funciona con sensores de presencia por microrradar (tecnología mmWave). A diferencia del infrarrojo tradicional, que solo detecta el desplazamiento de una masa de calor, el microrradar detecta el movimiento milimétrico de tu pecho al inhalar y exhalar mientras respirás. Podés quedarte tres horas seguidas leyendo en el sillón sin mover un solo músculo y las luces ni siquiera van a parpadear.

Mejor todavía, trabajan en combinación con umbrales de luz ambiental. Si el sol de la tarde está pegando de lleno por las ventanas del frente, la casa sabe que encender los focos del techo sería un gasto inútil, sin importar cuántas veces vayas y vengas por el living. El sistema no adivina. Mira, calcula y se mantiene convenientemente fuera de tu camino.

## Rescatando la ropa de una muerte segura

Más allá de la iluminación, el verdadero triunfo de automatizar una casa está en resolver catástrofes domésticas ancestrales que vienen arruinando matrimonios desde la invención del agua corriente.

Tomemos como ejemplo el lavarropas.

Cualquier hogar del planeta conoce esta tragedia. Ponés una carga de toallas o sábanas en el tambor, arrancás el programa y te vas caminando con una agradable sensación de deber cumplido. Te ponés a hacer otras cosas, te sentás al clave o te colgás escribiendo código. A la noche, una ola de pánico helado te recorre la espalda: la ropa húmeda.

Salís corriendo al lavadero, abrís la escotilla y te recibe ese inconfundible olor agrio a tela empapada que estuvo fermentando en un cilindro cerrado de acero inoxidable. El lavado está arruinado. Tu día está arruinado. Ahora tenés que lavar todo de vuelta mientras te replanteás seriamente tus capacidades como adulto funcional.

En casa, tanto el lavarropas como el secarropas son electrodomésticos conectados e integrados directamente a Home Assistant. No se trata de tener aparatos que parezcan futuristas en el salón de ventas de una tienda; se trata de control operativo total.

Puedo programar los ciclos a distancia, ajustar parámetros y ver la telemetría en tiempo real para saber con exactitud matemática en qué fase del lavado está el tambor. Las máquinas incluso controlan el nivel de los consumibles y le avisan a Home Assistant si el depósito de jabón líquido o suavizante está por acabarse, evitando que lances un programa de una hora con media cucharadita de detergente.

Y en el instante exacto en que termina el ciclo, acá no dependemos de un pitido electrónico ridículo que nadie escucha detrás de la puerta cerrada del lavadero. Home Assistant registra el fin del programa, nos manda una notificación al teléfono y el HomePod anuncia con voz suave por toda la casa que la ropa está lista para tender. Cero ropa olvidada, cero toallas agrias y cero amnesia doméstica.

## El protocolo de llegada de Nina

La joya indiscutida de la corona en toda nuestra instalación, sin embargo, es cómo Home Assistant gestiona el regreso a casa a la tarde.

En cualquier pareja, la pregunta diaria de _"¿Por dónde andás?"_ es una fuente inagotable de estrés innecesario. Una persona viene manejando por autopistas colapsadas bajo la lluvia, la otra está en casa calculando el tiempo de cocción de la cena, y ninguna de las dos debería estar mandando mensajes de texto mientras intenta incorporarse a una autopista holandesa en plena noche.

En vez de eso, dejamos que la telemetría haga el trabajo sucio.

Cuando Nina sale de la oficina, su teléfono cruza una geocerca. Home Assistant no se limita a registrar que se fue del trabajo; dispara de inmediato un script que consulta la API de tráfico en tiempo real de Waze.

No calcula una distancia en línea recta (lo cual sería un chiste en un país repleto de canales y puentes levadizos que se abren cuando se les da la gana). Analiza el congestionamiento real de las autopistas, detecta embotellamientos y estima la hora de llegada al minuto exacto.

En nuestro living, el HomePod hace un sonido suave y anuncia con tono sereno y civilizado:

_"Nina salió del trabajo. Llega a casa a las 18:42, en treinta y cuatro minutos."_

Yo no tengo que llamar a nadie. Ella no tiene que tocar el teléfono mientras maneja. Sé exactamente cuándo poner el agua para la pasta o cuándo mandar la fuente al horno precalentado. Y para cuando su auto dobla en nuestra calle, la cerradura Nuki ya destrabó la puerta y la cena está a diez minutos de servirse en la mesa.

Hay gente que mira este nivel de automatización y piensa que es una extravagancia técnica desmedida. Para mí es puro contrapunto estilo Bach: varias voces independientes moviéndose al mismo tiempo, cada una siguiendo una lógica interna rigurosa, creando una armonía perfecta sin pisarse jamás los dedos.
