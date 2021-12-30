# MIT Mystery Hunt / Puzzle Club Website

Code for the MIT Mystery Hunt / Puzzle Club website. On the Puzzle Club Athena locker at `/mit/puzzle/www`.

## Development

From the folder, run `python3 -m http.server`. By default it opens a server at [http://localhost:8000/](http://localhost:8000/). Open that page in your browser to view the site.

To update the website, just put the whole thing on the server. It works. Note that there's a git repo on the locker, so from the locker, you can just `git pull` the latest version. (If you're daring, you can even `git push` to the locker directly, but make sure to keep the Github version in sync with the website version.)

We use [htm](https://github.com/developit/htm), [Preact with preact/compat](https://preactjs.com/), and [goober](https://goober.js.org/). You can pretend that htm+Preact is the same as [JSX+React](https://reactjs.org/docs/introducing-jsx.html), with [some minor differences](https://github.com/developit/htm#syntax-like-jsx-but-also-lit). Oh, and the goober part is basically just a way to put CSS in JS, except there are nice add-ons like nesting.

The file `package.js` contains the three libraries above bundled together in a single export. To add more libraries to the export, you can [bundle them yourself](https://npm.reversehttp.com/) and then replace the file.

## Updating new hunt

- Link the hunt website to year/, add it to .gitignore (because we're currently not storing that in the repo, I guess), and update huntsbyyear.
- Add pictures of the coins to coingallery.
- Add some pictures to photos?
- Update index and nexthunt to reflect winning team.

## Todo

- add page for puzzle club
- rename titles, update meta info to make consistent
- move pictures to images/, relink
- actually redesign the site and use MODERN TOOLING
- figure out what the canonical url should be and write redirects
- update resources
- update tools
- update articles
- update nexthunt?
- update index
- update coingallery
- update huntsbyyear?
- update photos (maybe also make it videos, add links to wrapups, kickoffs)
- update lodging?
- update puzzleindex
- write doc for what to update when there's a new hunt
