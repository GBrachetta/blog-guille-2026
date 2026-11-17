---
author: Guillermo Brachetta
title: "How I Taught My Bed to Blind Me at 3 a.m."
description: "How trying to turn the bedroom lights on only when nobody is asleep led to learning how to solder, wiring four sensors under the mattress, and being blinded at 3 a.m. by my own foot."
featured: false
pubDatetime: 2026-11-17T10:30:00+01:00
slug: six-hours-to-save-three-seconds
draft: false
tags:
  - home-assistant
  - esp32
  - smart-home
  - automation
---

Nobody starts using Home Assistant thinking they are going to spend the weekend soldering wires to put under a mattress.

It always starts with a simple, reasonable idea: _"It would be nice if the bedroom lights turned on when we walk in, unless one of us is already in bed."_

Walking to the switch on the wall takes about three seconds. It works every time. Naturally, I decided to automate it.

## Starting with a presence sensor

My first attempt was an Aqara FP2 millimeter-wave sensor. In the app, you divide the room into zones (a "Bed" zone, a "Transit" zone around the bed, a "Closet" zone) and the sensor tracks where people are in the room.

On paper, that should have been enough. In reality, radar has a hard time telling the difference between a person sleeping under a blanket and a pile of pillows. Sometimes it thought we were still in bed at two in the afternoon; other times we would pull the covers up and disappear from the map completely.

To make the automation actually work, Home Assistant needed to know for sure whether either of us was in bed.

## Learning to solder for a light bulb

That is how a simple lighting rule turned into a hardware project. I ordered an ESP32, wires, flux, heat-shrink tubing, and two small cell-like pressure sensors (one for my side of the bed and one for Nina’s) and sat down to learn how to solder.

Once I got the wiring working and wrote the ESPHome YAML, I found out that putting pressure sensors under a mattress is mostly trial and error. If the sensor is a few centimeters off, it stops detecting you the moment you turn on your side. If you put it in the wrong spot on the slats, the weight of the mattress itself triggers it, so Home Assistant thinks you are in bed all day.

So I spent a good part of an afternoon lifting the mattress, moving the sensors a little bit, lying down, checking the readings on my phone, getting up, and doing it again until the numbers looked right.

## 380 lines of YAML

With the bed sensors working, I put everything together with the FP2 zones.

What started as "turn on the light when someone walks in" is now an automation with **over 380 lines of YAML**, **20 entities**, **68 conditions**, and **21 nested `if` blocks**:

- From 90 minutes before sunset until sunrise, it checks `sensor.bedroom_ight_sensor` (with a typo in "light" that is now in too many places to rename) to see if the room is darker than 100 lux.
- If both sides of the bed and the FP2 Bed zone have been clear for two minutes, walking into the Transit zone turns on both bed lights at 100% and both bedside lamps.
- If one of us is in bed and the other walks in, the sleeping side stays off and only the other side turns on at 10%.
- If both of us are in bed, nothing turns on.
- Five `input_boolean` helpers (plus a second automation that checks whether a change came from a user or from Home Assistant) make sure that if we change a light manually, the presence sensor doesn't undo it until the room is empty.
- And at the end, when leaving the closet zone, it sends the `turn_off` command to the three IKEA bulbs, waits two seconds, and sends it again to whichever bulb decided to ignore the first one.

## Blinded by my own foot at 3 a.m.

I went to sleep very happy with the setup. Then, in the middle of the night, I moved in my sleep.

Because those first cell sensors were quite small, moving just a bit to the side was enough for the sensor to think I was no longer in bed. At the same time, my foot moved just outside the edge of the Bed zone and entered the "Transit" zone.

As far as Home Assistant knew, nobody was in bed and someone had just walked into the bedroom. So it did its job and turned the lights on in my face while I was fast asleep.

## Adding more sensors

Clearly, when an over-complicated system fails at 3 a.m., the only logical solution is to add more hardware to it.

The small cell sensors only worked if you slept in the exact spot where you lay down, which is fine for a statue, less so for a normal person. So the soldering iron came out of the drawer for round two. This time I ordered two 30 cm strip sensors and wired them to the same ESP32 alongside the original ones, bringing the bed up to four sensors under the mattress (and turning the underside of our bed into something that looks suspiciously like a laboratory experiment).

Between the wider 30 cm strips, a bit more lifting the mattress to get the placement right, and a two-minute delay in Home Assistant before a side of the bed is officially considered empty, I can now move my feet at night without triggering a sunrise.

And the funny thing is that now it actually works the way I originally imagined. When one of us is already asleep and the other comes in later, only the empty side of the bed turns on dimly, without touching a switch or waking anyone up.

If you do the math, it took learning to solder, building four bed sensors, and nearly 400 lines of YAML to save three seconds at the wall switch. At three seconds a day, I should break even sometime around 2048 (assuming none of the wires come loose before then). And looking at the rest of the house, I already have a few more ideas.
