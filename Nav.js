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
        z-index: 1;

        a,
        li:hover &,
        li.open & {
            display: block;
        }

        @media (max-width: 420px) {
            background: #1e0808;
            display: block;
            left: 2rem;
            position: relative;
        }
    `;

    const parentCss = css`
        @media (max-width: 420px) {
            &:hover:hover {
                box-shadow: none;
                cursor: initial;
                text-decoration: none;
            }
        }
    `;

    // keyboard accessibility:
    const click = () => setOpen((open) => !open);

    return html`
        <li class=${open && "open"}>
            <a
                class=${parentCss}
                href="#"
                aria-haspopup="true"
                aria-expanded=${open}
                onclick=${click}
                >${parent}</a
            >
            <ul class=${submenu}>
                ${children}
            </ul>
        </li>
    `;
};

const Nav = () => {
    const [open, setOpen] = React.useState(false);

    const nav = css`
        background: repeat center / auto auto
            url("/images/headerbackground.jpg");
        box-shadow: 0 0 0.3em 0.3em #1115;
        position: relative;
        top: 1em;
        width: 100%;

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

        a[aria-haspopup]::after {
            content: " ▼";
            display: inline;
        }

        @media (max-width: 420px) {
            background: #1e0808;
            border-bottom: 2px solid #ab8061;
            display: none;
            flex-direction: column;
        }
    `;

    const menuBtn = css`
        display: none !important;
        text-align: center;
        width: calc(100% - 2em);

        @media (max-width: 420px) {
            display: inline-block !important;

            &[aria-expanded="true"] ~ ul {
                display: flex;
            }
        }
    `;

    const click = () => setOpen((open) => !open);

    return html`
    <nav class=${nav}>
      <a
        class=${menuBtn}
        href="#"
        aria-haspopup="true"
        aria-expanded=${open}
        onclick=${click}
        >Menu</a
      >
      <ul class=${menu}>
        <${Submenu} parent="Mystery Hunt">
          <li><a href="/nexthunt.html">Next Hunt</a></li>
          <li><a href="/history.html">Hunt History</a></li>
          <li><a href="/huntsbyyear.html">Hunts by Year</a></li>
          <li><a href="/coingallery.html">Coin Gallery</a></li>
        </${Submenu}>
        <${Submenu} parent="Puzzle Club">
          <li><a href="/aquarium/">Aquarium Hunt</a></li>
          <li><a href="/brassrat/">Brass Rat Hunt</a></li>
          <li><a href="/logicopen/">Logic Puzzle Open</a></li>
          <li><a href="/sudokuopen/">Sudoku Open</a></li>
        </${Submenu}>
        <${Submenu} parent="Resources">
          <li><a href="/resources.html">For Beginners</a></li>
          <li><a href="/tools.html">Tools</a></li>
          <li><a href="/articles.html">Articles About Hunt</a></li>
          <li><a href="/datapolicy.html">Data Use Policy</a></li>
        </${Submenu}>
        <li><a href="/contact.html">Contact</a></li>
      </ul>
    </nav>
  `;
};

export { Nav };
