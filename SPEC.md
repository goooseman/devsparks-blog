# DevSparks Blog Specification

## Technology Stack

Blog address: `https://devsparks.goooseman.dev` (`baseURL`).
Project structure: hugo blog
Hugo theme name: `devsparks`

- Back-end: Go, Hugo v0.111.3
- Front-end: HTML, CSS, JavaScript (for interactive elements)

Should have Makefile
- serve
  - to run then run hugo with docker, add additional mounts: `$(PWD):/src`, `$(PWD)/../../content:/src/content` and `$(PWD)/../../static:/src/static`. 
- build
  - to build project with docker

Should add several Hugo mounts:

```
module:
  mounts:
  - source = '../../content'
    target = 'content'
  - source = '../../static'
    target = 'static'
```

## Requirements

## Images

Footer and content images have `2x` versions, make sure to use them for Retina display.

### Theming

One theme with light and dark variations. Theme implementation is JS/CSS only.
- When site is loaded, system theme should be checked if possible.
- Website should watch for system theme changes.
- Website theme should be control with switcher, so both CSS should be always connected
- JS Adds `body__theme__light` or `body__theme__dark` class to body.
- JS saves current theme to sessionStorage. If saved session exists, it should overwrite system one.
- JS When theme is switched do 2 additional actions:
  - `document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#eff1f5" | "#303446");`
  - `window.remark_config.theme = "light" | "dark"; if window.remark_config exist`
- Theme CSS variblaes should be attached to `body__theme__light` and `body__theme__dark`:
    - light:
    - `background-color`: `#eff1f5`
    - `text-color`: `#4c4f69`
    - `border-color`: `#bcc0cc`
  - dark (Catpuccin frappe):
    - `background-color`: `#303446`
    - `text-color`: `#c6d0f5`
    - `border-color`: `#51576d` (Surface1)
- Create such CSS vars in `theme-light.css` and `theme-dark.css` and reuse them in the project
- Do not write any other CSS inside theme-light and theme-dark!
- `background-color` should be background of whole website. Write styles for body.
- Switch theme switch
  - background: transparent
  - reset all default button styles
  - padding: 0
  - Should only have 🌞 icon if current theme is dark and 🌒 icon if current theme is light
  - Should have aria-label: 'Switch to light theme' if current theme is dark and 'Switch to dark theme' if current theme is light
  - Should have pointer: cursor when hovered

### Common styling:

- Fira Code font (`https://fonts.googleapis.com/css2?family=Fira+Code&display=swap`)
- Border width: 2px (global variable)
- Links: text color normal
- Links: always have border bottom 2px
- Links: never underline, not on hover also
- Links: on hover should invert color and background color with an animation of sliding from bottom to top
- Navigation links in header: should have `.layout__link__active` class, when page is active.
- breakpoints: >680px - desktop, <680px mobile
- blockquote: reset margins, margin-left: 24px, vertical margins: 12, right margin: 0, add black vertical 4px bar to the very left by using pseudo-element

### Header

- contains navigation links: Hacks, About, Githun, Fix typo link, switch theme toggle.
- **Fix typo and switch theme should be aligned to the right side!**:
  - GitHub link should be defined in `menu.main` inside `config.yaml`
  - url: `https://github.com/goooseman/devsparks-blog`, identifier: github, weight: 30
  - Fix typo should not be defined in `config.yaml`, it should be hardcoded inside `header.html`
  - All `menu.main` items should be rendered inside one nav, Fix typo and theme switcher - inside another nav. Their parent should be flex.
