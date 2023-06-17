# Instructions for us, bags of meats

As of now I do not have access to 32K GPT4, so our abilities are limited and we have to cut off specification, because it is too much.

### Manual steps

#### Footer text

Footer text is inside footer.md file

#### Hugo mounts

If it not yet added to `config.toml`:

```
[module]
[[module.mounts]]
  source = '../../content'
  target = 'content'
[[module.mounts]]
  source = '../../static'
  target = 'static'
```