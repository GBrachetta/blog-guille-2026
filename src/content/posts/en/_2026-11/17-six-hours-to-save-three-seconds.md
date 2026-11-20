---
author: Guillermo Brachetta
title: "How I Taught My Bed to Blind Me at 3 a.m."
description: "How trying to turn the bedroom lights on only when nobody is asleep led to learning how to solder, wiring four sensors under the mattress, and being blinded at 3 a.m. by my own foot."
slug: six-hours-to-save-three-seconds
pubDatetime: 2026-11-17T10:30:00+01:00
featured: false
draft: false
tags:
  - home assistant
  - esp32
  - smart home
  - automations
ogImage: ../../../../assets/images/2026-11/17.png
---

![Image](@/assets/images/2026-11/17.png)

Nobody starts using Home Assistant expecting to spend a weekend soldering wires to tuck under a mattress.

It always starts with a reasonable thought: _"It would be nice if the bedroom lights came on when we walk in, unless one of us is already in bed."_

Walking over to the wall switch takes about three seconds. It works every time. Naturally, I decided to automate it.

## Starting with a presence sensor

My first try was an Aqara FP2 millimeter-wave sensor. In the app, you split the room into zones—a "Bed" zone, a "Transit" zone around the bed, a "Closet" zone—and let the radar track who is where.

On paper, that should have done the trick. In practice, radar struggles to tell a sleeping person under a blanket apart from a pile of pillows. Some afternoons it still thought we were in bed at two o'clock; other nights we'd pull the covers up and vanish from the map completely.

To make the rule actually behave, Home Assistant needed solid proof of whether either of us was in bed.

## Learning to solder for a light bulb

That's how a basic lighting rule turned into a hardware build. I ordered an ESP32, wire, flux, heat-shrink tubing, and two small cell pressure sensors—one for my side of the bed and one for Nina's—and sat down to learn how to solder.

Once the wiring worked and I had ESPHome YAML running, I learned that placing pressure sensors under a mattress is mostly trial and error. Shift a sensor a few centimeters and it stops seeing you the moment you roll onto your side. Put it in the wrong spot on the slats and the mattress weight alone holds it triggered, convincing Home Assistant you've been lying there all day.

I spent a good chunk of an afternoon lifting the mattress, nudging the sensors a little, lying down, checking the phone, getting back up, and repeating the whole loop until the numbers made sense.

## 380 lines of YAML

Once the bed sensors behaved, I wired everything together with the FP2 zones.

What began as _"turn on the light when someone walks in"_ has grown into an automation with **over 380 lines of YAML**, **20 entities**, **68 conditions**, and **21 nested `if` blocks**:

- From 90 minutes before sunset until sunrise, it reads `sensor.bedroom_ight_sensor` (complete with a typo in _"light"_ that is now baked into too many places to rename) to see if the room is below 100 lux.
- When both sides of the bed and the FP2 Bed zone have stayed clear for two minutes, stepping into the Transit zone brings up both bed lights at 100% along with both bedside lamps.
- When one of us is in bed and the other walks in, the sleeping side stays off and the other side comes up at 10%.
- When both of us are in bed, nothing comes on.
- Five `input_boolean` helpers—plus a second automation checking whether a change came from a user or from Home Assistant—keep manual light tweaks from getting overwritten by presence logic until the room empties out.
- When leaving the Closet zone, it fires `turn_off` at the three IKEA bulbs, waits two seconds, and sends it again to whichever bulb decided to ignore the first pass.

## Blinded by my own foot at 3 a.m.

I went to sleep feeling pretty clever. Then, in the middle of the night, I shifted in my sleep.

Because those first cell sensors were small, sliding a little to the side was enough for my sensor to drop out. At the same time, my foot drifted past the edge of the Bed zone and poked into the Transit zone.

As far as Home Assistant could tell, the bed was empty and someone had just walked into the room. So it did its job and blasted light straight into my eyes while I was fast asleep.

## Adding more sensors

When an over-engineered setup fails at 3 a.m., the obvious move is to throw more hardware at it.

Those small cell sensors only worked if you stayed put where you lay down—fine for a statue, less helpful if you actually move at night. Out came the soldering iron for round two. I ordered two 30 cm strip sensors and wired them to the same ESP32 alongside the first pair, bringing the bed up to four sensors under the mattress and turning the underside of our bed into something that looks suspiciously like a bench experiment.

With the wider 30 cm strips, another round of mattress-lifting to dial in placement, and a two-minute hold in Home Assistant before a side counts as empty, I can move my feet at night without triggering a sunrise.

Best of all, it actually works the way I pictured at the start. If one of us is already asleep and the other comes in later, only the open side comes up dimly, with no switch-hunting and nobody woken up.

Doing the math, it took learning to solder, building four bed sensors, and nearly 400 lines of YAML to save three seconds at a wall switch. At three seconds a day, I'll break even right around 2048—assuming no solder joints give up before then. And looking around the rest of the house, I already have a few more ideas.
