import { html, render, React, css } from "./package.js";

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
  const lead = css`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 2rem;
  `;

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
    <div class=${lead}>
      <img class=${img} src="images/frontcoin.png" />
      <${Countdown} />
      <div class=${action}>
        <a class="button" href="https://www.mitmh2022.com/">Register now</a>
        <a class="button" href="https://giving.mit.edu/form?fundId=2720842"
          >Donate to the Mystery Hunt</a
        >
      </div>
    </div>
    <p>
      The MIT Mystery Hunt is a puzzlehunt competition that takes place on the
      MIT campus every year during the <a
        href="https://www.wolframalpha.com/input/?i=Friday+before+next+Martin+Luther+King+Day"
        >Martin Luther King, Jr. Day weekend</a
      >. The hunt challenges each participating team to solve a large number of
      puzzles which lead to an object (called a “coin”) hidden somewhere on
      campus. The winning team gets to write the subsequent year’s hunt.
    </p>
    <p>
      Mystery Hunt was launched in 1981 and is widely regarded as one of the
      oldest and most complex puzzlehunts in the world. It attracts more than
      2,000 people every year and has inspired similar competitions at
      universities, companies and cities around the world.
    </p>
    <p>
      This site serves as a record of the Mystery Hunt’s <a href="history.html">history</a> and an <a href="huntsbyyear.html">archive</a> of past hunts. We hope that it
      inspires you to join in on the fun and become a master puzzle solver.
    </p>
    <p>
      If you are just starting as a puzzle solver, welcome! Check out the “<a
        href="resources.html"
        >Resources For Beginners</a
      >” to read about the art of puzzle solving and get started with a few
      hand-selected puzzles, and take a look at “<a href="tools.html"
        >Puzzle tools and how-tos</a
      >” for links to various tools that make the process easier.
    </p>
    <h2>Support the MIT Mystery Hunt</h2>
    <p>
      The Mystery Hunt is an ASA-recognized group (reach the student club at <a
      href="mailto:puzzle-club-exec@mit.edu">puzzle-club-exec@mit.edu</a>)
      which receives some funding from Finboard, the Large Events Fund, and
      other sources at MIT. The group also typically fundraises annually to help
      cover the costs associated with creating, producing, and running an
      activity of this size and scope. With your support, we can put the Mystery
      Hunt in a more stable financial position for the future.
    </p>
    <p>
      As an MIT student activity, we can accept <a
      href="https://giving.mit.edu/form?fundId=2720842">
        donations to our operating fund</a
      > through MIT's donation mechanism. If you would like to donate, you may do
      so at the link above. Any money that you donate will go into the student
      group's account and will help defray the cost of this year's Hunt. Any
      surpluses from this year will roll over to future Hunts. If you or your
      company would like to make a non-monetary donation to the Mystery Hunt
      (server space, food for event puzzles, caffeine pills to keep us awake)
      please email <a href="mailto:puzzle@mit.edu">puzzle@mit.edu</a> and let us
      know how you wish to help.
    </p>
  `;
};

const Club = () => {
  const caption = css`
    color: #fffa;
    margin-top: 0;
  `;

  return html`
    <img src="images/club.jpg" alt="A person pieces together paper cutouts." />
    <p class=${caption}>
      Photo: Dominick Reuter, <a
      href="https://creativecommons.org/licenses/by-nc-nd/3.0/"
        >CC BY-NC-ND 3.0</a
      >.
    </p>
    <p>
      The MIT Mystery Hunt / Puzzle Club is the official student group that works alongside each year’s writing team to oversee and run Mystery Hunt, one of the world’s largest puzzle hunts. Throughout the rest of the year, we put on a bunch of puzzling events for the MIT community such as puzzling magazine solves, crossword sessions, and whatever else our members are interested in, usually alongside lunch or snacks. We try to keep our members in the loop with the puzzling community and give them more friends to puzzle with.
    </p>
    <p>We would love to have you join! Please reach out with any questions. If you’re an MIT affiliate, you can add yourself to our lists to hear more. </p>
    <p>Reach us at <a href="mailto:puzzle-club-exec@mit.edu">puzzle-club-exec@mit.edu</a>!<br/>
    Join our event announcement list: <a href="https://groups.mit.edu/webmoira/list/puzzle-club-announce">puzzle-club-announce@mit.edu</a>.<br/>
    Join our club list: <a href="https://groups.mit.edu/webmoira/list/puzzle-club">puzzle-club@mit.edu</a>.</p>

<h3>Calendar</h3>

<p>
Here is our calendar of events! <a href="https://calendar.google.com/calendar/embed?src=24t8tlk4ep757h06p54lcde54g%40group.calendar.google.com&ctz=America%2FNew_York">Google Calendar link here.</a>
</p>

<iframe src="https://calendar.google.com/calendar/embed?src=24t8tlk4ep757h06p54lcde54g%40group.calendar.google.com&ctz=America%2FNew_York" style="border: 0" width="100%" height="600" frameborder="0" scrolling="no"></iframe>

  `;
};

const FrontPage = () => {
  const [hunt, setHunt] = React.useState(true);

  return html`
    <${Header} hunt=${hunt} setHunt=${setHunt} />
    <main id="main">${hunt ? html`<${Hunt} />` : html`<${Club} />`}</main>
    <${Footer} />
  `;
};

render(html`<${FrontPage} />`, document.getElementById("frontPage"));
