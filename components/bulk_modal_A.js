class Bulk_Modal_A extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
      <!-- Modal -->
      <div class="modal fade" id="bulkModal" tabindex="-1" aria-labelledby="bulkModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="bulkModalLabel">Bulk Conversion</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <!-- Horizontal Form -->
              <h3>Placeholder for Bulk Conversion UI</h3>
              <button type="button" onclick="" class="btn btn-primary" title="Download a fillable template"><i class="fa fa-download"></i> Download Template</button>
              <form>
                <div class="input-group mb-3">
                  <input type="file" class="form-control" placeholder="Select file" aria-label="Select file" aria-describedby="button-addon2">
                  <button class="btn btn-outline-primary" type="button" id="button-addon2" onclick="" title="Convert to other LRS"><i class="fa fa-cog" aria-hidden="true"></i> Convert</button>
                </div>
              </form><!-- End Horizontal Form -->
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      <!--End Modal -->
      `;
    }
  }
  
  customElements.define('bulk_modal_a-component', Bulk_Modal_A);