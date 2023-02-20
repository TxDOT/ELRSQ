const staticRoute_Style_Help_Modal = `<!-- Modal -->
<div class="modal fade" id="routeStyleHelpModal" tabindex="-1" aria-labelledby="routeStyleHelpModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="routeStyleHelpModalLabel">Help with...</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <h3>Styling</h3>
                <p>Select your line color and width. Enter a project name.
                </p>
                <h3>Add / Drop / Clear</h3>
                <p>tbd</p>
                <h3>Map Routes</h3>
                <p>tbd
                </p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
<!--End Modal -->`
  
  class Route_Style_Help_Modal extends HTMLElement {
  
    /*async #getHTML (path) {
      try {
        let request = await fetch(path);
        this.innerHTML = await request.text();
      } catch {
        this.innerHTML = staticRoute_Style_Help_Modal;
      }
    }*/
  
    constructor () {
      super();
      /*let path = '/components/route_style_help_modal.html';
      this.#getHTML(path);*/
    }
    
    connectedCallback() {
      this.innerHTML = staticRoute_Style_Help_Modal;
    }
  }
  
  customElements.define('route_style_help_modal-component', Route_Style_Help_Modal);










