const staticIndicator = `<div class="card">
    <div class="card-body">
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