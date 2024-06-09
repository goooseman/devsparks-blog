---
title: "Say Goodbye to Cloning: Git Worktrees to the Rescue"
category: lifehack
date: 2023-06-23T09:39:11.379Z
tags:
  - git
  - worktree
  - productivity
aliases:
  - /hacks/04-git-worktree
---

![Tree oldschool illustration](04-git-worktree.png)
_git worktree, cloned 1930s era comic strip contemporary pop art collage --ar 16:9 --v 5.1_

Ever found yourself in need of working with multiple branches or versions of your project at once? Tired of cloning the entire repo again and again, only to wait for that painfully slow `git clone`? Well, my fellow devs, it's time to step up your Git game with **Git Worktrees**! 🌳

## What's a Git Worktree?

A _worktree_ in Git allows you to create multiple working directories connected to the same repository. Each worktree is independent, letting you switch between branches and commits without disturbing your other work. It's like having a parallel universe of productivity right on your local machine! 🚀

### How to Create a Worktree

Let's say you've cloned a massive repo and plan to stick around for a while. Instead of cloning it again, create another worktree like this:

```bash
# I'm inside devsparks-blog project
git worktree add ../devsparks-blog-master master
```

_Feel free to use develop if your project is git-flow enabled._

Here's how I use worktrees:

- Create new branches from master/develop: `git pull && git checkout -b new-branch && git checkout develop`
- Keep a secondary project for quick checkouts & runs when my primary folder has uncommitted changes
- Travel through git history and re-run projects to pinpoint when bugs or unexpected behavior appeared
- Peek at files/modules from another branch without switching my current branch

### Next-Level Use Case

Once I was working on this blog and needed two `hugo` servers running different code versions for visual comparison. So I created a temporary worktree with the last known good version:

```bash
git worktree add ../devsparks-good-try f325c7f
```

{{< padawans-playground >}}

Notice the commit ID instead of the branch name? Most git commands (`checkout`, `worktree add`, `pull`) accept a git ID, which can be a branch name, git tag, commit hash, or even `HEAD`.

In simpler terms: you can run not only `git checkout develop`, but also `git checkout f325c7f`, `git checkout v1.0.0`, or even `git checkout HEAD`.

{{< /padawans-playground >}}

So there you have it! Git Worktrees are like a secret weapon in your dev arsenal, saving you time and boosting productivity. Share the knowledge, and let's keep those worktrees growing! 🌳🔥