import { html, render, React, css } from "./package.js";

const ToggleStatic = () => {
  const toggleCss = css`
    height: 2.3rem;
    position: relative;
    top: -0.5rem;
    width: 4.5rem;

    @media (max-width: 600px) {
      top: 0;
    }
  `;

  const img = css`
    height: 2.25rem;
    position: absolute;
    width: 2.25rem;
  `;

  const img1 = css`
    left: 0.4rem;
  `;

  const img2 = css`
    right: 0.2rem;
  `;

  return html`<div class=${toggleCss}>
    <img class="${img} ${img1}" src="images/coin.png" />
    <img class="${img} ${img2}" src="images/tools.png" />
  </div>`;
};

/**
 * hunt: true if Hunt side should be shown, false if Club side
 * toggle: function for toggling hunt. if falsy, show non-interactive version
 */
const Toggle = ({ hunt, toggle }) => {
  if (!toggle) return ToggleStatic();

  const toggleCss = css`
    background: #39170d;
    border-radius: 1.15rem;
    box-shadow: inset 0 0.1rem 0.2rem 0.4rem #1f0c0a47;
    height: 2.3rem;
    position: relative;
    top: -0.5rem;
    transition: 0.2s box-shadow;
    width: 4.5rem;

    div:hover & {
      box-shadow: inset 0 0.1rem 0.2rem 0.4rem #1f0c0a47, 0 0 0.5rem #b5815c;
    }

    @media (max-width: 600px) {
      top: 0;
    }
  `;

  const button = css`
    background: none;
    border: none;
    display: block;
    font-size: 0;
    position: absolute;

    &[aria-pressed]::after {
      border-radius: 50%;
      background: #87782c;
      box-shadow: 0 0 0.4rem 0.5rem #87782c;
      content: "";
      height: 1rem;
      left: 0.65rem;
      position: absolute;
      top: 0.65rem;
      transition: background 0.3s, box-shadow 0.3s, left 0.3s;
      width: 1rem;
    }

    &[aria-pressed="true"]::after {
      background: #798a91;
      box-shadow: 0 0 0.4rem 0.5rem #798a91;
      left: 2.8rem;
    }
  `;

  const img = css`
    height: 1.5rem;
    padding: 0.4rem;
    position: absolute;
    transition: 0.3s opacity;
    width: 1.5rem;
    z-index: 1;
  `;

  const img1 = css`
    opacity: 1;

    button[aria-pressed="true"] ~ & {
      opacity: 0.3;
    }
  `;

  const img2 = css`
    opacity: 0.3;
    right: 0.15rem;

    button[aria-pressed="true"] ~ & {
      opacity: 1;
    }
  `;

  return html`<div class=${toggleCss}>
    <button
      class=${button}
      type="button"
      aria-pressed=${!hunt}
      onClick=${toggle}
    >
      Toggle content between Mystery Hunt and Puzzle Club
    </button>
    <img class="${img} ${img1}" src="images/coin.png" />
    <img class="${img} ${img2}" src="images/tools.png" />
  </div>`;
};

export { Toggle };
