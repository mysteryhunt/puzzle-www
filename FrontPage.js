import { React, html, css, render } from "./package.js";

import { Header } from "./Header.js";
import { Footer } from "./Footer.js";

const timeLeft = () => {
  const now = new Date();
  const huntStart = new Date("14 Jan 2022, 12:00:00 EST");
  const huntEnd = new Date("17 Jan 2022, 12:00:00 EST");
  const started = huntStart < now;
  const ended = huntEnd < now;
  const dSeconds = (started ? huntEnd - now : huntStart - now) / 1000;
  const seconds = Math.floor(dSeconds) % 60;
  const minutes = Math.floor(dSeconds / 60) % 60;
  const hours = Math.floor(dSeconds / (60 * 60)) % 24;
  const days = Math.floor(dSeconds / (60 * 60 * 24));
  return { started, ended, days, hours, minutes, seconds };
};

const Countdown = () => {
  const [count, setCount] = React.useState(timeLeft());

  // change the count every 1000 ms
  React.useEffect(() => {
    const timeout = setTimeout(() => setCount(timeLeft()), 1000);
    return () => clearTimeout(timeout);
  });

  const blocks = css`
    align-items: center;
    display: flex;
    justify-content: center;
  `;

  const block = css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: -1rem 0.5rem 1.2rem;
    width: 4rem;
  `;

  const numberCss = css`
    font-size: 3rem;
    margin-bottom: -0.75rem;
  `;

  const message =
    "Mystery Hunt 2022 " +
    (count.ended ? "has ended." : count.started ? "ends in" : "begins in");

  if (count.ended) return html`<p>${message}</p>`;

  return html`
    <p>${message}</p>
    <div class=${blocks}>
      ${["days", "hours", "minutes", "seconds"].map((word) => {
        const number = count[word];
        const label = number === 1 ? word.slice(0, -1) : word;
        return html`
          <div class=${block}>
            <div class=${numberCss}>${number}</div>
            <div>${label}</div>
          </div>
        `;
      })}
    </div>
  `;
};

const Hunt = () => {
  const img = css`
    height: auto;
    width: 8rem;
  `;

  const action = css`
    align-items: center;
    display: flex;
    justify-content: space-around;
    width: 100%;

    .button {
      width: 15rem;
    }

    @media (max-width: 34rem) {
      flex-direction: column;

      .button {
        margin-bottom: 1rem;
      }
    }
  `;

  return html`
    <img class=${img} src="images/frontcoin.png" alt="A penny." />
    <${Countdown} />
    <!-- prettier-ignore -->
    <div class=${action}>
      <a class="button" href="https://www.mitmh2022.com/">Register now</a>
      <a class="button" href="https://giving.mit.edu/form?fundId=2720842"
        >Donate to the Mystery Hunt</a
      >
    </div>
  `;
};

const Club = () => {
  const caption = css`
    color: #fffa;
    margin: 0;
  `;

  return html`
    <img src="images/club.jpg" alt="A person pieces together paper cutouts." />
    <!-- prettier-ignore -->
    <p class=${caption}>
      Photo: Dominick Reuter, <a
        href="https://creativecommons.org/licenses/by-nc-nd/3.0/">
        CC BY-NC-ND 3.0</a
      >.
    </p>
  `;
};

const FrontPage = () => {
  const [hunt, setHunt] = React.useState(true);

  const lead = css`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 2rem auto 2rem;
    max-width: 35rem;
  `;

  return html`
    <style>
      #${hunt ? "hunt" : "club"} {
        display: block;
      }

      #${!hunt ? "hunt" : "club"} {
        display: none;
      }

      main {
        padding-top: 0.5rem;
      }
    </style>
    <${Header} hunt=${hunt} setHunt=${setHunt} />
    <div class=${lead}>${hunt ? html`<${Hunt} />` : html`<${Club} />`}</div>
  `;
};

render(html`<${FrontPage} />`, document.getElementById("header"));
render(html`<${Footer} />`, document.getElementById("footer"));
