# DevSparks Blog Specification

## Overview

DevSparks - short, but meaningful lifehacks for developers. 


## Technology Stack

Blog address: `devsparks.goooseman.dev`.
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

## Requirements

## Images

Footer and content images have `2x` versions, make sure to use them for Retina display.

### Theming

Two themes: light and dark. Theme implementation is JS/CSS only.
- When site is loaded, system theme should be checked if possible.
- Website should watch for system theme changes and update site's theme.
- Adds `body__theme__light` or `body__theme__dark` class to body.
- theme CSS variblaes:
    - light:
        - `background-color`: `#ffc000`
        - `text-color`: `#40414e`
        - `border-color`: `#40414e`
    - dark:
        - `background-color`: `#40414e`
        - `text-color`: `#ffc000`
        - `border-color`: `#ffc000`
- `background-color` should be background of whole website

### Common styling:

- Fira Code font (`https://fonts.googleapis.com/css2?family=Fira+Code&display=swap`)
- Border width: 2px (global variable)
- Links: text color both when normal or hovered
- Links: always have border bottom 2px
- Links: never underline, not on hover also
- Links: on hover should invert color and background color with an animation of sliding from bottom to top
- Navigation links in header: should have `.layout__link__active` class, when page is active. Hacks page should be active when index or any hack is opened. About should be active, when About page is opened.
- breakpoints: >680px - desktop, <680px mobile

### Site layout

- `.layout__container`
  - container class to set content's width
  - `<header>`, `<main>` and `<footer>` should be wrapped inside .layout__container
  - on mobile phones can't be bigger then screen width
