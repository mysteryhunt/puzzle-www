import { React, html, css } from "./package.js";

import { Nav } from "./Nav.js";
import { Title } from "./Title.js";

const Header = ({ hunt, setHunt }) => {
  const header = css`
    background: radial-gradient(circle, transparent, #1e0808),
      url("/images/woodplank.jpg");
    width: 100%;
  `;

  const headerH2 = css`
    border: none;
    color: #e1ba9c;
    font-family: inherit;
    font-size: 0.8rem;
    letter-spacing: 0.2em;
    margin: 0;
    padding: 1rem 0;
    text-align: center;
    text-transform: uppercase;

    @media (max-width: 600px) {
      padding-bottom: 0.5rem;
    }
  `;

  if (setHunt) {
    return html`
      <header class=${header}>
        <h2 class=${headerH2}>MIT</h2>
        <${Title} hunt=${hunt} setHunt=${setHunt} />
        <${Nav} />
      </header>
    `;
  }

  return html`
    <header class=${header}>
      <a href="/index.html">
        <h2 class=${headerH2}>MIT</h2>
        <${Title} hunt=${hunt} setHunt=${setHunt} />
        <${Nav} />
      </a>
    </header>
  `;
};

export { Header };
