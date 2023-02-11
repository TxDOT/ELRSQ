const staticResults_Help_Modal = `<!-- Modal -->
<div class="modal fade" id="resultsHelpModal" tabindex="-1" aria-labelledby="resultsHelpModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="resultsHelpModalLabel">Help with...</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <h3>Results</h3>
                <p>After the query runs, the results will appear in the results table, organized by coordinate system.
                    Press the <strong><i class="fa fa-copy" aria-hidden="true"></i>&nbsp;Copy</strong> button to copy
                    results
                    to the clipboard.
                </p>
                <h3>Multiple Results</h3>
                <p>If the query returns multiple results, they will be sorted in increasing distance from the input
                    point (closest matches are shown first). Use the Previous and Next buttons to move through the
                    results.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
<!--End Modal -->`
  
  class Results_Help_Modal extends HTMLElement {
  
    async #getHTML (path) {
      try {
        let request = await fetch(path);
        this.innerHTML = await request.text();
      } catch {
        this.innerHTML = staticResults_Help_Modal;
      }
    }
  
    constructor () {
      super();
      let path = '/components/results_help_modal.html';
      this.#getHTML(path);
    }
    
    connectedCallback() {
      this.innerHTML = staticResults_Help_Modal;
    }
  }
  
  customElements.define('results_help_modal-component', Results_Help_Modal);










