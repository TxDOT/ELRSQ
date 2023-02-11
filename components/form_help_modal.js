const staticForm_Help_Modal = `      <!-- Modal -->
<div class="modal fade" id="formHelpModal" tabindex="-1" aria-labelledby="formHelpModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="formHelpModalLabel">Help with...</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <h3>Convert</h3>
                <p>Type or paste values (e.g. Latitude and Longitude) and press the
                    <strong><i class="fa fa-cog" aria-hidden="true"></i>&nbsp;Convert</strong> button.
                    The point will appear on the map, and route information will appear in the table.
                    If multiple results are returned, navigation buttons appear.
                </p>

                <h3>Reset</h3>
                <p>To clear the map and table, press the <strong><i class="fa fa-undo"
                            aria-hidden="true"></i>&nbsp;Reset</strong> button.</p>
                <h3>Bulk Conversion</h3>
                <p> Press the <strong><i class="fa fa-table" aria-hidden="true"></i> Bulk Conversion</strong> button.
                    Select a CSV file and press the
                    <strong><i class="fa fa-cog" aria-hidden="true"></i>&nbsp;Convert</strong> button.
                    The points will appear on the map, and route information will appear in the table.
                    If multiple results are returned, navigation buttons appear.
                </p>
                <br>
                <p>The input table should be formatted like this:</p>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Feature</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Texas Forestry Museum</td>
                            <td>31.350000</td>
                            <td>-94.704638</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
<!--End Modal -->`
  
  class Form_Help_Modal extends HTMLElement {
  
    async #getHTML (path) {
      try {
        let request = await fetch(path);
        this.innerHTML = await request.text();
      } catch {
        this.innerHTML = staticForm_Help_Modal;
      }
    }
  
    constructor () {
      super();
      let path = '/components/form_help_modal.html';
      this.#getHTML(path);
    }
    
    connectedCallback() {
      this.innerHTML = staticForm_Help_Modal;
    }
  }
  
  customElements.define('form_help_modal-component', Form_Help_Modal);










