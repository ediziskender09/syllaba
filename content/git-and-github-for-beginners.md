---
slug: git-and-github-for-beginners
title: "Git & GitHub for Beginners"
summary: "A complete foundation in Git and GitHub—repositories, commits, branches, merges, pull requests, collaboration habits, and interactive quizzes that explain wrong answers."
category: "Development"
type: course
level: beginner
tier: deep
price: 3
minutes: 180
tags: [git, github, version control, collaboration, pull requests]
featured: false
publishedAt: "2026-03-13"
---

## What You'll Learn

By the end of this lesson, you will understand what version control is and why Git became the default tool for software teams. You will create repositories, stage changes, write clear commits, inspect history, create branches, merge work, resolve simple conflicts, and collaborate through GitHub with pull requests and reviews. You will also learn common beginner mistakes—messy commits, committing secrets, editing on the wrong branch—and how to build safer habits.

Git tracks the history of your project as a sequence of snapshots. GitHub is a hosting and collaboration platform built around Git repositories. They are related but not identical. You can use Git alone on your computer. GitHub adds remote storage, pull requests, issues, access control, and team workflows.

This course emphasizes practical judgment. Commands matter, but the deeper skill is communicating change: what changed, why it changed, and how reviewers can trust it.

## Why Version Control Exists

Without version control, people copy folders named `project-final`, `project-final-v2`, and `project-final-REAL`. That system collapses as soon as two people edit at once or a bug appears and nobody remembers what changed yesterday.

Version control solves three problems:

1. History: you can see how files evolved and recover older versions.
2. Branching: you can try ideas without breaking the main line of work.
3. Collaboration: multiple people can integrate changes deliberately.

Git is distributed. Every clone can contain the full history. That design makes local commits fast and offline work possible. Remotes such as GitHub become coordination points rather than the only place history exists.

## Core Mental Model: Working Tree, Staging Area, Repository

Git has three important places for your changes:

- Working tree: the files you edit normally in your editor
- Staging area (index): the snapshot of changes you prepare for the next commit
- Repository: the committed history stored by Git

A typical flow looks like this:

```bash
# edit files
git status
git add README.md
git commit -m "Explain setup steps for new contributors"
```

`git status` is your dashboard. Use it constantly. It tells you which files are modified, staged, or untracked.

`git add` stages changes. You can stage a whole file or, with care, selected hunks. Staging lets you craft commits that tell one story instead of dumping every local edit together.

`git commit` records a snapshot with metadata: author, time, and message. Commits are identified by hashes. You rarely type full hashes; short forms and branch names are enough day to day.

## Installing Git and Setting Identity

Install Git from the official site or your package manager, then configure your identity:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

Use the email associated with your GitHub account if you want commits linked correctly. Check settings with `git config --global --list`.

Optional but useful: set your default branch name to `main` and choose an editor you know.

## Creating and Cloning Repositories

To start a new local repository:

```bash
mkdir notes-app
cd notes-app
git init
```

To copy an existing remote repository:

```bash
git clone https://github.com/org/repo.git
cd repo
```

Cloning downloads history and creates a local branch that tracks the remote default branch, usually `main`. Prefer cloning when joining an existing project. Prefer `git init` when starting something new locally before you create a remote.

## Reading Status and Diffs

Before committing, inspect what changed:

```bash
git status
git diff
git diff --staged
```

`git diff` shows unstaged changes. `git diff --staged` shows what will go into the next commit. Reading diffs is a professional habit. It catches accidental debug logs, leftover comments, and files that should not be committed.

## Writing Good Commit Messages

A commit message should explain why the change exists, not only what files moved. Prefer concise, imperative subject lines:

```text
Add password reset validation
Fix broken course slug redirect
Refine onboarding copy for mobile
```

Avoid messages like `update`, `fix`, `asdf`, or `final final`. Future debugging depends on searchable, meaningful history.

Small commits are easier to review and revert. A commit that both redesigns navigation and upgrades a database schema is hard to reason about. Split unrelated changes when you can.

<!-- quiz:git-checkpoint-1 -->

## Branching: Safe Places to Experiment

A branch is a movable pointer to a commit. Branches let you develop features, experiments, and fixes in isolation.

```bash
git branch feature/search-box
git switch feature/search-box
```

Or create and switch in one step:

```bash
git switch -c feature/search-box
```

`main` (or `master` in older repos) usually represents the stable line. Feature branches keep unfinished work out of that stable line.

Name branches clearly: `feature/...`, `fix/...`, `chore/...`. Names are communication tools for teammates.

