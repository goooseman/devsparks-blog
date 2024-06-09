---
title: Refactor large codebases with NodeJS
tags:
  - nodejs
  - refactoring
category: programming
date: 2021-03-30T00:00:00.000Z
---
# Refactor large codebases with NodeJS

An architecture of a big in-production project is a continuously changing process: new approaches and design patterns can be found by the team members while maintaining a project. Some of them are easy to apply with the help of the modern toolchain, like typescript or eslint. But some of them require tons of files around the project to be manually refactored one by one, which can cost the team days or even weeks of work.

Even if the team has enough developers and time, refactoring a large product is still extremely hard: it is impossible to stop the current development process for such a long period. And if the process is not locked, a team suffers from continuous git conflicts, forgotten to refactor code blocks, and inability to find the perfect timing to shift the changes back to the master git branch.

But does that means we are locked with the current architectural decisions? And that we are not able to perform big refactorings if they are required by the business?

My answer is **stricktly no**. Even if a team does not have resources to refactor the codebase manually, a script can be created to perform the work automatically (or at least semi-automatically) and **decrease refactoring time from weeks do days**.

> If the refactoring process is algorythmic and can be described to a fellow developer step-by-step, it can be implemented as a  script.

### Let's start with an example

We have an application which supports theming, but all the colors for each of 3 themes is defined on every component's level. For example:

```css
/* Button.module.css */
.theme-red {
    --background: var(--red);
    --link-color: var(--dark-red);
    --color: var(--white);
}
.theme-blue {
    --background: var(--blue);
    --link-color: var(--blue);
    --color: var(--white);
}
.theme-green {
    --background: rgba(var(--light-green-rgb), 0.8);
    --link-color: var(--light-green);
    --color: var(--silver);
}
```

The approach was introduced to the project back in the time when it has only two themes. And now it has 3 themes and 2 new ones are required to be added to the project. That means that team members have to manually refactor nearly every component of the project.

Additionally, business wants to have an ability to create new themes faster in the future to be able to create dark versions of the current themes.