- To render menu items use the following snippet:
```
    {{ $currentPage := . }}
    {{ range .Site.Menus.main }}
      <a class="{{if or (eq $currentPage.RelPermalink .URL) (eq $currentPage.Section .Identifier) }} layout__link__active{{end}}" href="{{.URL}}"  target='{{ if in .URL "https://" }}_blank{{ else }}_self{{ end }}'>{{ .Name }}{{ .Post }}</a>
    {{ end }}
```
- Fix typo button just opens following link in a new tab: "https://github.com/goooseman/devsparks-blog/issues/new?title=DevSparks+Feedback&body=I+found+something+wrong+on+this+page%3A%0A%0A++{CURRENT_PAGE}%0A%0A++Here%27s+what+it+is%3A", make sure to replace `{CURRENT_PAGE}` with correct url: `.Permalink` hugo var

### Favicon

Please add following html for the following favicons support:
- `/apple-touch-icon.png`
- `/favicon-32x32.png`
- `/favicon-16x16.png`
- `/site.webmanifest`

And also meta `msapplication-TileColor: #E0F2F1`
And also `/index.xml` RSS feed meta
Add also og and twitter meta tags, blog params: `image`, `description`, `Title`

### Site layout

- `<header>`:
  - should contain `.layout__header` class
- `<main>`
  - it has background shadow on top/bottom to make it look like lower then header and footer to add deepness
  - should have margin `48px -48px`
  - should have padding `24px 48px`
- `<footer>`
  - contains photo of the author with transparent bg and a small about text: Footer Ipsum
  - photo of author: `/human.webp` (`human@2x.webp`)
  - photo of author when hovered: `/robot.webp` (`robot@2x.webp`). Implement it in `footer-image.js` and do not forget to change `srcset` not only `src`
  - to implement hover please render two images on the screen, one with display: none, use two separate IDs and toggle their display in JS file
  - robot.webp should be display: none by default
  - height of the photo: 160px
  - `.footer__container` should have flex layout: photo on the left, text on the right and `align-itmes: bottom`
  - `.footer__container` has margin-top: 48px
  - for desktop breakpoint photo on the left column, text on the right
  - for mobile breakpoint photo is aligned to center and above the text

### Home page

Contains a "Hacks" title and a list of hacks groupped by year in the format:

```
YEAR

hack title (date) (tags inline)
```

Here is some sample code to list items, but change order of date and add tags:

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

### Shortcodes

Shortcodes definitions:
- hackermans-tip
- padawans-playground 
- spoiler

Avoid using {{< shortcode >}} tag inside shortcode folder, e.g. (`shortcodes/spoiler.html`)


#### hackermans-tip and padawans-playground shortcode 
Wrap inner content in the following template:
<div class="tip__container (section__tip__hackerman | section__tip__padawan)">
  <p class="tip__title">Hackerman's tip or Padawan's Playground
    <img class="tip__image" />
    {{ .Inner | markdownify }}

Image sources for .tip__image:
  - hackerman: `/hackerman.webp` and `/hackerman@2x.webp`
  - padawan: `/padawan.webp` and `/padawan@2x.webp`

#### shortcodes/spoiler.html shortcode

Has 1 argument: title.

Wrap inner contenet in the following template:
```
<details>
  <summary>{{ .Get "title" }}

  {{ .Inner | markdownify }}
```

### Hack page

A specific hack page contains:

- Title
- Date (only if exists)
- Tags (listed inline, not as bullet items)
- Text content

Tags should be links, when clicked other hacks by the same tag should be listed.

Do not generate hack itself, only the layout.

### Code syntax highlighting

- for `<code>` (single line):
  - invert color and background color: color should be `--background-color`, background-color should be `--text-color`
  - do not add any borders or paddings
  - `white-space: break-spaces;`
  - `word-break: break-word;`
- for `<pre>` inside `<div class="highlight">`: 
  - background-color is --background-color for dark theme and --text-color for light theme
  - color should be `white` to keep it the default one
  - padding: 12px
- `<code>` inside `<pre>` inside `<div class="highlight">`:
  - background-color: transparent
  - color: `white`
- no more other styles should be generated
- background-color and color should be set on `body`

### Project structure

