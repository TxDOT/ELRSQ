const staticRoute_Help_Modal = `<!-- Modal -->
<div class="modal fade" id="routeHelpModal" tabindex="-1" aria-labelledby="routeHelpModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="routeHelpModalLabel">Help with...</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <h3>Convert</h3>
                <p>Type or paste values (e.g. Route Name and DFO) and press the
                    <strong><i class="fa fa-cog" aria-hidden="true"></i>&nbsp;Convert</strong> button. The route
                    information will appear in the table.
                </p>
                <p>
                    When querying by Reference Marker or DFO, the user enters the Route Name. When querying by Control
                    Section, the user enters the Control Section. When querying by coordinates or the map cursor, the
                    user will be presented with a list of candidate Route Names and will choose the desired route.
                </p>
                <h3>Reset</h3>
                <p>To clear the map and table, press the <strong><i class="fa fa-undo"
                            aria-hidden="true"></i>&nbsp;Reset</strong> button.</p>
                <h3>Bulk Conversion</h3>
                <p> Press the <strong><i class="fa fa-table" aria-hidden="true"></i> Bulk Conversion</strong> button.
                    Select a CSV file and press the
                    <strong><i class="fa fa-cog" aria-hidden="true"></i>&nbsp;Convert</strong> button.
                    The routes will appear on the map, and route information will appear in the table.
                </p>
                <br>
                <p>The input table should be formatted like this:</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
<!--End Modal -->`
  
  class Route_Help_Modal extends HTMLElement {
  
    /*async #getHTML (path) {
      try {
        let request = await fetch(path);
        this.innerHTML = await request.text();
      } catch {
        this.innerHTML = staticRoute_Help_Modal;
      }
    }*/
  
    constructor () {
      super();
      /*let path = '/components/route_help_modal.html';
      this.#getHTML(path);*/
    }
    
    connectedCallback() {
      this.innerHTML = staticRoute_Help_Modal;
    }
  }
  
  customElements.define('route_help_modal-component', Route_Help_Modal);










