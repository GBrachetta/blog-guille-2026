---
author: Guillermo Brachetta
title: "My Home Assistant Setup (Part 1): The Infrastructure of Total Spoiledness"
description: From a 2 GB VM on a Synology NAS to 128 GB of local storage, flush Zigbee outlets everywhere, and refusing to touch a wall switch.
slug: my-home-assistant-setup-part-1
pubDatetime: 2026-11-18T10:00:00+01:00
featured: false
draft: false
tags:
  - home assistant
  - smart home
  - devices
  - hardware
ogImage: ../../../../assets/images/2026-11/18.png
---

![Image](@/assets/images/2026-11/18.png)

If you want the exact moment my dignity as a functioning adult collapsed, I can give you the date.

It was a Tuesday evening in November. I walked into the house with four heavy bags of groceries, kicked the door shut with my heel, and watched the kitchen lights come up at 40% warmth. No switches. No hands. No barking orders at a plastic puck on the counter.

I stood there in the hallway with my arms full and realized I was ruined. Six months without pressing a wall switch does strange things to a person—if someone asks me to flick one now, I take it as a minor personal insult.

Voice assistants are just as bad. Shouting _"Hey Siri, dim the reading lamp to 70%"_ while your partner is trying to concentrate in the same room isn't futuristic. It's yelling at a deaf cylinder like a lunatic in your own living room. If I have to negotiate with an appliance out loud, the system has already lost. Good automation is quiet. The house should notice what's happening, do the math, and stay out of the way.

Pulling that off without catching the curtains on fire takes real hardware underneath. That's how my utility cupboard slowly turned into a small server room.

## The Synology Escalation

Normal people buy a Raspberry Pi, push an SD card into the slot, wrap it in electrical tape, and hope for the best. I play the harpsichord and I write software; I've seen enough hard drives and wooden soundboards warp under bad humidity to know fragile hardware always dies at 9 PM on a Sunday when you need it most.

So Home Assistant runs in a virtual machine on my Synology NAS.

It started modestly: 2 GB of RAM and a 32 GB disk. Just a few lights and the heating, I told myself. Then I started adding custom integrations. Then Zigbee. RAM went from 2 GB to 4 GB when the recorder database began choking, then up to 6 GB because I refuse to wait for a dashboard to catch up.

The disk followed the same curve: 32 GB to 64 GB, then 128 GB. I actually told Nina, _"128 GB on a Synology array should last a lifetime."_

Never say that out loud. The universe listens every time. Still, the VM holds up like a tank—hundreds of entities, local Zigbee coordinators, local protocols, and nothing phoning home to a server in California.

## Built-In Plugs and the Surgery of Outlets

Once the server is humming like an industrial plant, clip-on smart plugs start looking offensive.

Plug one in and suddenly a chunky white brick sticks ten centimeters out of the wall, blocking the socket beside it, catching dust, and looking like a wiretap bolted to the baseboard.

So I spent a few weekends with a multimeter, insulated screwdrivers, and a headlamp swapping the sockets in the walls. Every outlet is now a flush-mounted Zigbee socket sitting flat against the plaster, complete with two built-in USB ports on the faceplate so I'm never digging around behind the nightstand for a charger. Each one reports live wattage, voltage, and state straight to the NAS, while guests just see a normal wall outlet.

## The Gentle Awakening: Shuffled Baroque and Boiling Water

Mornings are where this setup earns its keep.

Harsh alarms and blinding overhead lights put me in a bad mood before my feet hit the floor. Our mornings begin with an Apple Music playlist called _"Good morning"_, played through Music Assistant in Home Assistant. It fades in quietly through the speakers and shuffles daily—a Graupner cantata one morning, Mozart the next, Rameau after that. Nothing repeats in the same order.

The lights follow suit without trying to blind us. Instead of lighting up the whole kitchen and dining room, only the dining table light and sink lights come on, capped at 10% brightness—enough to walk safely without searing your retinas.

Even the kettle runs on autopilot. The morning routine switches it on before I get out of bed, so by the time I shuffle into the kitchen, the water is already boiling. Call it excessive if you want; I call it basic self-defense before coffee.

## The Preheated Oven Highway Protocol

My Wi-Fi oven gets the most eye-rolls. _"Why does an oven need Wi-Fi, Guille? Does the bread rise better with an IP address?"_

Try rehearsing in Amsterdam all afternoon and then driving back in the dark and rain. Forty minutes out on a freezing Tuesday, the last thing you want is to walk in, turn on a cold oven, and wait half an hour for steel and cast iron to reach 200 °C before you can even start dinner.

I don't touch my phone on the drive. Home Assistant watches my commute telemetry, and when it estimates I'm an hour from home, it preheats the oven on its own. If I left a casserole or bread dough ready in the cold oven earlier that day, dinner is practically waiting when we arrive—and our Nuki smart lock senses we're approaching and unlatches the door before we're digging for keys in the rain. Walk inside, hang up your coat, smell something hot finishing up, and pour tea without touching a switch or key all day.

People can mock over-engineered homes all they like. Coming home on a miserable Dutch night to hot food and a warm house doesn't make you feel like a nerd—it makes you feel like a king who accidentally learned YAML.

Keeping the lights quiet and dinner timed is the easy part. In Part 2, things escalate: sensors in every corner, power-draw curves on the washing machine so damp laundry doesn't sour, and Waze commute tracking so the HomePod calls out Nina's arrival down to the minute.
