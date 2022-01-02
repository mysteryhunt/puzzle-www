import { React, html, css } from "./package.js";

import { Toggle } from "./Toggle.js";

/**
 * hunt: true if Hunt side should be shown, false if Club side
 * setHunt: function for setting, if false show non-interactive
 */
const Title = ({ hunt, setHunt }) => {
  const title = css`
    ${setHunt && "cursor: pointer;"}
    display: flex;
    height: 2rem;
    justify-content: center;
    position: relative;

    @media (max-width: 600px) {
      height: 3.3rem;
    }

    @media (max-width: 400px) {
      height: 5.5rem;
      top: 1.5rem;
    }
  `;

  const headerH1 = css`
    border: none;
    display: block;
    font: 1.3rem "Syncopate", sans-serif;
    margin: 0;
    padding: 0;
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

    @media (max-width: 400px) {
      width: calc(100vw - 2rem);

      br {
        display: none;
      }
    }
  `;

  const header1 = css`
    color: ${!setHunt || hunt ? "#e1ba9c" : "#ab8061"};
    left: 0;
    text-align: right;
    top: 0;

    @media (max-width: 400px) {
      left: initial;
      text-align: center;
      top: -1.2em;
    }
  `;

  const header2 = css`
    color: ${!setHunt || !hunt ? "#e1ba9c" : "#ab8061"};
    text-align: left;
    top: 0;
    right: 0;

    @media (max-width: 400px) {
      top: 2em;
      text-align: center;
      right: initial;
    }
  `;

  const toggle = (e) => {
    e.stopPropagation();
    setHunt(!hunt);
  };

  return html`
    <div class=${title} onclick=${toggle}>
      <h1 class="${headerH1} ${header1}">Mystery <br />Hunt</h1>
      <${Toggle} hunt=${hunt} toggle=${setHunt && toggle} />
      <h1 class="${headerH1} ${header2}">Puzzle <br />Club</h1>
    </div>
  `;
};

export { Title };
