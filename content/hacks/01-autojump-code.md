
---
title: "Jump Around Your Filesystem Like a Pro"
tags: ["cli", "autojump", "ide"]
category: "lifehack"
date: "2023-06-10T16:20:11.379Z"
---

Yo, devs! Ever felt tired of typing long paths in your terminal to navigate between projects? Wanna switch between directories faster than a ninja? Your prayers have been answered. Introducing the *Autojump* CLI tool! This bad boy is gonna make your life a whole lot easier. 🚀

### Get on the Autojump Train

Autojump is a super handy CLI app that builds a database of your frequently used directories and helps you jump around like a boss.

Imagine typing `j re` and landing straight into `cd ~/Dev/react`. Or type `j and` and boom! You're in `cd ~/Dev/projects/alcobear/alcobear-android`. How cool is that?

And hey, it even lets you open any folder with your system file explorer (like Finder for Mac) by simply typing `jo smth`.

👉 [Installation instructions](https://github.com/wting/autojump#installation) got you covered. Most popular systems are supported, so just go ahead with `brew/apt-get/yum install autojump`.

{{< hackermans-tip >}}

If you're into oh-my-zsh as much as I am, then buckle up 'cause there's an [autojump plugin](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/autojump). But all it does is initialize autojump in the shell. No biggie.

Now, there's [this interesting plugin file](https://github.com/ohmyzsh/ohmyzsh/blob/master/plugins/autojump/autojump.plugin.zsh) that goes through a list of predefined possible autojump.sh locations. On my machine, autojump is installed with Homebrew and available in `$PATH`, so why not check `which autojump` before iterating through the list of directories?

Okay, maybe performance ain't that big a deal. Any modern computer with SSD can iterate through 12 folders in less than a millisecond. But what if I have a custom `/usr/hackerman/bin` folder where I compile all binaries manually on my Gentoo just for kicks? Looks like this implementation won't work there.

{{< /hackermans-tip >}}

### Make Your IDE Jump Too

So you can switch between your `todo-php` and `blog-hugo` folders in the blink of an eye. But what if you're all about that IDE life and only open terminals inside your IDE? How's this tip gonna help?

Hold onto your hats, folks, 'cause Autojump is the quickest way to open an IDE in folder X! Terminal integrations for pretty much any IDE are available, so get ready to:

1. Open VSCode with `code .` (installed automatically, [docs](https://code.visualstudio.com/docs/editor/command-line))
2. Launch Sublime Text with `subl .` ([manual install](https://www.sublimetext.com/docs/command_line.html#mac) or installed by `brew install --cask sublime-text` or [oh-my-zsh plugin](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/sublime))
3. Fire up Sublime Merge with `smerge .` ([manual install](https://www.sublimemerge.com/docs/command_line) or installed by `brew install --cask sublime-merge` or [oh-my-zsh plugin](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/sublime-merge))
4. Run IntelliJ Idea with `idea/studio/pycharm/goland/rubymine/webstorm .` (If installed by [Toolbox App](https://www.jetbrains.com/help/idea/working-with-the-ide-features-from-command-line.html#toolbox))
5. Open Xcode with `open *xcw*` ([creds to SO](https://stackoverflow.com/a/51297675))

{{< padawans-playground >}}

Wondering why the `.` symbol is used in most commands? That's because these commands follow the `command <path>` API, where the second argument is the path of a file or folder. You can use it like `code README.md` or `code ~/Dev/todo-app`. Already in your desired folder? In Unix systems, `.` refers to the *current folder*, as also used in relative paths like `./components/Cucumber`.

{{< /padawans-playground >}}