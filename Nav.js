import { React, html, css } from "./package.js";

/**
 * parent: name of submenu e.g. "About"
 * children: lis under the parent
 */
const Submenu = ({ parent, children }) => {
  const [open, setOpen] = React.useState(false);

  const submenu = css`
    background: linear-gradient(to bottom, #1f0b0866, #1f0b0866),
      repeat center / auto auto url("/images/headerbackground.jpg");
    box-shadow: 0 0.3em 0.3em 0.3em #1115;
    display: none;
    left: 0;
    padding: 0;
    position: absolute;
    top: 100%;
    width: max-content;

    a,
    li:hover &,
    li.open & {
      display: block;
    }
  `;

  const mouseover = () => setOpen(true);

  const mouseout = () => setTimeout(() => setOpen(false), 1000);

  // keyboard accessibility:
  const click = () => setOpen((open) => !open);

  return html`
    <li class=${open && "open"} onmouseover=${mouseover} onmouseout=${mouseout}>
      <a href="#" aria-haspopup="true" aria-expanded=${open} onclick=${click}
        >${parent}</a
      >
      <ul class=${submenu}>
        ${children}
      </ul>
    </li>
  `;
};

const Nav = () => {
  const nav = css`
    background: repeat center / auto auto url("/images/headerbackground.jpg");
    box-shadow: 0 0 0.3em 0.3em #1115;
    position: relative;
    top: 1em;
    width: 100%;
  `;

  const menu = css`
    display: flex;
    justify-content: center;
    padding: 0;
    width: 100%;

    li {
      list-style: none;
      position: relative;
    }

    a {
      border-bottom: none;
      color: inherit;
      display: inline-block;
      padding: 0.5em 1em;
      text-decoration: none;
    }

    a:hover {
      background: #1f0b0888;
      border-bottom: none;
      box-shadow: inset 0 0.1rem 0.2rem 0.4rem #1f0c0a88;
      text-decoration: underline;
    }

    a[aria-haspopup]::after {
      content: " ▼";
      display: inline;
    }
  `;

  return html`
    <nav class=${nav}>
      <ul class=${menu}>
        <${Submenu} parent="About">
          <li><a href="/nexthunt.html">Next Hunt</a></li>
          <li><a href="/puzzleclub.html">Puzzle Club</a></li>
          <li><a href="/history.html">Hunt History</a></li>
        </${Submenu}>
        <${Submenu} parent="Archives">
          <li><a href="/huntsbyyear.html">Hunts by Year</a></li>
          <li><a href="/coingallery.html">Coin Gallery</a></li>
          <li><a href="/photos.html">Hunt Photos</a></li>
          <!-- <li><a href="#">Aquarium Hunt</a></li> -->
        </${Submenu}>
        <${Submenu} parent="Resources">
          <li><a href="/resources.html">For Beginners</a></li>
          <li><a href="/tools.html">Tools</a></li>
          <li><a href="/articles.html">Articles About Hunt</a></li>
        </${Submenu}>
        <li><a href="/contact.html">Contact</a></li>
      </ul>
    </nav>
  `;
};

export { Nav };