- `<header>`:
  - contains navigation links: Hacks, About, [GitHub](https://github.com/goooseman/devsparks-blog), Fix typo link, switch theme toggle.
  - **Fix typo and switch theme should be aligned to the right side!**
  - should contain `.layout__header` class
  - Fix typo button just opens following link in a new tab: "https://github.com/goooseman/devsparks-blog/issues/new?title=DevSparks+Feedback&body=I+found+something+wrong+on+this+page%3A%0A%0A++{CURRENT_PAGE}%0A%0A++Here%27s+what+it+is%3A", make sure to replace `{CURRENT_PAGE}` with correct url
  - switch theme switch
    - should contain `.header__theme_switch` class
    - Should only have 🌞 icon if current theme is dark and 🌒 icon if current theme is light
    - Should have aria-label: 'Switch to light theme' if current theme is dark and 'Switch to dark theme' if current theme is light
    - Should have pointer: cursor when hovered
- `<main>`
  - it has background shadow on top/bottom to make it look like lower then header and footer to add deepness
  - should have padding top and bottom with 50px
- `<footer>`
  - contains photo of the author with transparent bg and a small about text: Footer Ipsum
  - photo of author: `/human.png` (`human@2x.png`)
  - photo of author when hovered: `/robot.png` (`robot@2x.png`)
  - height of the photo: 160px
  - should have flex layout: photo on the left, text on the right
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
- Comments (just render #remark42 div only on the Hack page)

Tags should be links, when clicked other hacks by the same tag should be listed.

Do not generate hack itself, only the layout.

### Code syntax highlighting

- Any code should be highlighted. 
- Typescript, javascript, java, go, rust support is required. 
- Highlighting is inverting text color and background, so text color is used for bg and bg color is used for text. 
- Should work for single-lines `code` blocks (\` in markdown) and also multiline ones (\`\`\`) for different programming languages

### Project structure

- Makefile
- .gitignore (`.hugo_build.lock`)
- config.toml
  - Do not include anything about themes or remark42
  - Do not use JSON objects in this file
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
  - footer and header are in separate files, just connect!
  - use `<link rel="stylesheet" href="{{ "css/main.css" | relURL }}">` to connect all styles files
  - do not use `disabled` on any css
  - connect both themes
  - use `<script src="{{ "js/theme-switcher.js" | relURL }}" defer></script>` to connect JS
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
  - contains all the site CSS, but not theming
- themes/devsparks/static/css/syntax-highlighting.css
  - contains only CSS for code syntax highligting
- themes/devsparks/static/css/theme-light.css
  - contains only colors and other changes for light theme, do not contain any common styles
- themes/devsparks/static/css/theme-dark.css
  - contains only colors and other changes for dark theme, do not contain any common styles
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
- .footer__about_text
- .footer__author-photo

Classname specs:

- .layout__container:
  - 600px width on desktop, aligned center
  - 100% width with 20px left/right padding on mobile
- .tip__image should be absolute positioned on a border with left: 20% and bottom: 100% to be on top of `.tip__container`. 
- .tip__container should be relative. 
- .tip__container should have 300px margin top to fix image position overflow and 5px margin bottom. 
- .tip__title inside section should be italic and bold.
- .tip__container should have border of border-color
- .tip__container should be relative
- .tip__container should have padding 20px, margin-left and right -20px
- .tip__image should be absolute with bottom: 100%, left: 20%
- .tip__image should be color inverted in dark theme
- .tip__image should be 280px height
- .tip__container should have margin-top: 30px;
- .header__theme_switch
  - should have transparent background, only 2px border
  - should be square
  - text should be centered
- .layout__header > layout__container should be:
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

### Hugo documentation

Page Variables 
.AlternativeOutputFormats
contains all alternative formats for a given page; this variable is especially useful link rel list in your site’s <head>. (See Output Formats.)
.Aliases
aliases of this page
.Ancestors
get the ancestors of each page, simplify breadcrumb navigation implementation complexity
.BundleType
the bundle type: leaf, branch, or an empty string if the page is not a bundle.
.Content
the content itself, defined below the front matter.
.Data
the data specific to this type of page.
.Date
the date associated with the page; .Date pulls from the date field in a content’s front matter. See also .ExpiryDate, .PublishDate, and .Lastmod.
.Description
the description for the page.
.Draft
a boolean, true if the content is marked as a draft in the front matter.
.ExpiryDate
the date on which the content is scheduled to expire; .ExpiryDate pulls from the expirydate field in a content’s front matter. See also .PublishDate, .Date, and .Lastmod.
.File
filesystem-related data for this content file. See also File Variables.
.Fragments
Fragments returns the fragments for this page. See Page Fragments.
.FuzzyWordCount
the approximate number of words in the content.
.IsHome
true in the context of the homepage.
.IsNode
always false for regular content pages.
.IsPage
always true for regular content pages.
.IsSection
true if .Kind is section.
.IsTranslated
true if there are translations to display.
.Keywords
the meta keywords for the content.
.Kind
the page’s kind. Possible return values are page, home, section, taxonomy, or term. Note that there are also RSS, sitemap, robotsTXT, and 404 kinds, but these are only available during the rendering of each of these respective page’s kind and therefore not available in any of the Pages collections.
.Language
a language object that points to the language’s definition in the site configuration. .Language.Lang gives you the language code.
.Lastmod
the date the content was last modified. .Lastmod pulls from the lastmod field in a content’s front matter.
If lastmod is not set, and .GitInfo feature is disabled, the front matter date field will be used.
If lastmod is not set, and .GitInfo feature is enabled, .GitInfo.AuthorDate will be used instead.
See also .ExpiryDate, .Date, .PublishDate, and .GitInfo.

.LinkTitle
access when creating links to the content. If set, Hugo will use the linktitle from the front matter before title.
.Next
Points up to the next regular page (sorted by Hugo’s default sort). Example: {{ with .Next }}{{ .Permalink }}{{ end }}. Calling .Next from the first page returns nil.
.NextInSection
Points up to the next regular page below the same top level section (e.g. in /blog)). Pages are sorted by Hugo’s default sort. Example: {{ with .NextInSection }}{{ .Permalink }}{{ end }}. Calling .NextInSection from the first page returns nil.
.OutputFormats
contains all formats, including the current format, for a given page. Can be combined the with .Get function to grab a specific format. (See Output Formats.)
.Pages
a collection of associated pages. This value will be nil within the context of regular content pages. See .Pages.
.Permalink
the Permanent link for this page; see Permalinks
.Plain
the Page content stripped of HTML tags and presented as a string. You may need to pipe the result through the htmlUnescape function when rendering this value with the HTML output format.
.PlainWords
the slice of strings that results from splitting .Plain into words, as defined in Go’s strings.Fields.
.Prev
Points down to the previous regular page (sorted by Hugo’s default sort). Example: {{ if .Prev }}{{ .Prev.Permalink }}{{ end }}. Calling .Prev from the last page returns nil.
.PrevInSection
Points down to the previous regular page below the same top level section (e.g. /blog). Pages are sorted by Hugo’s default sort. Example: {{ if .PrevInSection }}{{ .PrevInSection.Permalink }}{{ end }}. Calling .PrevInSection from the last page returns nil.
.PublishDate
the date on which the content was or will be published; .Publishdate pulls from the publishdate field in a content’s front matter. See also .ExpiryDate, .Date, and .Lastmod.
.RawContent
raw markdown content without the front matter. Useful with remarkjs.com
.ReadingTime
the estimated time, in minutes, it takes to read the content.
.Resources
resources such as images and CSS that are associated with this page
.Ref
returns the permalink for a given reference (e.g., .Ref "sample.md"). .Ref does not handle in-page fragments correctly. See Cross References.
.RelPermalink
the relative permanent link for this page.
.RelRef
returns the relative permalink for a given reference (e.g., RelRef "sample.md"). .RelRef does not handle in-page fragments correctly. See Cross References.
.Site
see Site Variables.
.Sites
returns all sites (languages). A typical use case would be to link back to the main language: <a href="{{ .Sites.First.Home.RelPermalink }}">...</a>.
.Sites.First
returns the site for the first language. If this is not a multilingual setup, it will return itself.
.Summary
a generated summary of the content for easily showing a snippet in a summary view. The breakpoint can be set manually by inserting <!--more--> at the appropriate place in the content page, or the summary can be written independent of the page text. See Content Summaries for more details.
.TableOfContents
the rendered table of contents for the page.
.Title
the title for this page.
.Translations
a list of translated versions of the current page. See Multilingual Mode for more information.
.TranslationKey
the key used to map language translations of the current page. See Multilingual Mode for more information.
.Truncated
a boolean, true if the .Summary is truncated. Useful for showing a “Read more…” link only when necessary. See Summaries for more information.
.Type
the content type of the content (e.g., posts).
.Weight
assigned weight (in the front matter) to this content, used in sorting.
.WordCount
the number of words in the content.
Writable Page-scoped Variables 
.Scratch
returns a Scratch to store and manipulate data. In contrast to the .Store method, this scratch is reset on server rebuilds.
.Store
returns a Scratch to store and manipulate data. In contrast to the .Scratch method, this scratch is not reset on server rebuilds.
Section Variables and Methods 
Also see Sections.

.CurrentSection
The page’s current section. The value can be the page itself if it is a section or the homepage.
.FirstSection
The page’s first section below root, e.g. /docs, /blog etc.
.InSection $anotherPage
Whether the given page is in the current section.
.IsAncestor $anotherPage
Whether the current page is an ancestor of the given page.
.IsDescendant $anotherPage
Whether the current page is a descendant of the given page.
.Parent
A section’s parent section or a page’s section.
.Section
The section this content belongs to. Note: For nested sections, this is the first path element in the directory, for example, /blog/funny/mypost/ => blog.
.Sections
The sections below this content.
The .Pages Variable 
.Pages is an alias to .Data.Pages. It is conventional to use the aliased form .Pages.

.Pages compared to .Site.Pages 
A regular page is a “post” page or a “content” page.
A leaf bundle is a regular page.
A list page can list regular pages and other list pages. Some examples are: homepage, section pages, taxonomy (/tags/) and term (/tags/foo/) pages.
A branch bundle is a list page.
.Site.Pages
Collection of all pages of the site: regular pages, sections, taxonomies, etc. – Superset of everything!
.Site.RegularPages
Collection of only regular pages.
The above .Site. .. page collections can be accessed from any scope in the templates.

Below variables return a collection of pages only from the scope of the current list page:

.Pages
Collection of regular pages and only first-level section pages under the current list page.
.RegularPages
Collection of only regular pages under the current list page. This excludes regular pages in nested sections/list pages (those are subdirectories with an _index.md file.
.RegularPagesRecursive
Collection of all regular pages under a list page. This includes regular pages in nested sections/list pages.
Note
From the scope of regular pages, .Pages and .RegularPages return an empty slice.
Page Fragments 
New in v0.111.0
The .Fragments method returns a list of fragments for the current page.

.Headings
A recursive list of headings for the current page. Can be used to generate a table of contents.
.Identifiers
A sorted list of identifiers for the current page. Can be used to check if a page contains a specific identifier or if a page contains duplicate identifiers:
{{ if .Fragments.Identifiers.Contains "my-identifier" }}
    <p>Page contains identifier "my-identifier"</p>
{{ end }}

{{ if gt (.Fragments.Identifiers.Count "my-identifier")  1 }}
    <p>Page contains duplicate "my-identifier" fragments</p>
{{ end }}
.HeadingsMap
Holds a map of headings for the current page. Can be used to start the table of contents from a specific heading.
Also see the Go Doc for the return type.

Fragments in hooks and shortcodes 
.Fragments are safe to call from render hooks, even on the page you’re on (.Page.Fragments). For shortcodes we recommend that all .Fragments usage is nested inside the {{<>}} shortcode delimiter ({{%%}} takes part in the ToC creation so it’s easy to end up in a situation where you bite yourself in the tail).

The global page function 
New in v0.111.1
Hugo almost always passes a Page as the data context into the top level template (e.g. single.html) (the one exception is the multihost sitemap template). This means that you can access the current page with the . variable in the template.

But when you’re deeply nested inside .Render, partial etc., accessing that Page object isn’t always practical or possible.

For this reason, Hugo provides a global page function that you can use to access the current page from anywhere in any template.

{{ page.Title }}
There are one caveat with this, and this isn’t new, but it’s worth mentioning here: There are situations in Hugo where you may see a cached value, e.g. when using partialCached or in a shortcode.

