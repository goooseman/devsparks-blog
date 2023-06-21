# DevSparks Blog Specification

## Overview

DevSparks - short, but meaningful lifehacks for developers. 


## Technology Stack

Blog address: `https://devsparks.goooseman.dev` (`baseURL`).
Project structure: hugo blog
Hugo version: 0.111.3
Hugo theme name: `devsparks`

- Back-end: Go, Hugo
- Front-end: HTML, CSS, JavaScript (for interactive elements)

Should have Makefile
- serve
  - to run then run hugo with docker, add additional mounts: `$(PWD):/src`, `$(PWD)/../../content:/src/content` and `$(PWD)/../../static:/src/static`. if files are changed, server should rebuild. 
- build
  - to build project with docker
- Makefile use tabs, not spaces for identation!

Should NOT create content folder.

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

Two themes: light and dark. Theme implementation is JS/CSS only.
- When site is loaded, system theme should be checked if possible.
- Website should watch for system theme changes and update site's theme.
- Website theme should be control with switcher, so both CSS should be always connected
- Adds `body__theme__light` or `body__theme__dark` class to body.
- Theme CSS variblaes should be attached to `body__theme__light` and `body__theme__dark`, not `:root`:
    - light:
        - `background-color`: `#ffc000`
        - `text-color`: `#40414e`
        - `border-color`: `#40414e`
    - dark:
        - `background-color`: `#40414e`
        - `text-color`: `#ffc000`
        - `border-color`: `#ffc000`
- Create such CSS vars in `theme-light.css` and `theme-dark.css` and reuse them in the project
- Do not write any other CSS inside theme-light and theme-dark!
- `background-color` should be background of whole website. Add in `main.css`:
```
  background-color: var(--background-color);
  color: var(--text-color);
```

- Switch theme switch
  - background: transparent
  - reset all default button styles
  - padding: 0
  - should contain `.header__theme_switch` class
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
- Navigation links in header: should have `.layout__link__active` class, when page is active. Hacks page should be active when index or any hack is opened. About should be active, when About page is opened.
- breakpoints: >680px - desktop, <680px mobile

### Header

