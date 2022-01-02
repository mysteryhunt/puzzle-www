import { html, render } from "./package.js";

import { Header } from "./Header.js";
import { Footer } from "./Footer.js";

render(html`<${Header} />`, document.getElementById("header"));
render(html`<${Footer} />`, document.getElementById("footer"));
