import { html, render, React, css } from "./package.js";

import { Nav } from "./Nav.js";
import { Title } from "./Title.js";

const Header = ({ hunt, setHunt }) => {
  const header = css`
    background: radial-gradient(circle, transparent, #1e0808),
      url("images/woodplank.jpg");
    width: 100%;
  `;

  const headerH2 = css`
    color: #e1ba9c;
    font-family: inherit;
    font-size: 0.8rem;
    letter-spacing: 0.2em;
    padding: 1rem 0;
    text-align: center;
    text-transform: uppercase;

    @media (max-width: 600px) {
      padding-bottom: 0.5rem;
    }
  `;

  return html`
    <header class=${header}>
      <h2 class=${headerH2}>MIT</h2>
      <${Title} hunt=${hunt} setHunt=${setHunt} />
      <${Nav} />
    </header>
  `;
};

export { Header };