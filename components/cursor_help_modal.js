const staticCursor_Help_Modal = `<!-- Modal -->
<div class="modal fade" id="cursorHelpModal" tabindex="-1" aria-labelledby="cursorHelpModalLabel" aria-hidden="true">cog
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="cursorHelpModalLabel">Help with...</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <h3>Convert</h3>
                <p>Click a location on the map within 150 feet of a roadway.
                    The point will appear on the map, and route information will appear in the table.
                    If multiple results are returned, navigation buttons appear.
                </p>

                <h3>Reset</h3>
                <p>To clear the map and table, press the <strong><i class="fa fa-undo"
                            aria-hidden="true"></i>&nbsp;Reset</strong> button.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
<!--End Modal -->`
  
  class Cursor_Help_Modal extends HTMLElement {
  
    /*async #getHTML (path) {
      try {
        let request = await fetch(path);
        this.innerHTML = await request.text();
      } catch {
        this.innerHTML = staticCursor_Help_Modal;
      }
    }*/
  
    constructor () {
      super();
      /*let path = '/components/cursor_help_modal.html';
      this.#getHTML(path);*/
    }
    
    connectedCallback() {
      this.innerHTML = staticCursor_Help_Modal;
    }
  }
  
  customElements.define('cursor_help_modal-component', Cursor_Help_Modal);










