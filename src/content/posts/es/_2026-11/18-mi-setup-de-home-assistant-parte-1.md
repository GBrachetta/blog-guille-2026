---
author: Guillermo Brachetta
title: "Mi setup de Home Assistant (Parte 1): La infraestructura de la comodidad absoluta"
description: De una humilde máquina virtual de 2 GB en un NAS Synology a 128 GB de almacenamiento local, enchufes Zigbee embutidos por todos lados y la negativa rotunda a tocar una llave de luz física.
slug: mi-setup-de-home-assistant-parte-1
pubDatetime: 2026-11-18T10:00:00+01:00
featured: false
draft: false
tags:
  - home assistant
  - domótica
  - dispositivos
  - hardware
ogImage: ../../../../assets/images/2026-11/18.png
---

![Image](@/assets/images/2026-11/18.png)

Si querés saber el momento exacto en el que colapsó mi dignidad como adulto funcional, te puedo dar la fecha con precisión.

Fue un martes a la tarde en noviembre, a eso de las tres y diecisiete. Crucé la puerta de entrada cargando cuatro bolsas a punto de reventar del supermercado, cerré la puerta de una patada con el talón y vi cómo las luces de la cocina se encendían exactamente al cuarenta por ciento de calidez. Sin tocar interruptores. Sin manos. Y sin tener que gritarle a un estúpido aparato de plástico arriba de la mesada.

Me quedé parado en el pasillo, solté las bolsas y me cayó la ficha: estoy arruinado. Me volví una persona totalmente malcriada. Hace seis meses que no aprieto una llave de luz en la pared, y si alguien me pide que lo haga ahora, lo siento como un insulto personal inaceptable.

Y ni me hagan hablar de los asistentes de voz. Gritar _«Oye Siri, bajá la lámpara al setenta por ciento»_ mientras tu pareja intenta concentrarse en la misma habitación en su libro no es vivir en el siglo veintiuno. Es simplemente pegarle gritos a un cilindro sordo como un desquiciado en medio de tu propio living. Si tengo que negociar en voz alta con un electrodoméstico, la tecnología ya me falló antes de empezar. El verdadero lujo es el silencio absoluto. La casa tiene que observar, calcular y salir del medio.

Para lograr semejante despliegue sin prender fuego las cortinas, sin embargo, necesitás potencia de cálculo en serio. Y así fue como mi armario de la habitación de servicio se fue transformando lentamente en un departamento de sistemas.

## La escalada del Synology

La gente normal se compra una Raspberry Pi, le mete una tarjeta SD, la envuelve con cinta aisladora y reza. Yo toco el clave y trabajo con software; ya vi morir suficientes discos rígidos e instrumentos de madera por culpa de la humedad como para saber que el hardware frágil siempre revienta un domingo a las nueve de la noche, justo cuando más lo necesitás.

Así que Home Assistant corre en una máquina virtual adentro de mi Synology NAS.

Arrancó de manera bastante inocente. Le di a la máquina virtual dos gigas de RAM y treinta y dos gigas de disco. Me autoconvencí de que era apenas para un par de lamparitas y la calefacción. Después descubrí las integraciones personalizadas. Después sumé Zigbee. Dos gigas pasaron a ser cuatro porque la base de datos empezó a transpirar. Cuatro pasaron a ser seis porque me niego rotundamente a que mi casa tenga lag.

¿Y el disco virtual? Treinta y dos gigas se duplicaron a sesenta y cuatro, y sesenta y cuatro pasaron a ser ciento veintiocho gigas. Llegué a decirle a Nina, en voz alta y con desparpajo: «Ciento veintiocho gigas en un NAS Synology tendrían que alcanzar para toda la vida».

Jamás digas eso. El universo te escucha siempre. El karma acecha. Pero en este momento, esa máquina virtual es un tanque de guerra. Maneja cientos de entidades, coordinadores Zigbee locales y protocolos de red, y ni un solo byte sale de la casa para consultar un servidor en la nube en California.

## Enchufes embutidos y la cirugía de los tomacorrientes

Una vez que el servidor corre como una planta industrial, los enchufes inteligentes externos te parecen una ofensa.

