---
author: Guillermo Brachetta
pubDatetime: 2026-11-22T23:00:00+01:00
title: "The Good Night Protocol: Preparing the Bunker for Sleep"
slug: the-good-night-protocol
featured: false
draft: false
tags:
  - home-assistant
  - automations
  - devices
description: At 23:00, an iPhone webhook triggers a complete shutdown. Two smart locks engage, roller shades descend, the thermostat drops to 18 °C, and Home Assistant negotiates domestic peace.
---

![Image](@/assets/images/2026-11-22.png)

At twenty-three hundred hours, a sensible person brushes their teeth, turns off the bedside lamp, and falls asleep.

In my house, the process resembles a submarine preparing for a deep emergency dive.

We live in the Netherlands, but our household is an explosive blend of Argentinian dramatic volume and Polish pragmatic stubbornness. When something minor goes wrong in our domestic life, nobody suffers in stoic silence. There is immediate theatrical despair, followed promptly by sharp, no-nonsense cross-examination.

Because of this cultural climate, any technology installed in the house must either work with absolute perfection or face an instant, loud tribunal.

When I tap my phone on the nightstand, an iOS shortcut fires an encrypted webhook toward my local server. Home Assistant catches the payload, clears its throat, and initiates the shutdown sequence.

What follows is an elaborate mechanical symphony that turns an ordinary Dutch family house into an impenetrable, automated bunker.

## The mechanical symphony

The soundscape of bedtime is deeply satisfying.

First come the locks. Two motorized smart locks on the front and back doors churn their internal gears, shooting heavy steel bolts into the door frames with the crisp, metallic clunk of a bank vault sealing for the weekend. There is no need to walk downstairs in cold socks to check if the handle turns. If the locks encounter resistance, the dashboard tells me. If they seat cleanly, the first stage of containment is complete.

Almost simultaneously, the motorized roller shades begin their descent. They hum softly against the glass, rolling downward centimeter by centimeter until every pane of glass is covered in blackout fabric. Outside, the Dutch rain beats against the brickwork. Inside, the world contracts to our four walls.

Next, climate control steps in. The heating system receives its new marching orders, cutting the radiators back to a disciplined 18 °C. If a window was accidentally left cracked open in the guest room, the system does not bother arguing with the radiator; it simply cuts off that valve entirely until morning.

Finally, the security system wakes up. The Aqara hub in the corridor lets out a modest chirp, arming the door sensors and peripheral motion detectors into night mode. From this moment onward, any unauthorized attempt to open an exterior door will treat the neighbourhood to ninety decibels of digital screeching.

It feels magnificent. For roughly four seconds, you feel like the commanding officer of an advanced naval vessel.

Then reality knocks on the door, usually in the form of a complaint shouted from the top floor.

## The limits of absolute power

In software development, tearing down an environment is straightforward: you kill all processes, drop the database connections, and clear the memory.

In home automation, you quickly discover that your server room is inhabited by other human beings who have legal rights and opinions.

In the early days of this setup, my Good Night automation was arrogant. It had a single, totalitarian service call: `light.turn_off` targeting `all`.

The logic was pure, elegant, and completely unlivable.

If you execute a blind blackout across the entire house at eleven at night, you do not achieve domestic tranquility. You achieve chaos.

Down the hall, someone is inevitably standing in front of the bathroom mirror with toothpaste foam on their chin, suddenly plunged into pitch darkness without warning. Upstairs in the attic, the teenagers (whose internal circadian clocks consider 23:00 to be early afternoon) find their desk lamps extinguished in the middle of writing an essay or watching a video.

A chorus of protests echoes through the stairwell in two languages. You are forced to scramble for your phone, unlock the screen with sleepy fingers, and sheepishly restore lighting to the attic while explaining that the automation was merely trying to help.

Totalitarian scripts do not survive family life. You need diplomacy.

## Conditional logic for domestic peace

To prevent an armed insurrection, the Good Night script had to evolve from a blunt hammer into a sensitive diplomatic treaty.

The automation now runs a gauntlet of conditions before it touches a single switch:

```yaml
sequence:
  - action: lock.lock
    target:
      entity_id:
        - lock.front_door
        - lock.back_door

  - action: cover.close_cover
    target:
      entity_id: cover.all_roller_shades

  - action: climate.set_temperature
    target:
      entity_id: climate.central_heating
    data:
      temperature: 18

  # The domestic diplomacy layer
  - if:
      - condition: state
        entity_id: binary_sensor.bathroom_presence_fp300
        state: "off"
      - condition: numeric_state
        entity_id: sensor.bathroom_humidity
        below: 65
    then:
      - action: light.turn_off
        target:
          entity_id: light.bathroom_lights

  # Respect the attic only if the girls are actually home
  - if:
      - condition: state
        entity_id: binary_sensor.girls_at_home
        state: "off"
    then:
      - action: light.turn_off
        target:
          entity_id: light.attic_all

  - action: light.turn_off
    target:
      entity_id: light.ground_floor_all
```

### The bathroom rule

The most critical safety net in the house is the bathroom check. Cheap infrared sensors are useless here: if you stand still for fifteen seconds while washing your face, they assume the room is vacant and shut off the lights.

To prevent sudden darkness while rinsing soap out of your eyes, I installed an Aqara FP300 presence sensor. Using millimeter-wave radar, it detects the subtle chest motion of someone simply breathing.

If the FP300 detects anyone inside, the Good Night routine politely leaves the vanity lighting alone. The person inside can finish brushing their teeth in peace, entirely unaware of the administrative shutdown sweeping the rest of the house. Once they step out into the hallway and the sensor clears, the bathroom quietly turns off its own lights thirty seconds later.

Nobody gets trapped in the dark with a toothbrush. Marriages have been saved by less.

### The attic exclusion zone

The top floor requires an even higher level of statecraft.

The attic belongs to the girls, but granting blanket diplomatic immunity to an entire floor would be wasteful. If they are out with friends or away for the night, leaving empty rooms illuminated offends every principle of algorithmic efficiency.

So before the script touches the top floor, Home Assistant queries their presence trackers. If the system confirms that the girls are away from the house, the attic joins the general blackout without mercy.

If they are registered as home, however, their territory is granted sovereign status. If they want to stay awake reading under a desk lamp until midnight, that is their prerogative.

Instead of cutting their power, the system simply informs their local corridor sensors that the lower floors have gone to sleep. If one of them creeps downstairs at 01:30 in search of a late-night glass of water, the kitchen does not blaze to full daylight. It illuminates a discreet, low-intensity amber strip along the floorboards (just enough to locate the glass without waking the household).

## Sleeping inside the machine

By 23:05, the treaty has been honored.

The ground floor is dark. The deadbolts are driven home. The roller shades are sealed against the Dutch drizzle, and the temperature is drifting steadily down toward 18 °C. Somewhere in the attic, a faint rectangle of light slips under a bedroom door, harmless and tolerated by the automation engine.

Is it ridiculous to route your bedtime routine through an enterprise-grade home automation platform, complete with millimeter-wave radar, conditional branching, presence tracking, and motorized deadbolts?

Probably. A traditional brass key and a pair of thumbs would accomplish roughly the same physical security in forty seconds.

But there is a very particular, theatrical pleasure in lying down in bed, hearing the locks engage, and knowing that the bunker is buttoned up, monitoring its perimeter, and quietly waiting for morning.