List branches with `git branch`. Delete a merged local branch when you no longer need it, after confirming the work is integrated.

## Merging and Rebasing at a Beginner Level

To bring branch work into another branch, check out the target and merge:

```bash
git switch main
git merge feature/search-box
```

A fast-forward merge moves the branch pointer forward when no divergent commits exist. A merge commit records that two histories joined.

Rebasing replays commits onto another base. It can create a cleaner linear history, but beginners should learn merge workflows first and avoid rebasing shared public branches until they understand the risks. Never rewrite history that teammates already based work on unless the team explicitly agrees.

## Conflicts Are Normal

Conflicts occur when Git cannot automatically combine overlapping edits. Git marks conflicted files. Your job is to edit them into the intended final content, then stage and complete the merge.

Conflict markers look like this:

```text
<<<<<<< HEAD
current branch content
=======
incoming content
>>>>>>> feature/search-box
```

Remove the markers, keep the correct code, save, then:

```bash
git add path/to/file
git commit
```

For merge commits, completing the merge creates the commit. Read the surrounding code carefully. Blindly accepting “theirs” or “ours” without understanding can delete important work.

## Undoing Safely

Git offers many undo tools. Beginners should prefer safe ones first.

- Unstage a file: `git restore --staged FILE`
- Discard unstaged working tree changes to a file: `git restore FILE` (destructive to uncommitted edits)
- Create a new commit that reverses a previous commit: `git revert COMMIT`

Avoid destructive history rewriting on shared branches. `git reset --hard` can discard work permanently. Use it only when you are sure the changes are disposable and not needed by others.

When unsure, copy your project folder or create a backup branch before experimenting:

```bash
git branch safety-net
```

## .gitignore and Secrets

Not every file should be tracked. Build outputs, dependencies, environment files, and OS junk usually belong in `.gitignore`.

```text
node_modules/
.env
.DS_Store
dist/
```

Never commit secrets: API keys, private tokens, passwords, private certificates. If you accidentally commit a secret, treat it as compromised: rotate the credential and follow platform guidance for removing sensitive data from history. Prevention is far easier than cleanup.

Review `git status` before every commit. If `.env` appears, stop.

## GitHub Remotes

A remote is a named reference to another repository, commonly `origin`.

```bash
git remote -v
git push -u origin feature/search-box
git pull origin main
```

`git push` uploads local commits. `git pull` fetches and integrates remote updates. Beginners should pull often on shared branches to reduce surprise conflicts.

Create a repository on GitHub, then connect it:

```bash
git remote add origin https://github.com/you/repo.git
git push -u origin main
```

SSH and HTTPS are both common authentication methods. Choose one, set it up carefully, and stay consistent.

<!-- quiz:git-checkpoint-2 -->

## Pull Requests: Collaboration Around Change

A pull request (PR) proposes that one branch be merged into another, usually into `main`. PRs are where teams discuss design, catch bugs, and document intent.

A strong PR includes:

- A clear title
- A short summary of why the change exists
- Notes on how to test
- Screenshots for UI changes when useful
- A focused diff that reviewers can finish

Avoid enormous PRs that mix refactors, feature work, and unrelated formatting. Reviewers miss things in walls of diff.

Request review from people who know the area. Respond to comments with curiosity rather than defensiveness. If you disagree, explain tradeoffs. If you agree, make the change or explain when you will follow up.

## Issues, Projects, and Lightweight Process

GitHub Issues track bugs, tasks, and ideas. Linking an issue to a PR creates useful history: why work started and where it landed. You do not need a complex project-management system to benefit from clear issue titles and acceptance criteria.

Good issue hygiene:

- One problem per issue when practical
- Steps to reproduce for bugs
- Expected versus actual behavior
- Environment notes when relevant

## Forks and Open Source Workflow

In many open source projects, contributors fork the repository (copy it under their account), clone the fork, create a branch, push to the fork, and open a PR against the upstream project. This keeps permissions safer while welcoming external contributions.

Read a project’s contributing guide before investing hours. Conventions differ: commit style, test requirements, branch naming, and review expectations vary.

## Tags and Releases at a Glance

Tags mark important points such as version releases. Beginners can treat tags as bookmarks for versions while focusing first on commits, branches, and PRs. When you publish libraries or apps, annotated tags and release notes help users understand what changed.

## Common Mistakes and How to Avoid Them

Mistake 1: Committing directly to `main` on a shared project when the team expects branches and PRs.

Mistake 2: Writing vague commits that hide intent.

Mistake 3: Committing `node_modules` or build artifacts and bloating the repository.

Mistake 4: Committing secrets and tokens.

