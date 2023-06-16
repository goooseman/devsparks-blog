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
- Links: on hover should change background to `text-color` and color to `background-color` with an animation of sliding from bottom to top
- Navigation links in header: should have `.layout__link__active` class, when page is active. Hacks page should be active when index or any hack is opened.
- breakpoints: >680px - desktop, <680px mobile
- inputs:
    - horizontal line of `border-color` when not active/hover
    - bordered when active/hover
    - placeholder text should also be of `text-color`
    - background color same as site background

### Site layout

- body:
  - should not have horizontal scroll on mobile
- `<header>`:
  - everything inside should be wrapped in `.layout__container`
  - contains navigation links: Hacks, About, [GitHub](https://github.com/goooseman/devsparks-blog). Also Fix typo link, switch theme switch on the right.
  - should contain `.layout__header` class
  - Fix typo button just opens following link in a new tab: "https://github.com/goooseman/devsparks-blog/issues/new?title=DevSparks+Feedback&body=I+found+something+wrong+on+this+page%3A%0A%0A++{CURRENT_PAGE}%0A%0A++Here%27s+what+it+is%3A"
  - switch theme switch
    - should contain `.header__theme_switch` class
    - Should only have 🌞 icon if active theme is dark and 🌒 icon if current theme is light
    - Should have aria-label: 'Switch to light theme' if current theme is dark and 'Switch to dark theme' if current theme is light
    - Should have pointer: cursor when hovered
- `<main>`
  - everything inside should be wrapped in `.layout__container`
  - background color matches other areas of the website. but it has background shadow on top/bottom to make it look like lower then header and footer
  - should have padding top and bottom with 50px
- `<footer>`
  - everything inside should be wrapped in `.layout__container`
  - contains photo of the author with transparent bg and a small about text: Footer Ipsum
  - photo of author: `/human.png` (`human@2x.png`)
  - photo of author when hovered: `/robot.png` (`robot@2x.png`)
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
- Date (only if exists)
- Tags (listed inline, not as bullet items)
- Text content
- Comments (just render #remark42 div)

Tags should be links, when clicked other hacks by the same tag should be listed.

Any code should be highlighted. Typescript, javascript, java, go, rust support is required.

Do not generate hack itself, only the layout.

## Technology Stack

Blog address: `devsparks.goooseman.dev`.
Project structure: hugo blog
Hugo version: 0.113.0
Hugo theme name: `devsparks`

- Back-end: Go, Hugo, Remark42
- Front-end: HTML, CSS, JavaScript (for interactive elements)

Should have Makefile
- serve
  - to run then run hugo with docker, but add additional mounts: `$(PWD)/../../content:/src/content` and `$(PWD)/../../static:/src/static`. if files are changed, server should rebuild. 
- build
  - to build project with docker

Should NOT create content folder.

### Project structure

- Makefile
- .gitignore (`.hugo_build.lock`)
- config.toml
  - Add following additional configuration:
    ```
[module]
[[module.mounts]]
  source = '../../content'
  target = 'content'
[[module.mounts]]
  source = '../../static'
  target = 'static'
    ```
- themes/devsparks/layouts/_default/baseof.html
  - use `<link rel="stylesheet" href="{{ "css/main.css" | relURL }}">` to connect all 4 styles files
  - do not use `disabled` on any css
  - connect both themes
  - use `<script src="{{ "js/theme-switcher.js" | relURL }}" defer></script>` to connect JS
  - footer and header are in separate files
- themes/devsparks/layouts/_default/list.html
  - Contains Hacks titile if it is index
  - Contains "Tag: ${tag}" title if it is a tag page
- themes/devsparks/layouts/_default/single.html
  - should not contain `<main>`, because it should be inside `baseof.html`
- themes/devsparks/layouts/partials/footer.html
- themes/devsparks/layouts/partials/header.html
- themes/devsparks/layouts/shortcodes/hackermans-tip.html
- themes/devsparks/layouts/shortcodes/padawans-playground.html
- themes/devsparks/static/css/main.css
- themes/devsparks/static/css/syntax-highlighting.css
- themes/devsparks/static/css/theme-light.css
- themes/devsparks/static/css/theme-dark.css
- themes/devsparks/static/js/theme-switcher.js
- themes/devsparks/static/js/footer-image.js
- themes/devsparks/static/js/remark42.js:
  - Should contain the following snippet:
        ```
// https://r42.com/docs/configuration/frontend/
var remark_config = {
  host: 'https://r42.goooseman.dev',
  site_id: 'dev_sparks',
  components: ['embed', 'last-comments'],
  max_shown_comments: 100,
  theme: 'dark',
  show_email_subscription: false,
  simple_view: false,
  no_footer: false
}
        ```
  - And this:
        ```
!function(e,n){for(var o=0;o<e.length;o++){var r=n.createElement("script"),c=".js",d=n.head||n.body;"noModule"in r?(r.type="module",c=".mjs"):r.async=!0,r.defer=!0,r.src=remark_config.host+"/web/"+e[o]+c,d.appendChild(r)}}(remark_config.components||["embed"],document);
        ```

### Shared dependencies

breakpoints: >680px - desktop, <680px mobile

ID names of DOM elements:
   - theme-switch (for theme toggle button)
   - remark42 (for Remark42 comments integration)

Classnames:
- .layout__header
- .header__theme_switch
- .layout__container
- .layout__link__active
- .section__tip__hackerman
- .section__tip__padawan
- .tip__container
- .tip__title
- .tip__image
- .article__title
- .article__date
- .article__tags
- .article__content
- .footer__content
- .footer__about_text
- .footer__author-photo

Classname specs:

- .layout__container class:
  - 600px width on desktop, aligned center
  - 100% width with 20px left/right padding on mobile
- .tip__image should be absolute positioned on a border with left: 20% and top: 0. 
- .tip__container should be relative. 
- .tip__container should have 25px margin top and 5px margin bottom to fix image position overflow. 
- .tip__title inside section should be italic and bold.
- .tip__container should have border of border-color
- .tip__container should be relative
- .tip__container should have padding 20px, margin-top 300px, margin-left and right -20px
- .tip__image should be absolute with bottom: 100%, left: 20%
- .tip__image should be color inverted in dark theme
- .tip__image should be 280px height
- .tip__container should have margin-top: 30px;
- .header__theme_switch
  - should have transparent background, only 2px border
  - should be square
  - text should be centered
- .layout__header should be:
  - `display: flex`
  - `justify-content: space-between;`
  - 10px padding from top
- .layout__link__active
  - 2px left/right/top/bottom
- .footer__about_text
  - text is wrapped with a single border around whole text, not single parapgraph, of `border-color`
- .article__content h3 should have `padding-top: 5px` and `border-top: 1px solid currentColor`

Shortcodes (html file without shortcode itself, contents only):
- hackermans-tip
- padawans-playground 
- hackermans-tip and padawans-playground shortcode should wrap inner content in the following template:
  - <div class="tip__container (section__tip__hackerman | section__tip__padawan)">
    - <h4 class="tip__title">Hackerman's tip or Padawan's Playground
    - <img class="tip__image" />
    - `{{ .Inner | markdownify }}`
- image sources for .tip__image:
  - hackerman: `/hackerman.png` and `/hackerman@2x.png`
  - padawan: `/padawan.png` and `/padawan@2x.png`