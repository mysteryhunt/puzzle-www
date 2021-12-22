import {
  html,
  render,
  preactCompat as React,
  css,
} from "https://npm.reversehttp.com/preact,preact/compat,htm/preact,goober";

const card1 = css`
  top: 0;
  left: 0;
`;

const Cards = () => html`
  <div id="cards" class="hunt">
    <button id="hunt-btn" class=${card1}>
      <img src="images/coin.png" />
    </button>
    <button id="club-btn">
      <img src="images/tools.png" />
    </button>
  </div>
`;

const Nav = () => html`
  <nav>
    <ul>
      <li>About</li>
      <li>Archive</li>
      <li>Resources</li>
      <li>Contact</li>
    </ul>
  </nav>
`;

const title = css`
  display: flex;
  height: 2rem;
  justify-content: center;
  position: relative;

  @media (max-width: 600px) {
    height: 3.3rem;
  }
`;

const headerH1 = css`
  color: #e1ba9c;
  display: block;
  font: 1.3rem "Syncopate", sans-serif;
  position: absolute;
  text-transform: uppercase;
  text-shadow: 0 1px 1px black;
  width: calc(50vw - 3rem);

  br {
    display: none;
  }

  @media (max-width: 600px) {
    width: calc(50vw - 3rem);

    br {
      display: initial;
    }
  }
`;

const header1 = css`
  left: 0;
  text-align: right;
  top: 0;
`;

const header2 = css`
  top: 0;
  right: 0;
`;

const Title = () => html`
  <div class=${title}>
    <h1 class="${headerH1} ${header1}">Mystery <br />Hunt</h1>
    <${Cards} />
    <h1 class="${headerH1} ${header2}">Puzzle <br />Club</h1>
  </div>
`;

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

const Header = () => html`
  <header class=${header}>
    <h2 class=${headerH2}>The MIT</h2>
    <${Title} />
    <${Nav} />
  </header>
`;

render(html`<${Header} />`, document.getElementById("header"));
