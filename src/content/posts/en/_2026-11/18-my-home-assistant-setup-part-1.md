---
author: Guillermo Brachetta
title: "My Home Assistant Setup (Part 1): The Infrastructure of Total Spoiledness"
description: From a humble 2 GB virtual machine on a Synology NAS to 128 GB of local storage, built-in Zigbee plugs everywhere, and the absolute refusal to touch a physical light switch.
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

If you want to know the exact moment my dignity as a functioning adult collapsed, I can give you the date.

It was a Tuesday evening in November. I walked through the front door with four heavy bags of groceries, kicked the door shut with my heel, and watched the kitchen lights turn on at exactly forty percent warmth. No switches. No hands. No shouting at a stupid plastic gadget on the counter.

I just stood in the hallway, dropped the bags, and realized: I am ruined. I have become completely spoiled. I haven't physically pressed a wall switch in six months, and if someone asks me to do it now, it feels like an unreasonable personal insult.

And don't get me started on voice assistants. Shouting _"Hey Siri, dim the reading lamp to seventy percent"_ while your partner is trying to concentrate in the same room is not living in the twenty-first century. It is just screaming at a deaf cylinder like a madman in your own living room. If I have to negotiate with an appliance out loud, the technology has already failed me. Real luxury is dead silence. The house should simply observe, calculate, and get out of your way.

To pull that off without setting the curtains on fire, though, you need serious computing power. Which is how my utility cupboard slowly turned into an IT department.

## The Synology Escalation

Normal people buy a Raspberry Pi, stick an SD card into it, wrap it in electrical tape, and pray. I play the harpsichord and I work with software; I have seen enough hard drives and wooden instruments collapse under humidity to know that fragile hardware always dies at 9 PM on a Sunday when you need it most.

So Home Assistant runs in a Virtual Machine on my Synology NAS.

It started innocently enough. I gave the virtual machine two gigabytes of RAM and thirty-two gigabytes of disk. I told myself it was just for a few bulbs and the heating. Then I discovered custom integrations. Then I added Zigbee. Two gigabytes became four gigabytes because the database started sweating. Four became six because I refuse to let my house buffer.

And the virtual disk? Thirty-two gigabytes doubled to sixty-four, and sixty-four became one hundred and twenty-eight gigabytes. I actually said out loud to Nina: "One hundred and twenty-eight gigabytes on a Synology array should be enough for a lifetime."

Never say that. The universe hears you every time. But right now, that virtual machine is a tank. It handles hundreds of entities, local Zigbee coordinators, and network protocols, and not a single byte leaves the house to consult a cloud server in California.

## Built-In Plugs and the Surgery of Outlets

Once the server is running like an industrial plant, external smart plugs become offensive.

You buy a standard smart plug, stick it into the wall, and suddenly you have a white plastic tumor sticking ten centimeters into the room. It blocks the plug next to it, collects dust, and looks like an illegal wiretap on your baseboard.

So I spent several weekends with a multimeter, insulated screwdrivers, and a headlamp replacing the sockets in the walls. Every single outlet is now a flush-mounted Zigbee socket that sits flat against the plaster. Even better, they have two USB ports built right into the faceplate, which means no more hunting for chargers behind the nightstand. They report real-time wattage, voltage, and state directly to the NAS, and visitors have no idea they are looking at a radio node.

## The Gentle Awakening: Shuffled Baroque and Boiling Water

Which brings me to the morning, where this machine actually saves my life.

I have zero patience for harsh alarms or blinding kitchen lights. Our morning routine starts with an Apple Music playlist called "Good morning", which syncs through Music Assistant right inside Home Assistant. It fades in through the speakers so quietly you barely notice it, and the automation makes sure it shuffles every single day. One morning you wake up to a Graupner cantata, the next it is Mozart, the next it is Rameau. Never the same sequence, never predictable.

At the exact same time, the lighting behaves like a polite butler. It does not turn on every bulb in the kitchen and dining room to blind you. It turns on just the dining table light and the sink lights, and pins them strictly to ten percent brightness. Just enough light so you don't step on anything, without burning your retinas.

And the kettle? I don't touch the phone. The morning automation turns on the kettle by itself. By the time I drag myself out from under the duvet and walk into the kitchen, the water is already boiling. Some people call that excessive. I call it basic self-defense against the morning.

## The Preheated Oven Highway Protocol

Then there is the oven.

Whenever people hear that my oven is on Wi-Fi, they roll their eyes. "Why does an oven need the internet, Guille? Does the bread rise better if it has an IP address?"

Here is why: I spend entire afternoons rehearsing in Amsterdam, followed by a long, exhausting drive back on the highway in the dark and the rain. When you are forty minutes from home on a freezing Tuesday, the last thing you want is to arrive, turn on a cold oven, and wait half an hour for cast iron and steel to reach two hundred degrees Celsius before you can even begin.

I don't even touch an app while driving. With Home Assistant tracking my commute telemetry, the moment it calculates that I am exactly one hour away from home, it fires up the oven completely on its own. If I had the foresight in the morning to leave a roast or a casserole seasoned and waiting inside the cold oven, I don't even wait for dinner to cook. We don't even have to fish for keys in the rain, because our Nuki smart lock detects our approach and unlatches the front door for us. You simply walk straight inside, take off your coat, and the house welcomes you with the aroma of a slow-roasted meal that finished cooking twenty minutes ago.

You can laugh at home automation all you want, but when you walk through the door on a rainy Dutch winter night to hot food and tea without having touched a single key or switch all day, you don't feel like a nerd. You feel like a king who accidentally learned how to configure YAML.

Of course, keeping the lights automated and the roast on schedule is only the comfortable part. In Part 2, things get slightly out of hand: sensors in every room imaginable, using power draw curves on the washing machine to stop clean laundry from rotting, and tracking Nina's commute via Waze so the HomePod announces her arrival down to the minute.