Mistake 5: Working for days without pulling remote changes, then facing painful merges.

Mistake 6: Using destructive reset commands without a backup branch.

Mistake 7: Mixing unrelated changes in one PR.

Mistake 8: Ignoring `git status` and guessing what will be committed.

## Practice Labs

Practice 1 — Personal notes repo: Create a local repo, add a README, commit, create a GitHub remote, and push.

Practice 2 — Feature branch: Add a new markdown file on a branch, commit, open a PR, and merge it.

Practice 3 — Intentional conflict: On two branches, edit the same line differently, merge, and resolve the conflict carefully.

Practice 4 — Clean commits: Make three small commits with clear messages instead of one giant dump.

Practice 5 — Ignore file: Create a fake `.env`, confirm it is ignored, and verify it never appears in `git status` as an addable tracked file after ignoring.

## Team Habits That Scale

Agree on a default branch. Agree on whether merges or rebases are preferred for feature branches. Protect `main` with required reviews when the team is ready. Use CI checks to catch broken tests before merge.

Document setup in README: how to install, run, test, and contribute. New contributors should not need tribal knowledge.

## Stashing and Temporary Context Switching

Sometimes you are mid-edit when an urgent fix arrives. `git stash` temporarily shelves uncommitted changes so you can switch branches cleanly.

```bash
git stash push -m "wip search UI"
git switch main
# fix, commit, push
git switch feature/search-box
git stash pop
```

Stashes are helpful and easy to forget. List them with `git stash list`. Prefer committing to a WIP branch when the work is valuable enough to keep with clearer history. Stash is for short interruptions, not long-term storage.

## Cherry-pick and Targeted Fixes

`git cherry-pick` copies a specific commit onto your current branch. It is useful when a bugfix must land on `main` without bringing an entire feature branch. Use it sparingly and understand that duplicated commits can appear in history if the same change later merges through another path. For beginners, merging a small dedicated fix branch is often clearer than creative cherry-picking.

## Binary Files and Repository Weight

Git can store images and other binaries, but large binaries inflate clones. Avoid committing huge media unnecessarily. Use Git LFS when your team’s workflow requires versioning large assets. Even then, ask whether the asset belongs in the repo or in object storage with documented links.

## Signing and Verification at a Glance

Some teams require signed commits for authenticity. Beginners can treat this as an advanced setting to enable when a workplace asks for it. The conceptual point is trust: history can record not only what changed, but cryptographic evidence of who authored the commit under configured keys.

## Choosing Clone Depth and Partial History

Shallow clones (`--depth`) download less history and can speed CI. For learning and everyday feature work, a full clone is usually simpler. Know that shallow clones may limit some history operations until deepened. Prefer defaults while learning.

## Glossary

**Repository:** A project’s Git-managed directory and history.

**Commit:** A recorded snapshot with message and metadata.

**Branch:** A movable pointer to a commit, used for parallel work.

**Remote:** A networked copy of a repository, such as GitHub’s `origin`.

**Clone:** A local copy of a repository including history.

**Pull request:** A proposal to merge one branch into another with discussion.

**Conflict:** Overlapping changes Git cannot merge automatically.

**Tracking branch:** A local branch linked to a remote branch.

## Quality Bar for Completion

You are ready to move on when you can explain working tree versus staging versus history, create meaningful commits, use feature branches confidently, push to GitHub, open a clear pull request, and resolve a simple conflict without panic. Memorizing every flag is unnecessary. Knowing what story your history tells is essential.

## Summary

Git records how a project evolves. GitHub helps teams share that evolution through remotes, pull requests, and reviews. Start with status, diff, add, commit, branch, and push. Grow into merges, conflict resolution, and collaborative PR habits. Protect secrets, keep commits focused, and treat history as communication for future readers.

If you practice those habits, version control stops feeling like ceremony and becomes a daily safety net for creative technical work.

<!-- quiz:git-final -->

## Appendix: A Day-in-the-Life Workflow

Morning: `git switch main`, `git pull`, create `feature/lesson-cards`. Midday: edit files, run the app, `git status`, stage related files, commit with a clear message. Afternoon: push the branch, open a PR with test notes, request review. Later: address comments in new commits, confirm checks pass, merge, switch back to `main`, pull, and delete the stale local branch.

This rhythm is boring in the best way. Boredom in version control means fewer emergencies.

## Appendix: Reading History

Useful inspection commands:

```bash
git log --oneline
git log --oneline --graph --decorate --all
git show COMMIT
git blame FILE
```

`git log` tells the story. `git show` inspects one commit. `git blame` (also called annotate in some UIs) shows who last changed each line—use it to find context, not to assign blame emotionally.

