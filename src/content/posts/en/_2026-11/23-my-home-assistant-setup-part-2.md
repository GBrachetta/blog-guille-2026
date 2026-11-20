---
author: Guillermo Brachetta
title: "My Home Assistant Setup (Part 2): Telemetry, Marriage, and the Art of Never Asking 'Where Are You?'"
description: Multi-sensors in every room imaginable, smart washing machine power curves, and a HomePod that queries Waze traffic to announce Nina's arrival down to the minute.
slug: my-home-assistant-setup-part-2
pubDatetime: 2026-11-23T10:00:00+01:00
featured: false
draft: false
tags:
  - home assistant
  - automations
  - devices
  - sensors
ogImage: ../../../../assets/images/2026-11/23.png
---

![Image](@/assets/images/2026-11/23.png)

In [Part 1](/posts/my-home-assistant-setup-part-1/), I confessed how my adult dignity dissolved into total spoiledness: running a Synology virtual machine with 6 GB of RAM, putting flush Zigbee outlets everywhere, and refusing to touch a wall switch or yell at voice assistants.

A heavy server in the utility cupboard doesn't get you far if your house is basically blind. You can write neat automations all day, yet if the system can't tell where anyone is, what people are doing, or how much daylight is coming through the glass, it's just an expensive clock with big ideas.

So the obsession moved to the next layer: turning every room into a quiet little observation post.

## The Flapping Arm Ritual

Look closely at the corners, doorframes, and shelves around the house and you'll spot small battery-powered multi-sensors tracking temperature, humidity, and light in lux, alongside magnetic contact sensors keeping quiet tabs on exterior doors and windows.

The real game changer, however, was throwing away conventional motion sensors.

Anyone who has lived with basic PIR detectors knows the freeze trap. You sit down on the sofa with a book, stay still for a few minutes while concentrating, and suddenly the room drops into pitch darkness.

From there you have two options: stand up from a comfortable seat, or do a frantic, undignified arm-wave in the dark like someone flagging down a rescue helicopter, just to prove to a five-euro plastic box that you're still breathing.

I was done with that routine. Now the rooms rely on mmWave presence sensors. Instead of waiting for a moving heat blob, millimeter-wave radar picks up tiny chest movements as you breathe. You can sit still reading on the couch for hours and the lights won't blink out once.

Paired with lux thresholds, the house also skips turning on ceiling spots when afternoon sun is already pouring through the windows, no matter how much you pace back and forth. No guessing, just reading the room and staying out of the way.

## Saving the Laundry from Certain Death

Beyond lighting, half the value of home automation is fixing small household traps that wear down everyone's patience.

Take laundry.

Everyone knows the cycle: you load towels or sheets, hit start feeling organized, get pulled into practicing or writing code, and four hours later remember the drum.

You open the utility room door and get hit by that unmistakable sour smell of damp fabric sitting in a closed metal tub. Now you get to wash the whole load again and question your grip on basic adulting.

Both our washer and dryer feed straight into Home Assistant. This isn't about showroom gimmicks—it's about knowing what's actually happening in the utility room.

I can start or adjust cycles remotely, watch which phase the machine is in, and get a heads-up when detergent or soap is running low so nobody launches a full cycle with half a spoonful left.

When a cycle finishes, we aren't counting on quiet beeps behind a closed door. Home Assistant logs the finish, sends a push notification, and has the HomePod announce across the house that the laundry is done. Fewer forgotten damp piles, fewer sour towels.

## The Nina Arrival Protocol

The centerpiece of the whole setup, though, is how we handle the evening drive home.

In any relationship, _"Where are you?"_ gets old fast. One person is navigating wet highway traffic in the dark, the other is trying to time dinner at home, and nobody wants someone texting while merging onto a Dutch ring road.

Telemetry handles it instead: once Nina leaves the office and crosses a geofence, Home Assistant kicks off a script that checks live Waze traffic.

Straight-line distance means nothing when you're dealing with canals, bottlenecks, and bridge openings. It looks at real highway conditions and estimates when she'll actually pull up—down to the minute.

In the living room, the HomePod chimes gently and says:

_"Nina has left work. She will be home at 18:42, in thirty-four minutes."_

No phone calls needed, no texting on the road. I know when to put water on to boil or slide a dish into the oven, and by the time she turns onto the street, the Nuki smartlock is already unlocking the door and dinner is nearly ready.

Some people see this as way too much engineering for a house. To me it feels like counterpoint: separate lines moving together by their own logic, keeping harmony without tripping over each other.
