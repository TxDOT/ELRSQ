const staticIndicator = `<div class="card">
    <div class="card-body d-flex align-items-center justify-content-center">
        <div class="trafficlight">
            <span id="readyIndicator" class="green lamp"></span>
    </div></div></div>`


class Indicator extends HTMLElement {

  constructor () {
    super();
  }
  
  connectedCallback() {
    this.innerHTML = staticIndicator;
  }
}

customElements.define('indicator-component', Indicator);