## Appendix: Recovery Mindset

Before using an unfamiliar undo command, ask: Is this change committed? Is it pushed? Do others depend on it? If the answer to the last two is yes, prefer revert over rewrite. If the change is only local and disposable, restore or reset may be fine.

Create safety branches liberally while learning. Disk space is cheap. Confidence is expensive.

## Comprehensive Walkthrough: First Solo Project on GitHub

Imagine you are building a small course notes app. Create a folder, initialize Git, and write a README that explains the purpose in five lines. Make your first commit with a message such as `Add project README with setup intent`. Add a `.gitignore` before you install dependencies so `node_modules` never appears as a temptation.

Create a GitHub repository with the same name. Do not initialize it with a README if you already have local commits, or you will invent an unnecessary first merge. Add the remote, push `main`, and confirm the files appear on GitHub.

Next, create `feature/add-lesson-list`. Add a simple HTML or Markdown file listing three lessons. Commit with `Add starter lesson list for home view`. Push the branch and open a pull request titled “Add starter lesson list.” In the body, write what changed, why, and how a reviewer can verify it. Merge the PR, switch locally to `main`, pull, and delete the feature branch.

This walkthrough trains the entire happy path without drama. Repeat it until the sequence is muscle memory.

## Comprehensive Walkthrough: Resolving a Real Conflict

On `main`, edit `README.md` so the first heading says “Course Notes.” Commit. Create `feature/readme-tone` and change the same heading to “Syllaba Course Notes.” Meanwhile, simulate a teammate change by switching back to `main` and changing the heading to “Course Notes App,” then commit and push if you are practicing with a remote.

When you merge or rebase the feature branch, Git will stop. Open the file, choose a final heading that combines the best intent—perhaps “Syllaba Course Notes App”—remove conflict markers, stage, and complete the merge. Run the app or re-read the README aloud. Confirm no markers remain anywhere in the repo with a project-wide search for `<<<<<<<`.

The lesson is emotional as much as technical: conflicts are editable text, not personal failure.

## Deep Dive: What Reviewers Actually Look For

Reviewers skim for risk. They ask whether the change is scoped, whether tests or screenshots support claims, whether secrets slipped in, whether naming is clear, and whether the PR description matches the diff. Help them by making the answer obvious.

If you refactored while adding a feature, say so and consider splitting next time. If you could not add tests, say what you verified manually. If a temporary workaround exists, mark it with a TODO linked to an issue. Review speed is a gift you give your future teammates by reducing ambiguity.

## Deep Dive: Commit Hygiene Over Time

History is a product. In six months, you will search messages for “redirect,” “auth,” or “pricing.” Messages like `wip` and `fix stuff` will waste your afternoon. Prefer boring precision.

Also prefer commits that leave the project buildable when practical. A commit that deletes a critical file and only restores it two commits later makes `git bisect` painful. You will not need bisect on day one, but habits that support it are free.

## Extended Practice: Team Simulation

Pair with a friend or use two folders/clones. Person A owns `feature/nav`. Person B owns `feature/footer`. Both edit `index.html` in different sections, push, and open PRs. Merge one, then have the other pull `main` into their branch before final review. Practice writing review comments that suggest a concrete improvement rather than “this feels off.”

Then intentionally create a conflict and resolve it together on a video call. Saying your reasoning out loud accelerates learning.

## Appendix: Command Cheatsheet

```bash
git init
git clone <url>
git status
git diff
git diff --staged
git add <file>
git commit -m "Message"
git switch -c feature/name
git switch main
git merge feature/name
git pull
git push -u origin branch-name
git remote -v
git log --oneline --graph --decorate
git restore --staged <file>
git restore <file>
git revert <commit>
git branch -d feature/name
```

Keep this list nearby for the first two weeks. Understanding beats memorization, but a short list reduces panic.

## Appendix: Social Norms on Shared Repos

Do not force-push to shared default branches. Do not commit commented-out experiments that disable security checks. Do not approve your own PR when team rules require independent review. Do leave the campground cleaner than you found it: if you touched a file and noticed a typo in a nearby comment, fixing it in a focused follow-up can be kind—just avoid unrelated sprawl in a risky PR.

## Final Encouragement

Every competent Git user has made a messy commit, merged the wrong branch, or feared a conflict screen. Progress is learning to slow down, read status, and choose the least surprising next step. Stay curious about history. Stay disciplined about messages and branch scope. Stay calm when conflicts appear—they are collaboration made visible. With that posture, Git and GitHub become reliable partners in building software with others.
