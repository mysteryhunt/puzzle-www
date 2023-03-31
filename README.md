# MIT Mystery Hunt / Puzzle Club Website

Code for the MIT Mystery Hunt / Puzzle Club website. On the Puzzle Club Athena locker at `/mit/puzzle/www`.

## Development

To edit a page, **do not edit the HTML directly**. Instead, edit the markdown file under the `src` directory.

The `src` directory should never have any non-markdown files. It should all go in the top-level directory.

- To install dependencies, run `pip install markdown`.
- To build the site, run `python3 build.py`.
- To test the site on your computer, run `python3 build.py watch`. It will open a server at [http://localhost:8000/](http://localhost:8000/), which you can open in your browser to view the site. The script will update the files of the website every second.
- To update the website, just put the whole thing on the server. It works. Note that there's a git repo on the locker, so from the locker, you can just `git pull` the latest version. (If you're daring, you can even `git push` to the locker directly, but make sure to keep the Github version in sync with the website version.)

We use [htm](https://github.com/developit/htm), [Preact with preact/compat](https://preactjs.com/), and [goober](https://goober.js.org/). You can pretend that htm+Preact is the same as [JSX+React](https://reactjs.org/docs/introducing-jsx.html), with [some minor differences](https://github.com/developit/htm#syntax-like-jsx-but-also-lit). The goober part is a way to put CSS in JS, plus nice add-ons like nesting. The file `package.js` contains the three libraries above bundled together in a single export. To add more libraries to the export, you can [bundle them yourself](https://npm.reversehttp.com/) and then replace the file.

## Updating new hunt

- Link the hunt website to year/, add it to .gitignore (because we're currently not storing that in the repo, I guess), and update huntsbyyear.
- Add pictures of the coins to coingallery.
- Add some pictures to photos?
- Update index and nexthunt to reflect winning team and the next hunt date.

## Todo

- rename titles, update meta info to make consistent
- figure out what the canonical url should be and write redirects
- update resources
- update tools
- update articles
- update nexthunt?
- update coingallery
- update huntsbyyear?
- update photos (maybe also make it videos, add links to wrapups, kickoffs)
