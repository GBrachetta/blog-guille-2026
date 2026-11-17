---
author: Guillermo Brachetta
title: "Mozart’s Dice Game"
description: "How I wrote both the music and the JavaScript for my take on Mozart’s Musical Dice Game."
featured: true
pubDatetime: 2026-11-17T09:30:00+01:00
slug: mozarts-dice-game
draft: false
tags:
  - early-music
  - harpsichord
  - software
  - javascript
ogImage: ../../assets/images/mozarts-dice-game.png
---

In the 18th century, there was a popular parlor trick called a _Musikalisches Würfelspiel_, or Musical Dice Game. The most famous one was published in 1792 and attributed to Mozart. The idea is simple: you have a stack of short musical fragments and a table of numbers. You roll two dice for each bar, look up the corresponding fragment in the table, and put together a piece of music without needing to know anything about composition.

A while ago, I went looking for a good version of it online. Most of the ones I found were either broken, didn't work on mobile, or sounded terrible because each bar was just a rigid MIDI file with an awkward gap before the next one started.

Since I spend half my life around early music and the other half writing code, I figured I could build a better one. That became [Musical Dice](https://gbrachetta.github.io/Musical-Dice/).

![Musical Dice](@/assets/images/mozarts-dice-game.png)

## Writing the music first

At first I thought about using the original 1792 score, but once I started playing with the idea, I wanted to write the music myself.

In the historical game, you swap out one bar at a time. Technically that works, but musically a single bar is very short. It’s hard to get a real sense of phrasing when the music changes direction every three beats.

So I changed the structure a bit. Instead of single bars, I used two-bar fragments. I wrote 12 complete pieces in triple time, each 24 bars long (basically a theme and 11 variations that all follow the exact same harmonic plan).

Because all 12 pieces share the same harmony at every step, you can take bars 1 and 2 from the first piece, follow them with bars 3 and 4 from the seventh, then jump to the fourth piece for bars 5 and 6, and it all holds together. The end of any fragment leads naturally into the beginning of the next one.

With 12 choices for each of the 12 two-bar sections, there are $12^{12}$ possible pieces you can get. That works out to about 8.9 trillion combinations, so almost every roll gives you a piece that hasn't been heard before.

## Getting it to play smoothly in the browser

Once the music was ready, the main technical problem was the audio.

If you just load a bunch of MP3s in JavaScript and play the next one when the previous one ends, the browser leaves a tiny gap between files. In music, even a fraction of a second ruins the pulse, and on an instrument like the harpsichord, cutting off the resonance between bars sounds unnatural.

To fix that, I used [Howler.js](https://howlerjs.com/) to handle preloading and playback timing, and spent a lot of time making sure the cuts between fragments lined up cleanly. You can either roll the dice and let the app pick all 12 sections for you, or click through the grid yourself to test different combinations before hitting play.

If you want to try it out, you can play with [Musical Dice here](https://gbrachetta.github.io/Musical-Dice/), or look at the [code on GitHub](https://github.com/GBrachetta/Musical-Dice).
