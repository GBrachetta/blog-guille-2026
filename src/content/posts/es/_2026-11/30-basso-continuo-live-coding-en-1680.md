---
author: Guillermo Brachetta
title: "Basso continuo: Cuando el compositor solo escribe la mitad de las notas"
description: Por qué tocar bajo cifrado en el clave se parece menos a leer música clásica y más a una negociación de emergencia frente al público.
slug: basso-continuo-live-coding-en-1680
pubDatetime: 2026-11-30T10:00:00+01:00
featured: false
draft: false
tags:
  - música barroca
  - clave
  - software
ogImage: ../../../../assets/images/2026-11/30.png
---

![Image](@/assets/images/2026-11/30.png)

Si alguna vez mirás por encima del hombro de un clavecinista durante un concierto, podrías pensar que se equivocó de partitura.

En el atril hay una hoja de música, pero el compositor se tomó la molestia de escribir una única línea para la mano izquierda. Por debajo de las notas asoman algunos números diminutos y enigmáticos (un `6`, un `4/2`, un `7`, un sostenido solitario), y para la mano derecha, absolutamente nada. Papel en blanco.

Esto es el _basso continuo_ (o bajo cifrado) y, durante unos dos siglos, fue los cimientos de prácticamente toda la música europea. El compositor te daba la línea de bajo, te decía qué intervalos iban por encima y dejaba el resto librado a tu conciencia. Tenías que inventar la armonía, la disposición de las voces, el ritmo y la textura en vivo sobre el escenario, frente a una sala de cuatrocientas personas que fueron a escuchar a Bach, no a presenciar tu ataque de pánico.

## Una API de 1680

Cuando empecé a escribir código para la web, la analogía me cayó como un rayo: el bajo cifrado es, en esencia, la especificación de una API del siglo XVII.

En una pieza para piano del siglo XIX o XX, todo está escrito en la partitura. (Por supuesto, si _únicamente_ tocás lo que está escrito sin frasear, sonás como una pianola mecánica de 1905, pero al menos nadie te puede acusar de haber pifiado las notas).

El bajo cifrado no te dice qué notas tocar. Solo define el contrato.

La nota del bajo provee el cimiento, y los numeritos describen los intervalos que tienen que construirse por encima. Un `6` significa que tocás una sexta sobre el bajo en lugar de la quinta habitual. Un sostenido suelto significa que la tercera es mayor. Si no hay ningún número, tocás un acorde común en estado fundamental y tratás de no poner cara de terror.

La manera en que transformás esa fórmula en sonido depende por completo del drama del momento:

- Si una soprano está cantando un aria desgarradora sobre traición y veneno (que, en la ópera barroca, es básicamente el argumento entero), tocás dos notas suaves por compás para no arruinarle el momento trágico.
- Si toda la orquesta entra a pleno para una escena de batalla, manoteás diez notas al mismo tiempo, quebrás acordes alternando ambos teclados y tratás de que una caja con cuerdas de alambre suene como artillería pesada.

Tenés las reglas del contrato, pero la implementación corre por tu cuenta.

## Errores de ejecución sobre el escenario

El motivo por el cual el bajo continuo es fascinante (y, por momentos, aterrador) es que todo pasa en tiempo real.

Cuando escribo software, si cometo un error de lógica o calculo mal un índice, TypeScript chilla en el editor antes de que nadie lo vea. Si algo se rompe, lo arreglo tranquilo y en privado.

Arriba del escenario, no hay ningún compilador que te salve el pellejo.

Si leés mal un `6/5` en medio de un recitativo delicado, el choque armónico retumba en toda la nave de la iglesia. A la cantante se le suben las cejas hasta la nuca, el violonchelista de al lado te clava una mirada de profunda preocupación y a vos no te queda otra que mantener una compostura de hierro, asentir con gravedad y poner cara de que semejante discordancia fue una decisión premeditada de altísima carga dramática.

Para sumar entretenimiento, además tenés que respetar la conducción clásica de voces mientras vas improvisando los acordes. No podés mover las manos en quintas u octavas paralelas con el bajo; si lo hacés, todos los profesores de conservatorio de la historia se van a revolver en sus tumbas. Tu cerebro corre una lista mental invisible mientras tus dedos se mueven: _¿Hacia dónde va el bajo? ¿Con qué dedo estoy tocando la sensible? ¿Resolví esa séptima o la dejé colgada en el aire?_

## ¿Por qué no escribir directamente las notas?

Mucha gente suele preguntar por qué los compositores no se limitaban a escribir la mano derecha y ahorrarles los nervios a todos.

En parte era una cuestión práctica. Cuando Händel tenía que entregar una ópera entera en tres actos antes de que arrancara la temporada de teatro, ahorrarse la mitad de la tinta en cada página era una cuestión de supervivencia.

Pero hay motivos mucho más profundos por los cuales un compositor barroco jamás hubiera querido fijar la mano derecha en el papel:

### 1. La música como discurso, no como relojería

La música barroca es retórica. Está diseñada para persuadir, conmover y declamar como un orador clásico, no para marcar el paso como un reloj suizo. En un recitativo, el cantante está prácticamente declamando poesía elevada. Si el compositor congela la mano derecha en negras impresas, el ritmo natural de la lengua muere en el acto. El tecladista tiene que escuchar las consonantes, respirar con el cantante, colocar un acorde como quien pone una coma en una frase y, a veces, esperar en absoluto silencio mientras la tensión dramática queda flotando en la sala.

### 2. Composición e interpretación eran el mismo arte

En 1680, la moderna división del trabajo no existía. No existía el concepto del "músico puro" que solo reproduce el plano terminado de otro. Si te sentabas al teclado y no sabías resolver una línea de bajo con soltura y elegancia, no te consideraban un artista: eras apenas un mecanógrafo. El compositor esperaba que fueras un socio musical, completando la obra con él en esa tarde específica.

### 3. El horror de tocar dos veces el mismo acorde

En las formas barrocas, la repetición está por todos lados. Las arias repiten su primera sección, las danzas tienen segundas partes y los temas vuelven. Tocar exactamente los mismos acordes en la mano derecha durante una repetición hubiera sido un insulto artístico para el público. Dejar la partitura abierta le permitía al intérprete arrancar simple, y en la repetición meter contramelodías, cambiar de registro, arpegiar con ritmos nuevos o reducir todo a un susurro.

Y por supuesto, la acústica del lugar juega su papel. Un salón seco necesita más acordes para mantener vivo el sonido; una catedral imponente con cuatro segundos de reverberación te exige tocar la mitad de las notas para que la música no se convierta en una sopa incomprensible.

Trescientos años después, sentarse al clave con nada más que una línea de bajo y un par de números sigue siendo el mejor antídoto contra un mundo rígido. No estás desempolvando una pieza de museo; estás manteniendo viva una conversación.
