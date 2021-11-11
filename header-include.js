import {
  html,
  render,
  preactCompat as React,
} from "https://npm.reversehttp.com/preact,preact/compat,htm/preact";

const Header = () => html`<div id="homeicon">
  <a href="."><img src="images/home.png" /></a>
  </div>
  <a href="."><span id="coinicon"></span></a>
  <div id="textmenu">
    <ul>
      <li>
        <a href="#" onclick="return false;">About the hunt<span class="triangle">▼</span></a>
        <ul>
          <li><a href="nexthunt.html">Next Hunt</a></li>
          <li><a href="history.html">Hunt history</a></li>
          <li><a href="coingallery.html">Coin gallery</a></li>
          <li><a href="photos.html">Photos</a></li>
        </ul>
      </li>
      <li>
        <a href="#" onclick="return false;">Hunt Archives<span class="triangle">▼</span></a>
        <ul>
          <li><a href="huntsbyyear.html">Hunts by year</a></li>
          <li>
            <a href="puzzleindex.html">Puzzle index<br />by keyword</a>
          </li>
        </ul>
      </li>
      <li>
        <a href="#" onclick="return false;">Hunt Resources<span class="triangle">▼</span></a>
        <ul>
          <li>
            <a href="resources.html">Resources<br />for beginners</a>
          </li>
          <li>
            <a href="tools.html">Puzzle tools<br />and how-to's</a>
          </li>
          <li>
            <a href="articles.html">Articles<br />about hunt</a>
          </li>
          <li><a href="contact.html">Contact us</a></li>
        </ul>
      </li>
    </ul>
  </div>`;

render(html`<${Header} />`, document.getElementById("topmenu"));