- contains navigation links: Hacks, About, [GitHub](https://github.com/goooseman/devsparks-blog), Fix typo link, switch theme toggle.
- **Fix typo and switch theme should be aligned to the right side!**:
  - Because of that Hacks, About, GitHub should be defined in `menu.main` inside `config.yaml`
  - Hacks should have weight 10, About - 20, Github - 30
  - Hacks should have `identifier: hacks`
  - About should have `identifier: about`
  - Github should have `identifier: github`
  - Hacks is root `/`, but if any single hack is opened, menu item should also be active
  - About is `/about/`
  - Fix typo should not be defined in `config.yaml`, it should be hardcoded inside `header.html`
  - All `menu.main` items should be rendered inside one nav, Fix typo and theme switcher - inside another nav. Their parent should be flex.
- To render menu items use the following snippet:
```
    {{ $currentPage := . }}
    {{ range .Site.Menus.main }}
      <a class="{{if or (eq $currentPage.RelPermalink .URL) (eq $currentPage.Section .Identifier) }} layout__link__active{{end}}" href="{{.URL}}">{{ .Name }}</a>
    {{ end }}
```
- Fix typo button just opens following link in a new tab: "https://github.com/goooseman/devsparks-blog/issues/new?title=DevSparks+Feedback&body=I+found+something+wrong+on+this+page%3A%0A%0A++{CURRENT_PAGE}%0A%0A++Here%27s+what+it+is%3A", make sure to replace `{CURRENT_PAGE}` with correct url: `.Permalink` hugo var


### Site layout

- `<header>`:
  - should contain `.layout__header` class
- `<main>`
  - it has background shadow on top/bottom to make it look like lower then header and footer to add deepness
  - should have margin `50px -40px`
  - should have padding `20px 40px`
- `<footer>`
  - contains photo of the author with transparent bg and a small about text: Footer Ipsum
  - photo of author: `/human.png` (`human@2x.png`)
  - photo of author when hovered: `/robot.png` (`robot@2x.png`) (do not forget to use 2x for retina). Implement it in `footer-image.js` and do not forget to change `srcset` not only `src`
  - to implement hover please render two images on the screen, one with display: none, use two separate IDs and toggle their display in JS file
  - robot.png should be display: none by default
  - height of the photo: 160px
  - `.footer__container` should have flex layout: photo on the left, text on the right
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

### Hack page

A specific hack page contains:

- Title
- Date (only if exists)
- Tags (listed inline, not as bullet items)
- Text content
- Comments (just render #remark42 div only inside `single.html`)

Tags should be links, when clicked other hacks by the same tag should be listed.

Do not generate hack itself, only the layout.

### Code syntax highlighting

- for `<code>` (single line):
  - invert color and background color: color should be `--background-color`, background-color should be `--color`
  - do not add any borders or paddings
- for `<pre>` inside `<div class="highlight">`: 
  - background-color is --background-color for dark theme and --color for light theme
  - color should be `white` to keep it the default one
  - padding: 10px
- `<code>` inside `<pre>` inside `<div class="highlight">`:
  - background-color: transparent
  - color: `white`
- no more other styles should be generated
- background-color and color should be set on `body`

### Project structure

- Makefile
- .gitignore
  - .hugo_build.lock
  - /public/
  - /resources/_gen/
  - /assets/jsconfig.json
  - hugo_stats.json
- config.yaml
  - Do not include anything about themes or remark42
  - Do not use JSON objects in this file
  - Add following additional configuration:
    - `relativeUrls: true`
- themes/devsparks/layouts/_default/baseof.html
  - use `<link rel="stylesheet" href="{{ "css/main.css" | relURL }}">` to connect all styles files, there are 4 css files, connect all of them!
  - do not use `disabled` on any css
  - connect both themes
  - use `<script src="{{ "js/theme-switcher.js" | relURL }}" defer></script>` to connect JS, there are 3 JS files, connect all of them
  - `#remark42` should not be inside `baseof.html`, it is only inside `single.html
- themes/devsparks/layouts/_default/list.html
  - Contains Hacks titile if it is index
  - Contains "${title}" if not
  - Should contain `{{ define "main" }}`
- themes/devsparks/layouts/_default/single.html
  - should not contain `<main>`, because it should be inside `baseof.html`
- themes/devsparks/layouts/shortcodes/hackermans-tip.html
- themes/devsparks/layouts/shortcodes/padawans-playground.html
- themes/devsparks/static/css/main.css
  - contains all the site CSS, but not theming
- themes/devsparks/static/css/syntax-highlighting.css
  - contains only CSS for code syntax highligting
- themes/devsparks/static/css/theme-light.css
  - contains only colors and other changes for light theme, do not contain any common styles
- themes/devsparks/static/css/theme-dark.css
  - contains only colors and other changes for dark theme, do not contain any common styles
- themes/devsparks/static/js/theme-switcher.js (should contain JS for theme-switcher in the header)
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
   - footer-image-human
   - footer-image-robot

Classnames:
- .layout__header
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
- .article__remark42
- .footer__container
- .footer__about_text
- .footer__author-photo

CSS specs:

- body:
  - 600px width on desktop, aligned center
  - 100% width with 20px left/right padding on mobile
  - Content should never be wider then 100wv
  - background of --background-color
- .tip__image should be absolute positioned on a border with left: 20% and bottom: 100% to be on top of `.tip__container`. 
- .tip__container should be relative. 
- .tip__container should have 300px margin top to fix image position overflow and 5px margin bottom. 
- .tip__title inside section should be italic and bold.
- .tip__container should have border of border-color
- .tip__container should be relative
- .tip__container should have padding 20px, margin-left and right -20px
- .tip__image should be absolute with bottom: 100%, left: 20%
- .tip__image should be 280px height
- .tip__container should have margin-top: 30px;
- .header__theme_switch
  - should have transparent background, only 2px border
  - should be square (22px width and height with text-align: center)
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
- .article__remark42 should have margin-left and right -20px and margin-top of 10px

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