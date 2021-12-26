import { html, render, React, css } from "./package.js";

const Nav = () => {
  const nav = css`
    background: repeat-x center / auto 100% url("images/headerbackground.jpg");
    box-shadow: 0 0 0.3em 0.3em #1115;
    position: relative;
    top: 1em;
    width: 100%;
  `;

  const list = css`
    display: flex;
    justify-content: center;
    list-style: none;
    padding: 0;
    width: 100%;

    li {
      display: inline-block;
      padding: 0.5em 1em;
    }
  `;

  return html`
    <nav class=${nav}>
      <ul class=${list}>
        <li>About</li>
        <li>Archive</li>
        <li>Resources</li>
        <li>Contact</li>
      </ul>
    </nav>
  `;
};

export { Nav };
