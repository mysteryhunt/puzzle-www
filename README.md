# MIT Mystery Hunt Website

Code for the MIT Mystery Hunt website. On the Puzzle Club Athena locker, /mit/puzzle/www.

## Development

- From the folder, run `python3 -m http.server`. By default it opens a server at [http://localhost:8000/](http://localhost:8000/).
- We use a combination of [React](https://reactjs.org/) and [htm](https://github.com/developit/htm).
- After developing, just put it on the server. It works.

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