- Makefile
- .gitignore (common hugo ignores)
- config.yaml
  - Do not use JSON objects in this file
  - Add following additional configuration:
    - `relativeUrls: true`
    - `markup.goldmark.renderer: true`
  - Output YAML file for hugo, not markdown here!
- themes/devsparks/layouts/_default/baseof.html
  - use `<link rel="stylesheet" href="{{ "css/main.css" | relURL }}">` to connect all styles files, there are 4 css files, connect all of them!
  - do not use `disabled` on any css
  - connect both themes
  - use `<script src="{{ "js/theme.js" | relURL }}"></script>` to connect JS, there are 3 JS files, connect all of them
  - theme.js should not use `defer` to prevent bug with flickering interface. other JS - should be `defer`
  - `<script data-goatcounter="https://gc.goooseman.dev/count" async src="/count.js"></script>` should also be in the end of the body
- themes/devsparks/layouts/_default/list.html
  - Contains Hacks titile if it is index
  - Contains "${title}" if not
  - Should contain `{{ define "main" }}`
- themes/devsparks/layouts/_default/single.html
  - should not contain `<main>`, because it should be inside `baseof.html`
- themes/devsparks/layouts/shortcodes/hackermans-tip.html
- themes/devsparks/layouts/shortcodes/padawans-playground.html
- themes/devsparks/layouts/shortcodes/spoiler.html
- themes/devsparks/static/css/main.css
  - contains all the site CSS, but not theming
- themes/devsparks/static/css/syntax-highlighting.css
  - contains only CSS for code syntax highligting
- themes/devsparks/static/css/theme-light.css
  - contains only colors and other changes for light theme, do not contain any common styles
- themes/devsparks/static/css/theme-dark.css
  - contains only colors and other changes for dark theme, do not contain any common styles
- themes/devsparks/static/js/theme.js (should contain JS for theme switcher + system theme monitoring in the header)
- themes/devsparks/static/js/footer-image.js

### Shared dependencies

breakpoints: >680px - desktop, <680px mobile

ID names of DOM elements:
   - theme-switch (for theme toggle button)
   - footer-image-human
   - footer-image-robot

Classnames:
- .layout__header
- .layout__header-right
- .header__theme_switch
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
- .footer__container
- .footer__about_text
- .footer__author-photo

CSS specs:

- html,body: width100vw with horizontal scrolling disabled
- body:
  - 600px width on desktop, aligned center
  - box-sizing: border-box;
  - margin: 0;
  - 100% width with 24px left/right padding on mobile
  - Content should never be wider then 100wv
  - background of --background-color
  - display: flex with column direction and justify-content: space between
- .tip__image should be absolute positioned on a border with left: 20% and bottom: 100% to be on top of `.tip__container`. 
- hr should be of border-color
- .tip__container should be relative. 
- .tip__container should have 300px margin top to fix image position overflow and 8px margin bottom. 
- .tip__title inside section should be italic and bold.
- .tip__container should have border of border-color
- .tip__container should have padding 24px, margin-left and right -24px
- .wide__container should have border of border-color
- .wide__container should have padding 12px, margin-left and right -120px
- .wide__container should have margin-left and right -64px on screen less then 840px
- .wide__container should have margin-left and right -24px on screen less then 730px
- .tip__image should be absolute with bottom: 100%, left: 20%
- .tip__image should be 280px height
- .header__theme_switch
  - should have transparent background, only 2px border
  - should be square (22px width and height with text-align: center)
  - text should be centered
- .layout__header should be:
  - `display: flex`
  - `justify-content: space-between;`
- .layout__header a and button should be:
  - vertical-align: top; with display: inline-block and margin-top: 12px
- .layout__header-right should have text-align: right
- .layout__link__active
  - 2px left/right/top/bottom border
- .footer__about_text
  - text is wrapped with a single border around whole text, not single parapgraph, of `border-color`
  - border-bottom is 0
  - padding: 12px for top/bottom/left/right
- .article__content h3 and h4 should have `padding-top: 8px` and `border-top: 1px` of border-color
