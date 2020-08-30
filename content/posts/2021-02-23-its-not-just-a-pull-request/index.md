---
title: "It's not just a Pull Request"
date: 2021-02-23
draft: false
categories:
  - software engineering
tags:
  - software engineering
  - software development
  - pull request
  - code quality
  - code review
cover:
  image: cover.jpeg
  relative: true
  caption: "Photo by [Maxwell](https://unsplash.com/@maxcodes) Nelson on [Unplash](https://unsplash.com/s/photos/software)"
canonicalUrl: https://thepabloaguilar.medium.com/its-not-just-a-pull-request-9ee42cc080e
---

In all my professional experiences so far I've seen a lot of people/teams ignoring
the meaning behind a [Pull Request (PR)](https://docs.github.com/pt/github/collaborating-with-issues-and-pull-requests/about-pull-requests),
treating it like a kind of bureaucracy to deploy their piece of code.

Sometimes I heard people saying to each other: "I'll open a PR, just accept it because
everything is fine". In the end that accepted PR crashed the entire system,
I can say that reviewer was as wrong as the reviewee because he was negligent!

We can't automate everything, people think by using __automated tests__ they don't have to do anything else to guarantee the code quality.

By __automated tests__ I mean:
* Unit Tests, Integration Tests, etc.
* Static Tests (linters)
* [Static Typing Tests](https://sobolevn.me/2019/08/testing-mypy-types) (if you're using a language with optional static type like Python)

__In the next topics, I'll try to explain my point of view about code and its quality in the business world!__

## What is the code?

> Every project/codebase is a company's asset.

The code we write isn't ours, the code belongs to the company. We're just momentarily responsible for it,
perhaps in a few weeks the project goes to another team, and also another project can reach our team!

Due to the fact that projects can be moved around teams, it's our duty to maintain the quality of the code we write,
we need to care about it not because someone wants but because we should, it's a task for everyone who writes code.

## Quality

> Quality is an empathy thing with who maintained, maintains and will maintain the code.

Many people think that automated tests are enough to guarantee quality but the equation should be something like this:

> quality = automated tests + legibility + maintainability + good architecture

__Why does the review process exist in the Pull Request if I can automatically merge it after a successful pipeline?__

Because we can't guarantee legibility, maintainability, and good architecture. People think that running a linter and having 100% code coverage is enough but it isn't.

Remember, code coverage doesn't mean test quality!

As a team, we're responsible for the code in the ___main___ branch. When someone creates other branches
to implement a new feature or fix some bug who created the branch and the reviewer are responsible
to guarantee the quality of the code that will be merged into the ___main___ branch.

Some people say that code is just a way to reach the product, but if that code doesn't have quality and definition,
what will this mean to the final product?

Probably a product that no one will want to maintain because it'll be hard to understand how it works.

## Pull Request

A Pull Request is a request to add/change the company's asset, it's something that can be in production already, so,
we need to guarantee high quality because our customers will be directly affected.

The Pull Request is where we can validate every quality aspect of the code that will be merged into the ___main___ branch, trying to reduce any possible mistakes in the code!

One of the most exciting things about Pull Requests is that everyone learns something from both sides (reviewer and reviewee).

---

Special Thanks to people who reviewed:
* [Nikita Sobolevn](https://github.com/sobolevn)
* [Gustavo Millen](https://github.com/millengustavo)
* [Bruno Delfino](https://github.com/bruno-delfino1995)

Already published on:
* [Medium](https://thepabloaguilar.medium.com/its-not-just-a-pull-request-9ee42cc080e)
* [dev.to](https://dev.to/thepabloaguilar/it-s-not-just-a-pull-request-21)
