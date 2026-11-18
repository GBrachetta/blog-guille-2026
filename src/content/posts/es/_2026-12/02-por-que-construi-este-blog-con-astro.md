---
author: Guillermo Brachetta
title: "Por qué construí este blog con Astro, Pages CMS y Remark42"
description: Cómo armé un blog estático y veloz que vive en Git, tiene un editor visual cuando lo necesito y aloja comentarios privados sin rastreo.
slug: por-que-construi-este-blog-con-astro
pubDatetime: 2026-12-02T15:00:00+01:00
featured: false
draft: false
tags:
  - software
  - astro
  - desarrollo web
ogImage: ../../../../assets/images/2026-12/02.png
---

![Image](@/assets/images/2026-12/02.png)

Cualquier programador que decide empezar un blog tiene que pasar primero por el mismo ritual exacto: pasarse tres semanas sobrediseñando el motor de publicación, ajustando los colores del tema de sintaxis a las dos de la mañana, retocando las tipografías por fracciones de milímetro y después, habiendo construido con éxito la plataforma de escritura definitiva, no escribir jamás ni un solo post.

Es la forma perfecta de procrastinación, porque se siente exactamente como trabajar.

Cuando decidí reconstruir mi blog para 2026, intenté mantener el drama interno al mínimo. Ya sabía lo que quería y, más importante todavía, con qué cosas me negaba a convivir.

## Lo que no quería

No quería WordPress. Construí un montón de sitios complejos en mi vida, y lo último que quiero un domingo a la mañana es un mail de un servidor de base de datos alertándome de que un plugin de PHP que instalé hace cinco años abrió un agujero de seguridad crítico.

Tampoco quería publicar en plataformas como Medium o Substack. Detesto leer artículos a través de una neblina de banners flotantes, pop-ups rogando por una dirección de mail y muros de pago que te piden iniciar sesión antes de que puedas terminar una frase. Si voy a escribir algo, quiero ser dueño del texto, alojarlo en mi propio dominio y no someter a los lectores a una carrera de obstáculos.

Y finalmente, no quería un framework pesado de JavaScript. Armar un blog personal de texto con Next.js o React es como alquilar una grúa de construcción para colgar un portaretrato: impresionante de ver, pero absurdamente innecesario para renderizar párrafos de texto.

## Texto plano y Astro

Lo que realmente quería era algo casi aburrido: simples archivos Markdown en un repositorio de Git que compilan a HTML estático y ultrarrápido.

Eso me llevó a [Astro](https://astro.build/). En lugar de mandarle un paquete gigante de JavaScript a tu navegador solo para que puedas leer un párrafo, Astro hace todo el trabajo en el servidor durante el build. Lo que llega a tu pantalla es HTML y CSS limpio y simple. Las páginas cargan al instante, las búsquedas corren de forma local a través de Pagefind sin enviar datos a terceros, y no hay ninguna base de datos que mantener ni respaldar.

Empecé con el tema [AstroPaper](https://github.com/satnaing/astro-paper), ajusté el diseño, incorporé mi tipografía y sumé modo oscuro e imágenes Open Graph.

La belleza de este planteo es la longevidad. Si Astro o Netlify desaparecen por completo de acá a diez años, mi blog no queda atrapado en un volcado de SQL. Es simplemente una carpeta de texto legible en Markdown guardada en mi disco.

## Pages CMS para los momentos de pereza

Todo programador se repite a sí mismo la misma noble mentira: _"No necesito un CMS, voy a abrir la terminal, escribir en Markdown, commitear y pushear."_

Esto suena muy disciplinado hasta que estás viajando en tren, mirás el teléfono y descubrís un error de ortografía flagrante en un título que publicaste hace tres horas. En ese instante, no querés sacar la laptop, abrir la terminal, crear una rama y tirar comandos de git. Solo querés una página web limpia donde corregir la letra, apretar guardar y seguir tomándote el café.

Por eso sumé [Pages CMS](https://pagescms.org/). No requiere ninguna configuración de base de datos: simplemente ponés un pequeño archivo `.pages.yml` en tu repositorio y te da un editor visual limpio y sin distracciones directo en el navegador.

Cuando hacés clic en guardar, Pages CMS se conecta a GitHub y comitea el cambio por vos tras bambalinas. Si estoy en el escritorio programando, edito los archivos `.md` crudos en mi editor. Si estoy con el iPad o lejos de la máquina, abro el editor del navegador. Ambos flujos tocan exactamente el mismo repositorio de Git.

## Comentarios sin vigilancia: El desvío por Giscus

Un sitio estático es una maravilla hasta que querés que los lectores puedan dejarte un comentario.

Los sistemas tradicionales de comentarios suelen ser un espanto. O rastrean a tus visitantes por todo internet con cookies publicitarias, o se convierten en un pueblo fantasma tapado de bots tratando de vender remedios dudosos.

Al principio conecté [Giscus](https://giscus.app/), que utiliza las Discusiones de GitHub por detrás. Desde una perspectiva puramente técnica parecía brillante: sin bases de datos para mantener, cero huella en el servidor y casi nada de spam.

Hasta que la realidad me tocó el hombro.

Mi audiencia no está compuesta únicamente por desarrolladores que viven adentro de una terminal. Pretender que un clavecinista, un aficionado a la música barroca o alguien curioso por Home Assistant se cree una cuenta de desarrollador en GitHub solo para dejar un comentario de dos líneas es un disparate total. Genera una barrera de entrada absurda.

Así que pegué el volantazo hacia [Remark42](https://remark42.com/).

Remark42 es un motor de comentarios liviano y enfocado en la privacidad, escrito en Go. En vez de regalarle los datos de los comentarios a un tercero o exigir un inicio de sesión de desarrollador, lo autoalojo en un contenedor Docker liviano en mi NAS Synology en casa. Vive detrás de un subdominio cifrado, usa una base de datos embebida y respeta a los lectores.

Cualquiera puede comentar con un simple enlace mágico al correo o de forma anónima, sin cookies de publicidad, píxeles de rastreo ni vigilancia algorítmica. Y encima me permitió armar un mapeo bilingüe: lean el artículo en inglés o en español, todos participan exactamente de la misma conversación.

## El verdadero peligro

El verdadero problema de armar un stack tan limpio (Astro para velocidad estática, Pages CMS para editar, Remark42 para comentarios privados y compilaciones automáticas diarias) es que te quedás sin excusas técnicas.

Ya no hay servidores para afinar, ni plugins para actualizar, ni archivos de configuración con los que perder el tiempo. En algún momento, tenés que plantarte frente al cursor titilando en la pantalla en blanco y, efectivamente, escribir algo.
