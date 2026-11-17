---
author: Guillermo Brachetta
title: "Basso Continuo: When the Composer Only Writes Half the Notes"
description: "Why playing figured bass on the harpsichord feels less like reading classical music and more like an emergency negotiation in front of an audience."
slug: basso-continuo-live-coding-in-1680
pubDatetime: 2026-11-30T10:00:00+01:00
featured: false
draft: false
tags:
  - early-music
  - harpsichord
  - software
ogImage: ../../../assets/images/2026-11/30.png
---

![Image](@/assets/images/2026-11/30.png)

If you ever glance over a harpsichordist's shoulder during a concert, you might think they brought the wrong score.

On the desk is a page of music, but the composer only bothered to write one single line for the left hand. Underneath the notes there are a few tiny, cryptic numbers (a `6`, a `4/2`, a `7`, a lonely sharp), and for the right hand, absolutely nothing. Pure blank paper.

This is _basso continuo_ (or figured bass), and for roughly two centuries, it was the foundation of practically all European music. The composer gave you the bass line, told you which intervals belonged above it, and left the rest to your conscience. You had to invent the harmony, the voicing, the rhythm, and the texture live on stage, in front of an audience of four hundred people who came to hear Bach, not your panic.

## An API from 1680

Once I started writing code for the web, the parallel struck me immediately: figured bass is essentially an API specification from the seventeenth century.

In a modern piano piece, everything is on the page. (Of course, if you _only_ play what is written without phrasing, you sound like a mechanical player piano from 1905, but at least nobody can accuse you of picking the wrong notes.)

Figured bass does not tell you what to play. It only defines the contract.

The bass note provides the foundation, and the little numbers describe the intervals that must sit on top of it. A `6` means you play a sixth above the bass instead of the usual fifth. A sharp means the third is major. If there is no number at all, you play a standard root-position chord and try not to look terrified.

How you actually turn that formula into sound depends entirely on the theatre of the moment:

- If a soprano is singing a heartbreaking aria about betrayal and poison (which, in baroque opera, is basically the entire plot), you play two quiet notes at a time so you don't ruin her tragic moment.
- If the entire orchestra enters for a battle scene, you grab ten notes at once, break chords across both keyboards, and try to make a box of plucked wires sound like artillery.

You have the rules of the contract, but the implementation is completely yours.

## Runtime errors on stage

The reason basso continuo is exhilarating (and occasionally terrifying) is that everything happens in real time.

When I write software, if I make a logic mistake or miscalculate an array, TypeScript complains in my editor before anyone sees it. If something breaks, I fix it quietly in private.

On stage, there is no compiler to save you.

If you misread a `6/5` in the middle of a delicate recitative, the clash rings through the entire church hall. The singer's eyebrows shoot into their forehead, the cello player next to you glances sideways with deep concern, and you have to maintain complete composure, nod solemnly, and pretend that painful crunch was an intentional piece of dramatic expression.

To make things more entertaining, you also have to follow classical voice leading while you invent the chords. You cannot just move your hands in parallel fifths or octaves with the bass; if you do, every conservatory professor who ever lived will roll over in their grave. Your brain is running an invisible checklist while your hands are moving: _Where is the bass going? Which finger is on the leading tone? Did I resolve that seventh, or did I just leave it hanging in mid-air?_

## Why not just write the notes?

People often ask why composers didn't simply write out the right hand and save everyone the nerves.

Part of it was practical. When Handel had to finish an entire three-act opera before the theatre season opened, saving half the ink on every page was a matter of survival.

But there are far deeper reasons why a Baroque composer would never have wanted a fixed right-hand part:

### 1. Music as speech, not clockwork

Baroque music is rhetoric. It is designed to persuade, move, and declaim like a classical orator, not tick like a Swiss clock. In a recitative, the singer is essentially speaking heightened poetry. If the composer freezes the right hand into printed quarter notes, the natural rhythm of the language dies immediately. The keyboardist has to listen to the consonants, breathe with the singer, place a chord like a comma in a sentence, and sometimes wait in complete silence while the drama hangs in the room.

### 2. Composition and performance were the same art

In 1680, the modern division of labour did not exist. There was no concept of a "pure performer" who only reproduces somebody else's finished blueprint. If you sat at a keyboard and could not realize a bass line with elegance, you were not considered an artist, you were just a typist. The composer expected you to be a musical partner, completing the composition with him on that specific afternoon.

### 3. The horror of playing the same chord twice

In Baroque form, repetition is everywhere. Arias repeat their first section, dances have second halves, and themes return. Playing the exact same right-hand chords on a repeat would have been an artistic insult to the audience. Leaving the score unwritten allowed the player to start simple, and on the repeat introduce counter-melodies, change registers, arpeggiate in new rhythms, or strip everything back to a whisper.

And of course, room acoustics play their part. A dry salon needs more chords to keep the sound alive; a booming cathedral with four seconds of echo demands that you play half as many notes so the music does not turn into soup.

Three hundred years later, sitting at the harpsichord with nothing but a bass line and some numbers still feels like the ultimate antidote to a rigid world. You are not dusting off a museum artifact; you are keeping a living conversation going.
