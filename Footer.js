import { React, html, css } from "./package.js";

const Footer = () => {
  const footer = css`
    color: #fffc;
    display: flex;
    justify-content: space-between;
    margin: 1rem auto 5rem;
    max-width: 40rem;
    padding: 0 1rem;

    p {
      margin: 0;
    }

    @media (max-width: 500px) {
      flex-direction: column;
    }
  `;

  return html`
    <footer class=${footer}>
      <p>
        Massachusetts Institute of Technology<br/>
        Mystery Hunt / Puzzle Club
      </p>
      <p>
        <a href="contact.html">Contact</a> · <a href="https://accessibility.mit.edu/">Accessibility</a>
      </p>
    </footer>
  `;
};

export { Footer };
