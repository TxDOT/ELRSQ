

class Map_Controls extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = staticMap_Controls;
  }
}
customElements.define('map_controls-component', Map_Controls);

class Demo_Modal extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = staticDemo_Modal;
  }
}
customElements.define('demo_modal-component', Demo_Modal);

class Indicator extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = staticIndicator;
  }
}
customElements.define('indicator-component', Indicator);

class Nav_Bar extends HTMLElement {
  constructor() {
    super();
    // https://dev.to/zippcodder/a-quick-guide-to-custom-html-elements-5f3b
    // attach shadow DOM to element
    // let shadow = this.attachShadow({mode: "closed"});
  }
  connectedCallback() {
    this.innerHTML = staticNav_Bar;
  }
}
customElements.define('nav_bar-component', Nav_Bar);

class Results_Card extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = staticResults_Card;
  }
}
customElements.define('results_card-component', Results_Card);



class FileInputForm extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = staticFileInputForm;
  }
}
customElements.define('file-input-form-component', FileInputForm);

class Download_Bar extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = staticDownload_Bar;
  }
}
customElements.define('download_bar-component', Download_Bar);