What can we do in that kind of a situation? I believe the best way is to communicate with design and frontend teams and define a strong set of rules which should be followed during the development of new features:
- Every theme should have a definition of global custom properties defined project-wise, and the variable names are common between themes. The variables names are inspired by the [Boostrap color scheme](https://getbootstrap.com/docs/5.0/customize/color/) and follows the same `color-primary`, `color-secondary`, `color-text`, `color-text-inversed` namings.
- Those color definitions should be shared between design and development teams by creating a story in the storybook
- In the new design developments the color mapping should not differ much: if `.theme-a` uses `color-primary`, then `.theme-b`  should usually use `color-primary` also.
- But in the legacy pages a lot of exceptions will be required, so theme-specific overwrites can happen on the component level.

{{< hackermans-tip >}}

Those variables should be easy to use from the development experience point of view. It is always worth to analyze the design share tool (Zeplin/InVision/Figma) used in the team and to set it up to show the variable names instead of HEX colors. 

{{< /hackermans-tip >}}

### Refactoring existing codebase according to the new approach

It is easy to follow new scheme when new features are developed. But to refactor already existing codebase is a huge amount of work to do. Let's see what we need to do by refactoring our `Button` example:

```css
/* Button.module.css */
.root {
    --background: rgb(var(--color-primary));
    --link-color: rgb(var(--color-link));
    --color: rgb(var(--color-text-inversed)); /* `white` for .theme-red and .theme-blue, but `silver` for .theme-green */
}
.theme-green.root {
    --background: rgba(var(--color-primary-300), 0.8); /* an example of a theme-specific overwrite */
}
```

In this case all the themes just use the `color-primary` variable as the background, but `.theme-green` has an exception, it uses another variant of color-primary: `color-primary-300`, which is lighter a little.

### Why not Find&Replace?

In such situations sometimes it is enough to use the power of regexp with Find&Replace functionality of your favorite IDE. In a simple situation we can just use replace all the `var(--red)`, `var(--blue)`, `var(-green)` with `var(--color-primary)`, but that's not our case, because:

1. There are a lot of colors which are used multiple times in the same theme. For example, `--red` can be `--color-primary` and `--color-link` in `.theme-red` and `--color-secondary` in `.theme-blue`. So `var(--red)` can not be replaced with one any given constant, but the correct new vairable name could be chosen algorythmically in every given case.
2. The previous color variables are mainly HEX values. The new ones - RGB triplets (to be used in `rgb()` and `rgba()` blocks). So the new variable name should be wrapped in the `rgb()` block in some of the cases.
3. With Find&Replace it is impossible to create a new in-common `.root` defintion and to move the equal rules inside.

### A perfect case for TDD!

Looks like we already have an desired input and a desired output, so we can create a quick unit test of the script. The unit test can use a special fixtures folder with different code examples from the real codebase. The structure of the module is following:

```
📂 refactorColors/
  📂 __fixtures__/
    📂 simple/
      🎨 simple.module.css
  👨‍💻 refactorColors.ts
  👨‍💻 refactorColors.spec.ts
  👨‍💻 index.ts
```

And writing down this script is the repentance of the following easy to do steps:

1. Copy a new code example from the codebase to a new folder inside __fixtures__.
2. Create a test and specify the expectation.
3. Implement code to satisfy test constraints.
4. Refactor? Usually, it is an important step of the TDD cycle, but in our case, we develop a one-time script which does not contain any business value on it's own. So think wisely and refactor only really bad smelling code.
5. Run the script around the codebase, if any problem occurs, repeat from step 1.

{{< hackermans-tip >}}

Don't hesitate to use `.toMatchInlineSnapshot()` at the late stages of development to create expectations faster.

{{< /hackermans-tip >}}

### To parse or not to parse?

Ok, so we have written the first test, but how to write the script itself? Let's write down the most basic algorythm on how to refactor the project.

1. We need to find all the `*.module.css` files which contain the `.theme-blue` declaration. (`.theme-blue` is choosen by the design team to be the default theme)
2. For each of the color variables used in `.theme-blue` we need to check what color variable can be used for `.theme-red` and `.theme-green`.
2.1. If a variable in common can be found, use it for the new `.root` declaration block and delete this variable from the `.theme-*` definitions (e.g. `--dark-red`, `--blue`, `--light-green` variables becomes `--color-link`).
2.2. If a variable in common can not be found, use the `.theme-blue` name for the `.root` block and specify overwrites for `.theme-` blocks (e.g. `background` variable which is `color-primary` in two themes and which is overwritten in `.theme-green`).
2.3. If the variable value is not just a color (e.g. `1px solid var(--red)`), then replace only the color variable part.
2.4. If the variable value is not color at all (e.g. `4rem`), then just move it to the `.root` block and get rid of dublications in `.theme-` blocks.
3. Delete all the empty declaration blocks
4. Write changes to the filesystem if `dryRun` is `false` or return the array of modified files' contents if it is set to `true`.
5. Add `classes.root` to all the classes definitions project-wise (and this can be done manually using Find&Replace, but that's the matter of another article).

> Even though the `dryRun` mode is not used in the production mode at all, it is helpful to be used in tests.

But wait a second, how will we modify the contents of the CSS files? I know two different options:

1. Get the contents of the file as a string and replace it's contents by using `.replace()`
2. Get the contents of the file as a mutable AST, modify it's contents and serealize the tree back to a string.

In our case the first option is difficult to go with:

- We need to get a value for a specified variable name in another rule definition (e.g. on step 2 we need to get value for the `--background` custom property defined in `.theme-red` and `.theme-green` blocks). This is very difficult to get without using an AST.
- We need to delete empty definitions, create new ones, sometimes even clone definitions. This is much easier to do if AST is used.

### A strugle to choose the correct parser

So we choose to parse the code, but what library should we use in order to do that?

If we were changing `.js`, `.jsx`, `.ts`, `.tsx` files, the best option we have is the well-know [@babel/parser](https://babeljs.io/docs/en/babel-parser) which is used internally by `@babel`. It supports any custom babel plugin your project is using, so you will never get a `SyntaxError` if some weird custom syntaxsis is used (e.g. `::functionBind()`). And it is easy to use, well-documented and widely used across the internet, so a lot of ready-to-use examples are always available for you to explore.

But we need to work with `.css` files and that was something new in my experience. A quick search came up with those two different options:

- [css](https://www.npmjs.com/package/css)
- [postcss](https://www.npmjs.com/package/postcss)

Some time ago I've written a post about [choosing a correct FE dependency](https://medium.com/docler-engineering/a-practical-guide-to-choose-a-frontend-dependency-f20edf2abd2c), but in this case we do not care about library size, testability, maintainability. We need it for a one-time run-and-forgot script, so I've decided to choose just the best documentated one. [postcss parse function](https://postcss.org/api/#parse) lacks the documentation and usage examples, so I've decided to take `css`. Oh, that was definetely a big mistake...

### Are you sure tests are costwise for a one-time script?

![7 hours later](./7-hours-later.jpg)
_7 hours later - by [Spongebob Wiki](https://spongebob.fandom.com/wiki/List_of_time_cards)_


Imagine yourself working nearly 7 hours on the script. You have 6 different cases covered with tests and the code which implements the logic. Everything is great until you run the script again across all the codebase and get a new `SyntaxError` because there are a lot of CSS files in the project that uses [postcss-nested](https://github.com/postcss/postcss-nested) to nest the CSS properties. And of course `css` package is not able to parse it and there is nothing to make it parse it.

Should I have thought about it when choosing the correct tool to be used? Yep, of course I should, I was aware of the fact `postcss-nested` is used in the project. But now it's too late to blame yourselve, we need to think how to cope with a situation like that without deleting everything created in the past 7 hours.

But here is when TDD comes to the rescue! We have all the functionality covered by tests. And those tests does not contain any mocks and do not test implementation details, so a new implementation can be written safely, without a fear of breaking something.

So we just remove the `css` project from the `devDependencies` and rewrite the script to use `postcss`. There is no documentation still, but the API is self-explainitary enough and the Typescript definitions are well-crafted and useful. The API of `postcss` is nearly the same as `css`, because both of them are an AST abstraction anyway. So the first passing version has been refactored and commited in less then 30 minutes. 

Summing it up by using tests:

- we can write code faster, especially for such refactoring tasks
- we can afford to do a huge refactoring in a case of mistake

{{< hackermans-tip >}}

And in the end it appeared, that `postcss` has a lot of helper methods which makes the code much easier to read, so another 15 minutes were invested in a quick refactroing. Eventhough there is no maintainability value to refactor an one-time script, it is just a good and quick practice to learn the API better.

What helper methods am I speaking about?

`css` just supports the standart JS array while working with the AST. Here is how you can find a delete a node (a rule, a declaration, a comment block) with `css` parser.

```ts
const ruleIndex = astTree.stylesheet.rules.findIndex((r: css.Rule) => r.selectors.includes(".theme-blue")); // index is needed only to delete it
const rule = astTree.stylesheet[ruleIndex]; // and the rule object is needed to actually work with the node
// ...
astTree.stylesheet.rules.splice(ruleIndex, 1);
```

But `postcss`'s node interface provides a handy `remove()` method:

```ts
const rule = astTree.nodes.find((r) =>
    (r as postcss.Rule).selectors?.includes('.mainstream')
// ...
rule.remove();
```

{{< /hackermans-tip >}}