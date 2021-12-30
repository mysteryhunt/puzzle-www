import { html, render, React, css } from "./package.js";

import { Header } from "./Header.js";

const Hunt = () => {

};

const Club = () => {

};

const FrontPage = () => {
  const [hunt, setHunt] = React.useState(true);

  return html`
    <${Header} hunt=${hunt} setHunt=${setHunt} />
    <div id="wrapper">
      <main id="main">
        ${hunt ? "Mystery Hunt!" : "Puzzle Club!"}
      </main>
    </div>
    <footer></footer>
  `;
};

render(html`<${FrontPage} />`, document.getElementById("app"));
