# DevSparks Blog Specification

## Overview

DevSparks - short, but meaningful lifehacks for developers. Each lifehack is a short, but fun blog post and a small 5-15 mins video. 

This project is a static blog, which mainly consists of those lifehacks. The posts are written in a coool way with usage of slang. Also blog has "About" page.

The blog itself is strictly technical for at least medium-level developers. Topics are power usage of cli, git tricks, software development principles. 

Some blog post may contain "Hackerman's tip" sections, which contains some more advanced information for more advanced readers.
And some may contain "Padawan's Playground" sections, which contains some more junior-level info.

## Requirements

### Theming

Two themes: light and dark.
- When site is loaded, system theme should be checked. If it is dark (`window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches`), dark theme should be the default. 
- To watch for system theme changes `window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event =>  event.matches ? "dark" : "light";)`, should change theme of the website.
- Adds `data-theme=light|dark` attr to document
- Adds `light-theme` or `dark-theme` class to body
- theme variblaes:
    - light:
        - `background-color`: `amber` (`#ffc000`)
        - `text-color`: `graphite` (`#40414e`)
        - `border-color`: `graphite` (`#40414e`)
    - dark:
        - `background-color`: `graphite` (`#40414e`)
        - `text-color`: `amber` (`#ffc000`)
        - `border-color`: `amber` (`#ffc000`)

### Common styling:

- Fira Code font
- Links: text color both when normal or hovered
- Underline when hovered
- Navigation links in header: should have `.link-active` class
- .link-active link should be bordered
- breakpoints: >680px - desktop, <680px mobile
- site .container (wraps all other divs):
    - 600px width on desktop, aligned center
    - 100% width with 20px left/right padding on mobile
- inputs:
    - horizontal line of `border-color` when not active/hover
    - bordered when active/hover
    - placeholder text should also be of `text-color`

### Site layour

- `<header>`:
  - contains navigation links: Hacks. Also a Search box, Fix typo link, switch theme switch
  - Fix typo link and switch theme switch should be on the right, all other elements on the left
  - Fix typo button just opens following link in a new tab: "https://github.com/goooseman/devsparks-blog/issues/new?title=DevSparks+Feedback&body=I+found+something+wrong+on+this+page%3A%0A%0A++{CURRENT_PAGE}%0A%0A++Here%27s+what+it+is%3A"
  - switch theme switch
    - Should only have 🌞 icon if active theme is dark and 🌒 icon if current theme is light
    - Should have aria-label: 'Switch to light theme' if current theme is dark and 'Switch to dark theme' if current theme is light
- `<main>`
  - background color matches other areas of the website. but it has background shadow on top/bottom to make it look like lower then header and footer
  - should have padding top and bottom with 20px
- `<footer>`
  - contains photo of the author with transparent bg and a small about text
  - text is wrapped with a single border around whole text, not single parapgraph, of `border-color`
  - photo of author: http://placekitten.com/200/200
  - photo of author when hovered: http://placekitten.com/200/200?foo=hover
  - should have flex layout
  - for desktop breakpoint photo on the left column, text on the right
  - for mobile brealpoint photo is aligned to center and above the text
  - text for the footer:
        > Hello, I'm Alex. 
        > Welcome to DevSparks, a cosy corner of the web where code meets fun. I've always believed that the best way to learn is by doing, and the best way to do is by having fun. That's why I've created DevSparks - to share the joy and the power of development with you.
        > Here, you'll find bite-sized lifehacks about everything from CLI power usage to git tricks, all crafted with a dash of humor and a bucketload of passion.
        > So grab a cup of coffee, get comfy, and let's explore the incredible world of coding together!

### Home page

Contains a "Hacks" title and a list of hacks groupped by year in the format:

```
YEAR

hack title (date)
```

Here is some sample code to list items:

