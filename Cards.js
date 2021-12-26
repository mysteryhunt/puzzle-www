import { html, render, React, css } from "./package.js";

/**
 * hunt: true if Hunt side should be shown, false if Club side
 * interactive: true if should react on hover of title div, false otherwise
 */
const Cards = ({ hunt, interactive }) => {
  const cards = css`
    background: #0000;
    position: absolute;
    width: 4rem;

    img {
      height: 2.5rem;
      width: 2.5rem;
    }

    @media (max-width: 600px) {
      top: 0.5rem;
    }
  `;

  const card = (isHunt) => css`
    background: transparent;
    border: none;
    cursor: pointer;
    height: 2rem;
    padding: 0;
    position: absolute;
    transform: translateY(-0.5rem) rotate(-10deg);
    transition: transform 0.2s;

    ${isHunt ? "left" : "right"}: 0;
    z-index: ${isHunt ^ hunt ? 0 : 1};
  `;

  const interactCss = (isHunt) => css`
    div:hover div & {
      transform: ${isHunt ^ hunt ? "translateY(-0.5rem)" : "rotate(0)"};
      z-index: ${isHunt ^ hunt ? 1 : 0};
    }
  `;

  return html`
    <div class=${cards}>
      <button class="${card(true)} ${interactive && interactCss(true)}">
        <img src="images/coin.png" />
      </button>
      <button class="${card(false)} ${interactive && interactCss(false)}">
        <img src="images/tools.png" />
      </button>
    </div>
  `;
};

export { Cards };
