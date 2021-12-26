import { html, render, React, css } from "./package.js";

import { Cards } from "./Cards.js";

const Title = () => {
  const [hunt, setHunt] = React.useState(true);

  const title = css`
    cursor: pointer;
    display: flex;
    height: 2rem;
    justify-content: center;
    position: relative;

    @media (max-width: 600px) {
      height: 3.3rem;
    }
  `;

  const headerH1 = css`
    display: block;
    font: 1.3rem "Syncopate", sans-serif;
    position: absolute;
    text-transform: uppercase;
    text-shadow: 0 1px 1px black;
    transition: color 0.2s;
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
    color: ${hunt ? "#e1ba9c" : "#ab8061"};
    left: 0;
    text-align: right;
    top: 0;
  `;

  const header2 = css`
    color: ${!hunt ? "#e1ba9c" : "#ab8061"};
    top: 0;
    right: 0;
  `;

  const button = css`
    background: none;
    border: none;
    box-sizing: border-box;
    color: inherit;
    display: block;
    font-size: 0;
    line-height: inherit;
    padding: 0.4rem 0 0.4rem 4rem;
    position: absolute;
    text-align: left;

    &[aria-pressed]::after {
      border-radius: 50%;
      background: #87782c;
      box-shadow: 0 0 0.5rem 0.5rem #87782c;
      content: "";
      height: 1rem;
      left: 0.65rem;
      position: absolute;
      top: 0.65rem;
      transition: all 0.25s ease;
      width: 1rem;
    }

    &[aria-pressed="true"]::after {
      background: #798a91;
      box-shadow: 0 0 0.5rem 0.5rem #798a91;
      left: 2.8rem;
    }
  `;

  const toggle = (e) => {
    e.stopPropagation();
    setHunt(!hunt);
  };

  const cards = css`
    border-radius: 1.15rem;
    position: relative;
    height: 2.3rem;
    width: 4.5rem;
    top: -0.5rem;
    background: #39170d;
    box-shadow: inset 0 1px 2px 4px #1f0c0a47;

    img {
      height: 1.5rem;
      padding: 0.4rem;
      position: absolute;
      width: 1.5rem;
      z-index: 1;
    }
  `;

  return html`
    <div class=${title} onClick=${toggle}>
      <h1 class="${headerH1} ${header1}">Mystery <br />Hunt</h1>
      <div class=${cards}>
        <button
          class=${button}
          type="button"
          aria-pressed=${!hunt}
          onClick=${toggle}
        >
          Toggle content between Mystery Hunt and Puzzle Club
        </button>
        <img src="images/coin.png" />
        <img style="right:0.15rem" src="images/tools.png" />
      </div>
      <!-- <${Cards} hunt=${hunt} interactive="true" /> -->
      <h1 class="${headerH1} ${header2}">Puzzle <br />Club</h1>
    </div>
  `;
};

export { Title };
