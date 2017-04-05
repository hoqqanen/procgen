# ProcGen.js: create art effortlessly

ProcGen.js is a library for producing generative artwork. Its goal is to enable people to create art effortlessly by
 - concisely expressing generic processes
 - automating parameter search
 - simplifying useful mathematical properties

Also to this end, ProcGen.js features many examples to get started (including links to open and fork on codepen.io), can be used on the web regardless of device or platform, and is open source + free (as in both hugs and speech), even for commercial purposes.

## Getting started

There are two ways to use ProcGen.js: as a library in the browser or by calling scripts via node for generation outside of the browser. The former is great for live iteration, especially in tools like codepen.io, while the latter is great for high definition renders or creating many images which might stall the browser.

To get started with Codepen, all you need to do is open one of the codepen templates (todo: link) or npm install (along with cairo dependencies, see the node canvas guide) and run the example file.

## Development Setup
Install homebrew and node
```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew install node
```

Install dependencies for node canvas (see https://github.com/Automattic/node-canvas). For OSX:
```
brew install pkg-config cairo pango libpng jpeg giflib
```

Clone procgen
```
cd ~/Documents
git clone https://github.com/hoqqanen/procgen.git
```

Install procgen dependencies and build
```
cd procgen
npm install
npm run build
```

## Bundling for the Web

One of the reasons procgen is in javascript is ultimately we want it to be shareable on the web at places like codepen. To build a bundle off of dev, just run `npm run bundle`. This will give you a script that when included defines `procgen` on the Window identical to the function built in the distribution. Proceed by calling it on a canvas element (todo: make it work without an argument by injecting a canvas that matches the dimensions of the page).

## FAQ

1. **Can I sell art made with ProcGen?**

Yes. You own everything you make with ProcGen.js. 

2. **Do I have to share the source code of what I make?**

No, again you own everything you make. We'd love if you contributed it, but that's your choice.

## What ProcGen.js is _not_:
  - it is not a generic javascript canvas library
  - it is not a game engine (despite containing animation and interaction primitives)
  - it is probably not a data visualization library, you'll likely do better with d3
