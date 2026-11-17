---
author: Guillermo Brachetta
title: "Why I Built This Blog with Astro, Pages CMS, and Giscus"
description: "How I set up a fast, static blog that lives in Git, has a visual editor when I want one, and doesn't wake me up with database updates."
slug: why-i-built-this-blog-with-astro
pubDatetime: 2026-12-02T15:00:00+01:00
featured: false
draft: false
tags:
  - software
  - astro
  - web-development
ogImage: ../../../assets/images/2026-12/02.png
---

![Image](@/assets/images/2026-12/02.png)

Every developer who decides to start a blog has to pass through the exact same ritual first: spending three weeks over-engineering the publishing engine, adjusting syntax theme colors at two in the morning, tweaking fonts by fractions of a millimeter, and then, having successfully built the ultimate writing platform, never writing a single post.

It is the perfect form of procrastination, because it feels entirely like work.

When I decided to rebuild my blog for 2026, I tried to keep the internal drama to a minimum. I already knew what I wanted, and more importantly, what I refused to live with anymore.

## What I didn't want

I didn't want WordPress. I have built plenty of complex sites in my life, and the last thing I want on a Sunday morning is an email from a database server warning me that a PHP plugin I installed five years ago has opened an emergency security hole.

I also didn't want to publish on platforms like Medium or Substack. I dislike reading articles through a haze of floating banners, pop-ups begging for an email address, and paywalls that ask you to sign in before you can finish a sentence. If I am writing something, I want to own the text, host it on my own domain, and not subject readers to an obstacle course.

And finally, I didn't want a heavy JavaScript framework. Building a personal text blog with Next.js or React is like hiring a construction crane to hang a picture frame: impressive to look at, but wildly unnecessary for rendering paragraphs of text.

## Plain text and Astro

What I actually wanted was almost boring: plain Markdown files in a Git repository that compile into fast, static HTML.

That brought me to [Astro](https://astro.build/). Instead of sending a massive bundle of JavaScript to your browser just so you can read a paragraph, Astro does all the work on the server during the build. What gets delivered to your screen is simple, clean HTML and CSS. The pages load instantly, search runs locally via Pagefind without sending data to third parties, and there is no database to maintain or back up.

I started with the [AstroPaper](https://github.com/satnaing/astro-paper) theme, adjusted the layout, brought in my typography, and added dark mode and Open Graph images.

The beauty of this setup is longevity. If Astro or Netlify completely disappear ten years from now, my blog is not trapped in an SQL export. It is just a folder of readable Markdown text sitting on my drive.

## Pages CMS for the lazy moments

Every programmer tells themselves the same noble lie: _"I don't need a CMS, I will just open my terminal, write in Markdown, commit, and push."_

This sounds very disciplined until you are sitting on a train, look at your phone, and spot a glaring spelling mistake in a title you published three hours ago. At that moment, you don't want to pull out a laptop, open a terminal, create a branch, and run a git command. You just want a clean webpage where you can fix the letter, hit save, and go back to drinking your coffee.

That is why I added [Pages CMS](https://pagescms.org/). It requires zero database setup: you simply put a small `.pages.yml` file in your repository, and it gives you a clean, distraction-free visual editor directly in your browser.

When you click save, Pages CMS connects to GitHub and commits the change for you behind the scenes. If I am at my desk coding, I edit the raw `.md` files in my editor. If I am on an iPad or away from my machine, I open the browser editor. Both workflows touch the exact same Git repository.

## Comments without surveillance

A static website is wonderful until you want readers to be able to leave a note.

Traditional comment plugins are usually awful. Either they track your visitors across the internet with advertising cookies, or they turn into a ghost town overrun by bots trying to sell questionable remedies.

To solve that without adding a backend, I connected [Giscus](https://giscus.app/). It uses **GitHub Discussions** as the comment storage. Readers who want to comment simply sign in with GitHub, and their comments appear directly at the bottom of the post, styled with custom light and dark CSS to match the rest of the site. There is no tracking, no database to manage, and spam is practically nonexistent.

## The real danger

The real problem with setting up a stack this clean (Astro for static speed, Pages CMS for editing, Giscus for comments, and automated daily builds) is that you completely run out of technical excuses.

There are no more servers to tune, no plugins to update, and no configuration files left to fiddle with. At some point, you have to face the terrifying blank cursor on the screen and actually write something.
