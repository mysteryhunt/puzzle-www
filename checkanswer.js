// Do this first so that layout shift isn't too bad:
const container = document.createElement("div");
container.style = `
  font-size: 16px;
  font-size: clamp(16px, 2.4vw, 21px);
  height: 2.5em;
`;
document.body.prepend(container);

import { React, html, css, render } from "./package.js";

/**
 * Remove non-alphanumeric characters.
 */
const normalizeAnswer = (answer) => {
  return answer.toUpperCase().replaceAll(/[^A-Z0-9]/g, "");
};

/**
 * Returns the year of the hunt we're in.
 */
const getYear = () => {
  return Number(RegExp(`^.*/([0-9]{4})/.*$`).exec(document.URL)?.[1] ?? 0);
};

/**
 * Fetches the answers as a list of {url, answer, prompt, intermediate}.
 */
const getData = async () => {
  const res = await fetch("/answers.tsv");
  const data = await res.text();
  const [header, ...body] = data.split("\n");
  const headers = header.split("\t");
  return body.map((row) => {
    const res = {};
    row.split("\t").forEach((item, i) => {
      res[headers[i]] = item;
    });
    return res;
  });
};

/**
 * Gets the base URL; removes trailing index.html and .html, removes everything
 * before the year, and then removes trailing slash.
 */
const getBase = (url) => {
  const root =
    RegExp(`^(.*/)index.html`).exec(url)?.[1] ??
    RegExp(`^(.*).html`).exec(url)?.[1] ??
    url;
  const base = RegExp(`^.*/([0-9]{4}/.*)$`).exec(root)?.[1] ?? root;
  return base.endsWith("/") ? base.slice(0, -1) : base;
};

/**
 * Get all rows in the data corresponding to a given URL. Group by same prompt.
 */
const getAnswers = (data, url) => {
  const base = getBase(url);
  const rows = data.filter((row) => getBase(row.url) === base);
  const prompts = [];
  for (const row of rows) {
    const { prompt } = row;
    const group = prompts.find((group) => group.prompt === prompt);
    if (group) {
      group.rows.push(row);
    } else {
      prompts.push({ prompt, rows: [row] });
    }
  }
  return prompts;
};

/**
 * A single textbox and submit button in the rows of possible responses.
 */
const ResponseRow = ({ prompt, rows, setFeedback }) => {
  const [response, setResponse] = React.useState("");

  const form = css`
    align-items: baseline;
    display: flex;
    justify-content: right;
    margin-bottom: 0.5em;

    @media (max-width: 600px) {
      align-items: flex-start;
      flex-direction: column;
    }
  `;

  const input = css`
    background: #fafafa;
    border: 1px solid #aaa;
    border-radius: 2px;
    color: #121212;
    font-family: inherit;
    font-size: 100%;
    line-height: 1.2;
    margin: 0 0.5em;
    padding: 0.25em 0.5em;

    @media (max-width: 600px) {
      margin: 0 0 0.25em;
    }
  `;

  const onSubmit = (e) => {
    e.preventDefault();
    let set = false;
    for (const row of rows) {
      const correct = normalizeAnswer(row.answer) === normalizeAnswer(response);
      if (correct) {
        setFeedback(
          row.intermediate
            ? "Correct! See the solution page for the answer."
            : `Solved! The answer was ${row.answer}.`
        );
        set = true;
        break;
      }
    }
    if (!set) {
      setFeedback("Incorrect.");
    }
  };

  const onChange = (e) => setResponse(e.target.value);

  return html`
    <form class=${form} onSubmit=${onSubmit}>
      <label htmlFor=${prompt + " prompt"}>
        ${prompt || "Enter your guess"}:
      </label>
      <input
        class=${input}
        id=${prompt + " prompt"}
        onChange=${onChange}
        required
        type="text"
        value=${response}
      />
      <button type="submit">Submit</button>
    </form>
  `;
};

/**
 * Check answer button, rendered at top of page.
 */
const CheckButton = ({ prompts }) => {
  const [open, setOpen] = React.useState(false);
  const [feedback, setFeedback] = React.useState("Call in an answer.");

  const wrapper = css`
    font-family: "PT Sans", sans-serif;
    font-size: 16px;
    font-size: clamp(16px, 2.4vw, 21px);
    height: 2.5em;

    button {
      background: #555;
      border: none;
      border-radius: 2px;
      color: #fff;
      cursor: pointer;
      display: inline-block;
      font-size: 1em;
      font-family: "PT Sans", sans-serif;
      font-weight: bold;
      line-height: 1.2;
      padding: 0.25em 1em;
      text-align: center;
      text-decoration: none;
      text-transform: none;
    }

    p {
      margin: 0 0 1em;
    }

    a {
      color: inherit !important;
    }
  `;

  const btnTop = [2015, 2016].includes(getYear())
    ? "50px"
    : [2012].includes(getYear())
    ? "-2.5em"
    : "0px";

  const button = css`
    box-sizing: border-box;
    height: 2.5em;
    left: 0;
    position: absolute;
    top: ${btnTop};
    width: 100%;
    z-index: 9999;
  `;

  const dropdownWrapper = css`
    background: #edeff0;
    color: #121212;
    left: 0;
    position: absolute;
    right: 0;
    top: calc(2.5em + ${btnTop});
    z-index: 9999;
  `;

  const dropdown = css`
    margin: 0 auto;
    max-width: 40em;
    padding: 1em;
    z-index: 9999;
  `;

  const responses = css`
    margin: 0 auto;
    width: fit-content;

    @media (max-width: 600px) {
      width: auto;
    }
  `;

  const onClick = () => setOpen(!open);

  const body =
    prompts.length > 0
      ? prompts.map(
          (group) =>
            html`<${ResponseRow} setFeedback=${setFeedback} ...${group} />`
        )
      : html`<p>
          No answers found on this page. Please report this to${" "}
          <a href="mailto:puzzle@mit.edu">puzzle@mit.edu</a>.
        </p>`;

  return html`
    <style>
      @import url("https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap");

      ${[2015, 2016].includes(getYear()) &&
      ".navbar-fixed-top { z-index: 10000 }"}
      ${[2012].includes(getYear()) &&
      "body { top: 2.5em } #check-answer, #shortcuts { z-index: 10000 !important }"}
      ${[2006].includes(getYear()) && 'img[alt="Check Answer"] { display: none }'}
    </style>
    <div class=${wrapper}>
      <button class=${button} onClick=${onClick}>
        Check your answer spoiler-free
      </button>
      ${open &&
      html`
        <div class=${dropdownWrapper}>
          <div class=${dropdown}>
            <p>${feedback}</p>
            <div class=${responses}>${body}</div>
          </div>
        </div>
      `}
    </div>
  `;
};

const data = await getData();
const prompts = getAnswers(data, document.URL);
render(html`<${CheckButton} prompts=${prompts} />`, container);
