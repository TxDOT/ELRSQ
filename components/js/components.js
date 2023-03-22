class Demo_Modal extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = staticDemo_Modal;
  }
}
customElements.define('demo_modal-component', Demo_Modal);