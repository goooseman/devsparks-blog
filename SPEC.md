# DevSparks Blog Specification

## Overview

DevSparks - short, but meaningful lifehacks for developers. Each lifehack is a short, but fun blog post and a small 5-15 mins video. 

This project is a static blog, which mainly consists of those lifehacks. The posts are written in a coool way with usage of slang. Also blog has "About" page.

The blog itself is strictly technical for at least medium-level developers. Topics are power usage of cli, git tricks, software development principles. 

Some blog post may contain "Hackerman's tip" sections, which contains some more advanced information for more advanced readers.
And some may contain "Padawan's Playground" sections, which contains some more junior-level info.

## Design Requirements

The design is minimalistic and contains two themes: light and dark. By default the system theme is used, but website should have a special toggle.

Main color is Amber: #ffc000.

A monospace Fira Code font with ligatures should be used.

Design should be simple and mostly reuse Tailwind basic components. 

The layout:
- header: contains navigation links Home, Hacks, Search box, Fix typo
- main area
- footer: contains photo of the author with transparent bg and a small about text


## Functional Requirements

### Home page

Contains a "Hacks" title and a list of hacks groupped by year

### Hack page

A specific hack page contains:

- Title
- Date
- Tags
- Text content
- Comments (remark42 integration)

Some blog posts can contain "Hackerman's tip" and "Padawan's Playground" sections, which should be highlighted with a border. Outside of a border there should be a transparent image of Hackerman or Padawan. As of now use a placeholder image, I will replace it with a real image later.

Please create one example of a hack with Lorem Ipsum text containing both Padawan and Hackerman sections.

### Header

- Fix typo button just opens following link in a new tab: "https://github.com/goooseman/devsparks-blog/issues/new?title=DevSparks+Feedback&body=I+found+something+wrong+on+this+page%3A%0A%0A++{CURRENT_PAGE}%0A%0A++Here%27s+what+it+is%3A"

### Footer

The footer should consist of my photo 160x160 with transparent background and following about text: 

> Hello, I'm Alex. 
> Welcome to DevSparks, a cosy corner of the web where code meets fun. I've always believed that the best way to learn is by doing, and the best way to do is by having fun. That's why I've created DevSparks - to share the joy and the power of development with you.
> Here, you'll find bite-sized lifehacks about everything from CLI power usage to git tricks, all crafted with a dash of humor and a bucketload of passion.
> So grab a cup of coffee, get comfy, and let's explore the incredible world of coding together!

Instead of a photo, please use an image placeholder. I will replace it afterwards.

## Technology Stack

- Back-end: Go, Hugo
- Front-end: HTML, CSS (Tailwind), JavaScript (for interactive elements)