# DevSparks Blog Specification

## Overview

DevSparks - short, but meaningful lifehacks for developers. 
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
- `background-color` should be background of whole website

### Common styling:

- Fira Code font (`https://fonts.googleapis.com/css2?family=Fira+Code&display=swap`)
- Border width: 2px (global variable)
- Links: text color both when normal or hovered
- Links: always have border bottom 2px
- Links: never underline, not on hover also
- Navigation links in header: should have `.link-active` class, when page active
- .link-active link should have border 2px left/right/top/bottom
- breakpoints: >680px - desktop, <680px mobile
- inputs:
    - horizontal line of `border-color` when not active/hover
    - bordered when active/hover
    - placeholder text should also be of `text-color`
    - background color same as site background

### Site layout

- `<header>`:
  - everything inside should be wrapped in `.container`
  - contains navigation links: Hacks, About, [GitHub](https://github.com/goooseman/devsparks-blog). Also Fix typo link, switch theme switch on the right.
  - should contain `.layout__header` class and then `.layout__header_left`, `.layout__header_right` 
  - Fix typo button just opens following link in a new tab: "https://github.com/goooseman/devsparks-blog/issues/new?title=DevSparks+Feedback&body=I+found+something+wrong+on+this+page%3A%0A%0A++{CURRENT_PAGE}%0A%0A++Here%27s+what+it+is%3A"
  - switch theme switch
    - should contain `.header__theme_switch` class
    - Should only have 🌞 icon if active theme is dark and 🌒 icon if current theme is light
    - Should have aria-label: 'Switch to light theme' if current theme is dark and 'Switch to dark theme' if current theme is light
    - Should have pointer: cursor when hovered
- `<main>`
  - everything inside should be wrapped in `.container`
  - background color matches other areas of the website. but it has background shadow on top/bottom to make it look like lower then header and footer
  - should have padding top and bottom with 50px
- `<footer>`
  - everything inside should be wrapped in `.container`
  - contains photo of the author with transparent bg and a small about text: Footer Ipsum
  - text is wrapped with a single border around whole text, not single parapgraph, of `border-color`
  - photo of author: http://placekitten.com/200/200
  - photo of author when hovered: http://placekitten.com/200/200?foo=hover
  - should have flex layout: photo on the left, text on the right
  - for desktop breakpoint photo on the left column, text on the right
  - for mobile brealpoint photo is aligned to center and above the text

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
- Comments (just render #remark42 div)

Tags should be links, when clicked other hacks by the same tag should be listed.

Do not generate hack itself, only the layout.

## Technology Stack

Blog address: `devsparks.goooseman.dev`.
Project structure: hugo blog
Hugo theme: `devsparks`

- Back-end: Go, Hugo, Remark42
- Front-end: HTML, CSS, JavaScript (for interactive elements)

Should have Makefile
- serve
  - to run `[ ! -e ./content ] && ln -sf ../content/ ./content` and then run hugo with docker
- build
  - to build project with docker

Should NOT create content folder.

### Project structure

- Makefile
- .gitignore (`.hugo_build.lock`)
- config.toml
- themes/devsparks/index.html
- themes/devsparks/layouts/_default/baseof.html
- themes/devsparks/layouts/_default/list.html
- themes/devsparks/layouts/_default/single.html
- themes/devsparks/layouts/partials/footer.html
- themes/devsparks/layouts/partials/header.html
- themes/devsparks/layouts/shortcodes/hackermans-tip.html
- themes/devsparks/layouts/shortcodes/padawans-playground.html
- themes/devsparks/static/css/main.css
- themes/devsparks/static/css/theme-light.css
- themes/devsparks/static/css/theme-dark.css
- themes/devsparks/static/js/theme-switcher.js

### Shared dependencies

breakpoints: >680px - desktop, <680px mobile

ID names of DOM elements:
   - theme-switch (for theme toggle button)
   - remark42 (for Remark42 comments integration)

Classnames:
- .layout__header
- .layout__header_left
- .layout__header_right
- .header__theme_switch
- .container
- .link-active
- .hackermans-tip
- .padawans-playground
- .tip-container
- .tip-title
- .tip-image

Classname specs:

- `.container` class (wraps all content inside `<header>`, `<footer>`, `<main>`):
  - 600px width on desktop, aligned center
  - 100% width with 20px left/right padding on mobile
- .tip-image should be absolute positioned on a border with left: 20% and top: 0. 
- .tip-container should be relative. 
- .tip-container should have 25px margin top and 5px margin bottom to fix image position overflow. 
- .tip-title inside section should be italic.
- .tip-container should have border of border-color
- .tip-container should be relative
- .tip-image should be absolute with top: 0, left: 20%
- .tip-container should have margin-top: 30px;
- .header__theme_switch
  - should have no background, only 2px border
  - should be square
- .layout__header should be flex
- .layout__header_left should be on the left
- .layout__header_right should be on the right

Shortcodes (html file without shortcode itself, contents only):
- hackermans-tip
- padawans-playground

- hackermans-tip and padawans-playground shortcode should wrap inner content in the following template:
  - <div class="tip-container (hackermans-tip | padawans-playground)">
    - <h4 class="tip-title">Hackerman's tip or Padawan's Playground
    - <img class="tip-image" /> (Use http://placekitten.com/20/20?theme=light image for light theme and http://placekitten.com/20/20?theme=dark for dark theme.)
    - inner contents of the tip passed from blog post