```
{{ range (where .Site.RegularPages "Type" "in" (slice "hacks")).GroupByDate "2006" }}
<h2>{{ .Key }}</h2>
<ul>
  {{ range .Pages }}
  <li>
    <span class="date">{{ .Date.Format (.Site.Params.dateFormat | default "January 2, 2006" ) }}</span>
    <a class="title" href="{{ .Params.externalLink | default .RelPermalink }}">{{ .Title }}</a>
  </li>
  {{- end -}}
</ul>
{{ end }}
```

On the home page footer should be rendered before main content, not after.

### Hack page

A specific hack page contains:

- Title
- Date
- Tags (listed inline, not as bullet items)
- Text content
- Comments (remark42 integration)

Tags should be links, when clicked other hacks by the same tag should be listed.

Some blog posts can contain "Hackerman's tip" and "Padawan's Playground" sections:
- Those sections have a border of `border-color`. 
- Outside of a border there should be a transparent image of Hackerman or Padawan. Use http://placekitten.com/20/20?theme=light image for light theme and http://placekitten.com/20/20?theme=dark for dark theme.
- This image should be absolute positioned on a border with left: 20% and top: 0. 
- Section should be relative. 
- Section should have 25px margin top and 5px margin bottom to fix image position overflow. 
- Title inside section should be italic.

Please create one example of a hack with Lorem Ipsum text containing both Padawan and Hackerman sections.

## Technology Stack

Blog address: `devsparks.goooseman.dev`.

- Back-end: Go, Hugo, Remark42
- Front-end: HTML, CSS, JavaScript (for interactive elements)

Should have Makefile to serve and build project. Both commands should use docker.

### Remark42 integration

Remark42 is a comments engine which has a special backend and a frontend integration.

### Backend

In the projects `docker-compose.yaml` please add following service:

```
version: "2"

services:
  remark:
    # remove the next line in case you want to use this docker-compose separately
    # as otherwise it would complain for absence of Dockerfile
    build: .
    image: umputun/remark42:latest
    container_name: "remark42"
    hostname: "remark42"
    restart: always

    logging:
      driver: json-file
      options:
        max-size: "10m"
        max-file: "5"

    # uncomment to expose directly (no proxy)
    #ports:
    #  - "80:8080"
    #  - "443:8443"

    environment:
      - REMARK_URL=https://remark42.goooseman.dev
      - SECRET
      - DEBUG=true
      - AUTH_ANON=true 
      - AUTH_GOOGLE_CID
      - AUTH_GOOGLE_CSEC
      - AUTH_GITHUB_CID
      - AUTH_GITHUB_CSEC
      - AUTH_FACEBOOK_CID
      - AUTH_FACEBOOK_CSEC
      - AUTH_DISQUS_CID
      - AUTH_DISQUS_CSEC
      # Enable it only for the initial comment import or for manual backups.
      # Do not leave the server running with the ADMIN_PASSWD set if you don't have an intention
      # to keep creating backups manually!
      # - ADMIN_PASSWD=<your secret password>
    volumes:
      - ./var:/srv/var
```

But enrich this file with hugo image to serve and build commands.

### Frontend integration

Add following snippets to end of the body:

```
<script>
  // https://remark42.com/docs/configuration/frontend/
  var remark_config = {
    host: 'https://remark42.goooseman.dev',
    site_id: 'dev_sparks',
    components: ['embed', 'last-comments']
    max_shown_comments: 100,
    theme: {HUGO_THEME},
    page_title: {HUGO_PAGE_TITLE},
    show_email_subscription: false,
    simple_view: true,
    no_footer: false
  }
</script>
```

```
<script>!function(e,n){for(var o=0;o<e.length;o++){var r=n.createElement("script"),c=".js",d=n.head||n.body;"noModule"in r?(r.type="module",c=".mjs"):r.async=!0,r.defer=!0,r.src=remark_config.host+"/web/"+e[o]+c,d.appendChild(r)}}(remark_config.components||["embed"],document);</script>
```

And then add the following `<div>` to the place where footer should be rendered:

```
<div id="remark42"></div>
```

### Frontend theme

Remark42 theme should be syncronised with website theme. When toggle button is clicked, please run the following code: `window.REMARK42.changeTheme("light" | "dark")`