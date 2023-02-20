const staticBulk_Modal = `      <!-- Modal -->
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
          <a type="button" id="tmpl-latlon" href="templates/queryPointByCoordinates.csv" download="queryPointByCoordinates.csv" class="btn btn-primary" title="Download a fillable template"><i class="fa fa-download"></i> Lat/Lon Template</a>
          <a type="button" id="tmpl-field" href="templates/queryPointByReferenceMarker.csv" download="queryPointByReferenceMarker.csv" class="btn btn-primary" style="display:none" title="Download a fillable template"><i class="fa fa-download"></i> Field Location Template</a>
          <a type="button" id="tmpl-controlsection" href="templates/queryPointByControlSection.csv" download="queryPointByControlSection.csv" class="btn btn-primary" style="display:none" title="Download a fillable template"><i class="fa fa-download"></i> Control Section Template</a>
          <a type="button" id="tmpl-dfo" href="templates/queryPointByDFO.csv" download="queryPointByDFO.csv" class="btn btn-primary" style="display:none" title="Download a fillable template"><i class="fa fa-download"></i> DFO Template</a>
          
          <form id="bulk-form">

            <fieldset class="upload_dropZone text-center mb-3 p-4">

            <legend class="visually-hidden">CSV uploader</legend>

              <p class="small my-2">Drag &amp; Drop CSV inside dashed region<br><i>or</i></p>

              <input id="upload_csv-bulk" data-post-name="csv-bulk" 
                class="position-absolute invisible form-control" type="file" placeholder="Select file" accept=".csv" />

              <label class="btn btn-upload mb-3" for="upload_csv-bulk">Choose file(s)</label>


            </fieldset>

            <button class="btn btn-primary" type="button" id="bulk-convert-button" title="Convert to other LRS"><i class="fa fa-cog" aria-hidden="true"></i> Convert</button>

          </form>



        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  <!--End Modal -->`








class Bulk_Modal extends HTMLElement {

  constructor() {
    super();

  }

  connectedCallback() {
    this.innerHTML = staticBulk_Modal;
  }
}

customElements.define('bulk_modal-component', Bulk_Modal);