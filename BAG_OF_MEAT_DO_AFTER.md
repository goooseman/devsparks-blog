# Instructions for us, bags of meats

As of now I do not have access to 32K GPT4, so our abilities are limited and we have to cut off specification, because it is too much.

### Manual steps

#### Footer text

Footer text is inside footer.md file

#### Remark42 integration

Remark42 is a comments engine which has a special backend and a frontend integration. We have already deployed version at https://r42.goooseman.dev

### Frontend integration

Add following snippets to end of the body:

```
<script>
  // https://r42.com/docs/configuration/frontend/
  var remark_config = {
    host: 'https://r42.goooseman.dev',
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

Remark42 theme should be syncronised with website theme. When toggle button is clicked, please run the following code: `window.r42.changeTheme("light" | "dark")`