const staticNav_Bar = `<nav class="navbar navbar-expand-lg navbar-light bg-light"> 
<div class="container-fluid">
    <div id="navbarSupportedContent">  
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
        <a class="nav-link " href="index.html">
            <span>Home</span>
        </a>
        </li><!-- End Form View Nav -->
        
        <li class="nav-item">
        <a class="nav-link collapsed" href="build-routes.html">
            <span>Build Routes</span>
        </a>
        </li><!-- End Build Routes Page Nav -->

        <li class="nav-item">
        <a class="nav-link collapsed" href="rpm_lite.html">
            <span>RPM Lite</span>
        </a>
        </li><!-- End Build Routes Page Nav -->       

        <li class="nav-item">
        <a class="nav-link collapsed" href="help.html">
            <span>Wizard</span>
        </a>
        </li><!-- End Help Page Nav -->       

        <li class="nav-item">
        <a class="nav-link collapsed" href="bulk.html">
            <span>About</span>
        </a>
        </li><!-- End About Page Nav -->
    </ul>
    </div>
</div>
</nav>`

class Nav_Bar extends HTMLElement {

  /*async #getHTML (path) {
    try {
      let request = await fetch(path);
      this.innerHTML = await request.text();
    } catch {
      this.innerHTML = staticNav_Bar;
    }
  }*/

  constructor () {
    super();
    /*let path = '/components/nav_bar.html';
    this.#getHTML(path);*/
  }
  
  connectedCallback() {
    this.innerHTML = staticNav_Bar;
  }
}

customElements.define('nav_bar-component', Nav_Bar);