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

In [Part 1](/posts/my-home-assistant-setup-part-1/), I confessed how my adult dignity dissolved into total spoiledness: running a Synology virtual machine with six gigabytes of RAM, installing flush Zigbee sockets everywhere, and refusing to touch a wall switch or yell at voice assistants.

Having a powerful server in the utility cupboard, however, is completely pointless if your house is fundamentally blind. You can write all the elegant automations you want, but if the system has no idea where you are, what you are doing, or how much light is coming through the windows, it is just a very expensive clock with delusions of grandeur.

Which brings us to the next stage of the obsession: turning every room into an observational laboratory.

## The Flapping Arm Ritual

If you look closely at the corners, doorframes, and bookshelves in our house, you will find tiny, battery-powered multi-sensors everywhere. They track temperature, humidity, and ambient illuminance in lux. On the external doors and windows, magnetic contact sensors keep quiet inventory.

The real game changer, however, was throwing away conventional motion sensors.

Anyone who has ever lived with basic passive infrared (PIR) detectors knows the special humiliation of the freeze. You sit down on the sofa with a book or a musical score. You stay completely still for three minutes, completely absorbed in what you are doing. Suddenly, the room plunges into pitch black darkness.

At that point, you have two choices: get up from your comfortable chair, or perform an undignified, frantic arm dance in the dark like a drowning sailor trying to flag down a helicopter, just to convince a five-euro plastic sensor that your heart hasn't stopped beating.

I reached my limit with that nonsense. Today, the house runs on micro-radar (mmWave) presence sensors. Unlike old infrared sensors that only detect a moving heat signature, micro-radar detects the microscopic movement of your chest expanding and contracting as you breathe. You can sit perfectly still on the sofa for three hours reading, and the lights will not flicker once.

Even better, they work alongside ambient light thresholds. If the afternoon sun is blazing through the front windows, the house knows that turning on ceiling spotlights would be pure stupidity, no matter how many times you walk back and forth. The house does not guess. It looks, it calculates, and it stays out of the way.

## Saving the Laundry from Certain Death

Beyond lighting, the real triumph of home automation is solving ancient domestic catastrophes that have plagued relationships since the invention of running water.

Take the washing machine.

Every household on earth knows the tragedy. You put a load of towels or bedsheets into the drum, start the cycle, and walk away feeling virtuous. You get caught up in your day, sit down at the harpsichord, or start writing code. Four hours later, a wave of cold dread hits you: the laundry.

You run to the utility room, open the door, and are greeted by that unmistakable, sour smell of wet fabric that has been stewing in a closed steel drum. The cycle is ruined. The day is ruined. Now you have to wash everything all over again while questioning your fitness as a functional adult.

In our house, both the washing machine and the dryer are connected appliances integrated straight into Home Assistant. This is not about having an appliance that looks futuristic on a showroom floor; it is about total operational awareness.

I can programme cycles remotely, adjust settings, and monitor real-time telemetry on exactly what stage the drum is in. The machines even keep track of consumables, reporting directly to Home Assistant when the liquid detergent or soap reservoir is running low, so you never accidentally launch an hour-long cycle with half a teaspoon of soap.

And the second the cycle finishes, there is no relying on weak electronic beeps muffled behind a closed utility room door. Home Assistant registers the completion, pings our phones, and the HomePod softly announces across the house that the laundry is waiting. No forgotten wet heaps, no sour towels, and no domestic laundry amnesia.

## The Nina Arrival Protocol

The undisputed crown jewel of our entire setup, however, is how Home Assistant handles the evening commute.

In any partnership, the daily question of _"Where are you?"_ is a constant source of low-level stress. One person is driving across traffic-choked highways in the rain, the other is at home trying to time dinner, and neither of them should be sending text messages while merging onto a Dutch ring road in the dark.

Instead, we let the telemetry do the work.

When Nina leaves her office, her phone crosses a geofence. Home Assistant doesn't just register that she departed; it immediately fires a script that queries the live Waze traffic API.

It doesn't calculate straight-line distance, which is useless in a country full of canals and sudden bridge openings. It analyzes real-time highway congestion, detects backups, and calculates her arrival down to the minute.

Back in our living room, the HomePod chimes softly and speaks in a calm, civilized tone:

_"Nina has left work. She will be home at 18:42, in thirty-four minutes."_

I don't have to call. She doesn't have to touch her phone. I know exactly when to boil the water for pasta or slide a tray into the preheated oven. And by the time her car turns into the street, the Nuki lock is already unlocking the door, and dinner is ten minutes from the table.

Some people look at this level of automation and see unnecessary technical indulgence. I see it as counterpoint: multiple independent voices moving at the same time, each following strict internal logic, creating perfect harmony without ever stepping on each other's toes.
