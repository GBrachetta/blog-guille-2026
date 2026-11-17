---
author: Guillermo Brachetta
pubDatetime: 2026-11-23T10:00:00+01:00
title: "Automations That Babysit Other Automations"
slug: automations-that-babysit-other-automations
featured: false
draft: false
tags:
  - home-assistant
  - automations
  - smart-home
  - devices
description: You buy one smart bulb to read in bed without getting up, and three years later you are writing watchdog scripts to monitor other scripts in your utility cupboard.
---

![Image](@/assets/images/2026-11-23.png)

I bought one smart bulb. That was the mistake.

The bulb worked, which was worse, because it gave me ideas. I told my partner that automating the lights would save time. That sentence alone should qualify as criminal negligence.

Nobody who installs Home Assistant saves time. What you actually do is take a home that functioned perfectly well with copper wires and mechanical switches, and turn it into a delicate IT department where you are the only employee, working unpaid night shifts.

Because once you have eighty devices talking to a server in the utility cupboard, you discover the fundamental rule of modern home automation: the things you automate do not stay automated. They need supervision. Constant, anxious supervision.

## The second job

In the old days, a light switch was a piece of metal touching another piece of metal. It had an expected lifespan of forty years. It did not have firmware, it did not connect to a local radio mesh, and it never once asked you to check a log file because an API token expired.

Now, turning on a lamp in my living room involves an entire chain of diplomatic negotiations.

The wireless button speaks Zigbee to an antenna plugged into a mini PC. The mini PC passes the payload through a container running Zigbee2MQTT, which forwards an MQTT topic to Home Assistant, which evaluates three conditions, checks if the sun is below the horizon, and finally sends a command back down the wire to a relay behind the plaster.

When this chain works, you feel like a genius. When it fails, you are standing in the dark in your socks, staring at a blank wall, wondering if Zigbee channel 25 is currently suffering from microwave interference.

And that is where the descent begins. You refuse to accept that your clever system can stumble. Instead of simplifying the setup, you do what any stubborn programmer does: you write more software to police the existing software.

## Watchdogs in the utility cupboard

At some point over the last year, my automations crossed a threshold. They stopped controlling the house and started babysitting each other.

Take the Zigbee coordinator. Every few weeks, for reasons known only to the semiconductor gods, the USB radio enters a catatonic state. It does not crash, which would be convenient; it simply stops listening. The physical switches still work because they are wired directly to relays, but the automations become deaf. You press a button, and the house simply ignores you.

So I built a watchdog automation. Every ten minutes, Home Assistant checks the timestamp of the last message received from the Zigbee bridge. If twelve minutes pass without a single sign of life, the watchdog does not bother asking for human intervention. It forcibly restarts the container, resets the serial port, and sends a discreet notification to my phone.

I will be having dinner with friends, mid-conversation about a concert or a piece of music, and my watch will vibrate with an alert: _"Zigbee2MQTT unresponsive. Container restarted."_

I glance at my wrist, take a sip of wine, and say nothing. The guests think I am checking an urgent email. In reality, I am silently acknowledging that my utility cupboard just performed CPR on itself.

## The Apple border patrol

Then there is presence tracking, which is its own circular tragedy.

Automations need to know if we are home. If the house thinks we are away, the heating drops to 18 °C and the security system arms itself. If it thinks we are home, it leaves the radiators and lights alone.

To do this, Home Assistant listens to Apple's iCloud integration. But Apple treats any external server like a dangerous stalker. If Home Assistant polls your phone's location too frequently, Apple quietly throttles the connection.

When Apple throttles the connection, the coordinates freeze. Two weeks ago, my server became convinced that my partner was permanently parked in a supermarket three kilometers away, despite the fact that she was sitting on the sofa reading a book in front of me. The house was preparing to shut off her heating while she was in the room.

To fix this, I had to write an automation that babysits the iCloud integration. It looks at the local Wi-Fi router. If her phone is associated with the access point, it overrides the cloud tracker and forces the state to "home." Meanwhile, an hourly recovery script pings the integration to re-authenticate before Apple decides to throw another tantrum.

## Who watches the watchers?

The true madness of this setup is that it creates an endless recursive loop.

If you have a watchdog script that restarts the radio, what happens when the watchdog script fails? If you have an automation that sends you a notification when a backup corrupts, how do you know the notification service itself is still connected?

You catch yourself considering a second watchdog to monitor the first watchdog. You start thinking about canary pings, secondary notification channels, and redundant bridges for a house that only has two floors.

My partner walked into the kitchen the other evening while I was staring intently at a terminal on my laptop, adjusting a cron job that checks if a sensor script had timed out.

She asked what I was doing.

_"I am fixing the automation that checks whether the other automation is still working,"_ I said.

She paused, looked at the perfectly ordinary switch on the wall that controls the ceiling lamp, and asked, very gently, why we couldn't just use our fingers like normal people.

I had no sensible answer. But ten minutes later, a silent error was caught, a container was restarted in the background, and the kitchen light turned on automatically when she walked back in.

It is completely absurd, of course. But the bunker held, and nobody had to touch a switch.