Comprás un enchufe inteligente estándar, lo clavás en la pared y de golpe tenés un tumor de plástico blanco que sobresale diez centímetros en medio de la habitación. Te tapa el enchufe de al lado, junta tierra y parece una pinchadura clandestina de cables estilo La Matanza pegada al zócalo.

Así que me pasé varios fines de semana con un multímetro, destornilladores aislados y una linterna de minero en la cabeza cambiando los tomacorrientes de las paredes. Cada una de las bocas es ahora un enchufe Zigbee embutido que queda al ras del yeso. Mejor todavía: tienen dos puertos USB integrados en la misma placa, lo que significa no tener que andar cazando cargadores atrás de la mesa de luz nunca más. Reportan potencia, voltaje y estado en tiempo real directamente al NAS, y cualquier visita que entra no tiene la menor idea de que está mirando un nodo de radio.

## El despertar suave: Barroco aleatorio y agua hirviendo

Lo que me lleva a las mañanas, donde este artefacto literalmente me salva la vida.

Tengo cero tolerancia a las alarmas estridentes o a que me encandilen las luces de la cocina. Nuestra rutina matutina arranca con una playlist de Apple Music llamada «Good morning», que sincroniza a través de Music Assistant directamente adentro de Home Assistant. Empieza a subir el volumen por los parlantes tan suavemente que casi no te das cuenta, y la automatización se asegura de mezclarla en modo aleatorio todos los días. Una mañana te despertás con una cantata de Graupner, a la siguiente con Mozart, a la otra con Rameau. Nunca la misma secuencia, jamás predecible.

En el mismísimo instante, la iluminación se comporta como un mayordomo educadísimo. No te prende todas las luces de la cocina y el comedor para dejarte ciego. Prende únicamente la luz de la mesa del comedor y la de la bacha, y las clava estrictamente al diez por ciento de brillo. Apenas la luz suficiente para no pisar nada, sin calcinarte la retina.

¿Y la pava eléctrica? No toco el teléfono. La automatización de la mañana prende la pava sola. Para cuando logro arrastrarme de abajo del edredón y llego a la cocina, el agua ya está hirviendo. Algunos lo llaman excesivo. Yo lo llamo legítima defensa contra la mañana.

## El protocolo de autopista y el horno precalentado

Y después está el horno.

Cada vez que alguien se entera de que mi horno tiene Wi-Fi, revolea los ojos. «¿Para qué cuernos necesita internet un horno, Guille? ¿Acaso el pan leuda mejor si tiene dirección IP?»

Acá está el porqué: paso tardes enteras ensayando en Amsterdam, seguidas de un viaje largo y agotador de vuelta por la autopista, en la oscuridad y bajo la lluvia. Cuando estás a cuarenta minutos de tu casa un martes helado, lo último que querés es llegar, prender un horno frío y esperar media hora a que el hierro fundido y el acero lleguen a doscientos grados antes de poder siquiera empezar a cocinar.

Ni siquiera toco una aplicación mientras manejo. Con Home Assistant rastreando la telemetría de mi viaje, en el momento exacto en que calcula que estoy a una hora de casa, prende el horno completamente solo. Si a la mañana tuve la lucidez de dejar un asado o una cazuela sazonada esperando adentro del horno frío, ni siquiera tengo que esperar a que se cocine la cena. No tenemos ni que ponernos a pescar las llaves bajo la lluvia en cada uno de los 10 bolsillos, porque nuestra cerradura inteligente Nuki detecta que nos acercamos y destraba la puerta de entrada por nosotros. Entrás derecho, te sacás el abrigo y la casa te recibe con el perfume de una comida horneada a fuego lento que terminó de cocinarse hace veinte minutos.

Podrán reírse de la domótica todo lo que quieran, pero cuando entrás por la puerta en una noche lluviosa de invierno holandés y te encontrás con comida caliente y té sin haber tocado una sola llave ni un solo interruptor en todo el día, no te sentís un nerd. Te sentís un rey que por casualidad aprendió a configurar archivos YAML.

Por supuesto, mantener las luces automatizadas y la comida en marcha es apenas la parte cómoda. En la Parte 2, las cosas se van un poco de las manos: sensores en cada rincón imaginable, usar curvas de consumo eléctrico en el lavarropas para evitar que la ropa limpia se pudra adentro, y rastrear el viaje de Nina por Waze para que el HomePod anuncie su llegada con precisión de cirujano.
