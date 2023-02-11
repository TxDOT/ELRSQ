const staticBulk_Modal_B = `      <!-- Modal -->
<div class="modal fade" id="bulkModal2" tabindex="-1" aria-labelledby="bulkModalLabel2" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="bulkModalLabel2">Bulk Conversion</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <!-- Horizontal Form -->
        <h3>Placeholder for Bulk Conversion UI</h3>
        <button type="button" onclick="" class="btn btn-primary" title="Download a fillable template"><i class="fa fa-download"></i> Download Template</button>
        <form>
          <fieldset class="upload_dropZone text-center mb-3 p-4">
            <p class="small my-2">Drag &amp; Drop CSV inside dashed region<br><i>or</i></p>
            <input id="upload_control-section-bulk" data-post-name="control-section-bulk" 
              data-post-url="https://someplace.com/image/uploads/backgrounds/" 
              class="position-absolute invisible" type="file" multiple accept="" />
            <label class="btn btn-upload mb-3" for="upload_control-section-bulk">Choose file(s)</label>
            <div class="upload_gallery d-flex flex-wrap justify-content-center gap-3 mb-0"></div>
          </fieldset>
          <button class="btn btn-primary" type="button" id="button" onclick="" title="Convert to other LRS"><i class="fa fa-cog" aria-hidden="true"></i> Convert</button>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
<!--End Modal -->`

class Bulk_Modal_B extends HTMLElement {

  async #getHTML (path) {
    try {
      let request = await fetch(path);
      this.innerHTML = await request.text();
    } catch {
      this.innerHTML = staticBulk_Modal_B;
    }
  }

  constructor () {
    super();
    let path = 'bulk_modal_B.html';
    this.#getHTML(path);
  }
  
  connectedCallback() {
    this.innerHTML = staticBulk_Modal_B;
  }
}

customElements.define('bulk_modal_b-component', Bulk_Modal_B);