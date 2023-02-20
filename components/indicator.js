const staticIndicator = `<div class="card">
    <div class="card-body d-flex align-items-center justify-content-center">
      <span class="d-flex align-items-center justify-content-center me-3">System Status</span>
      <div class="d-flex align-items-center justify-content-center me-3">
        <span id="errorBadge" class="badge bg-danger" style="display:none">Error</span>
        <span id="busyBadge" class="badge bg-warning text-dark" style="display:none">Busy</span>
        <span id="readyBadge" class="badge bg-success">Ready</span>
      </div> 
      <div class="d-flex align-items-center justify-content-center me-3">
          <div class="trafficlight">
              <span id="errorIndicator" class="lamp"></span>
          </div> 
          <div class="trafficlight">
              <span id="busyIndicator" class="lamp"></span>
          </div>       
          <div class="trafficlight">
              <span id="readyIndicator" class="green lamp"></span>
          </div>
      </div>
      <button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#demoModal"
      title="Demo Mode"><i class="fa fa-user-secret" aria-hidden="true"></i></button>
    </div>
  </div>`



class Indicator extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = staticIndicator;
  }
}

customElements.define('indicator-component', Indicator);