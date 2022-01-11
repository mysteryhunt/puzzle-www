import { React, html, css, render } from "../package.js";

/**
 * messages: {
 *   body: string,
 *   id: number,
 *   self: boolean, // from self or other?
 * }
 */
const makeMsg = (body, self) => {
  const id = new Date().valueOf() + Math.random();
  return { body, id, self };
};

const ChatWindow = ({ messages }) => {
  const windowEnd = React.useRef(null);

  React.useEffect(() => {
    windowEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const chatWindow = css`
    height: 20rem;
    overflow-y: auto;
    width: 100%;
  `;

  const message = css`
    border-radius: 1em;
    clear: both;
    display: inline-block;
    margin: 0.5em 1em;
    overflow-wrap: break-word;
    padding: 0.5em 0.7em;
    position: relative;
  `;

  const self = css`
    background: #39a1f9;
    color: #fff;
    float: right;
    text-shadow: 1px 1px 0 #1b96fc;
  `;

  const other = css`
    background: #e5e5ea;
    color: #000;
    float: left;
    text-shadow: 1px 1px 0 #f3f3f4;
  `;

  const windowEndCss = css`
    clear: both;
  `;

  const body = messages.map((msg) => {
    const cls = `${message} ${msg.self ? self : other}`;
    return html`<div class=${cls} id=${msg.id}>${msg.body}</div>`;
  });

  return html`
    <div class=${chatWindow}>
      ${body}
      <div class=${windowEndCss} ref=${windowEnd}></div>
    </div>
  `;
};

const Simulator = () => {
  const [messages, setMessages] = React.useState([]);
  const [message, setMessage] = React.useState("");

  const simulator = css`
    background: #200708;
    font-family: "PT Sans", sans-serif;
    margin: 0 auto;
    max-width: 20rem;
  `;

  const input = css`
    background: #fafafa;
    border: none;
    color: #121212;
    font: inherit;
    line-height: inherit;
    margin: 0 0.5rem;
    padding: 0.25rem 0.5rem;
  `;

  const onSubmit = async (e) => {
    const message_ = message;
    e.preventDefault();
    setMessages((messages) => [...messages, makeMsg(message_, true)]);
    setMessage("");
    await new Promise((r) => setTimeout(r, 1000));
    setMessages((messages) => [
      ...messages,
      makeMsg(window.getReply(message_), false),
    ]);
  };

  const onChange = (e) => setMessage(e.target.value);

  return html`
    <style>
      @import url("https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap");
    </style>
    <div class=${simulator}>
      <${ChatWindow} messages=${messages} />
      <form onSubmit=${onSubmit}>
        <input
          class=${input}
          id="simulatorInput"
          onChange=${onChange}
          required
          type="text"
          value=${message}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  `;
};

render(html`<${Simulator} />`, document.getElementById("simulator"));
