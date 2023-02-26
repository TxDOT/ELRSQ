const staticBulk_Modal_ReferenceMarker = `      
<!-- Modal -->
  <div class="modal fade" id="bulkModalReferenceMarker" tabindex="-1" aria-labelledby="bulkModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="bulkModalLabel">Bulk Conversion</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <!-- Upload and Field Picker Form -->
        <form id="bulk-form">
          <fieldset id="fieldset-uploadCsv-bulk" class="upload_dropZone text-center mb-3 p-4">
            <legend class="visually-hidden">CSV uploader</legend>
            <p class="small my-2">Drag &amp; Drop CSV inside dashed region<br><i>or</i></p>
            <input id="uploadCsv-bulk" data-post-name="csv-bulk"
              class="position-absolute invisible form-control" type="file" placeholder="Select file"
              accept=".csv" />
            <label class="btn btn-upload mb-3" for="uploadCsv-bulk">Choose file(s)</label>
          </fieldset>

          <div class="input-group mb-3">
            <span class="input-group-text">Route Name Field:</span>
            <select id="rte_nm_field" class="form-select candidate">
            </select>
            <button id="btn-rte_nm_field" class="btn btn-outline-primary" type="button">Select</button>
          </div>

          <div class="input-group mb-3">
            <span class="input-group-text">Reference Marker Field:</span>
            <select id="rm_field" class="form-select candidate">
            </select>
            <button id="btn-rm_field" class="btn btn-outline-primary" type="button">Select</button>
          </div>

          <div class="input-group mb-3">
            <span class="input-group-text">Displacement Field:</span>
            <select id="d_field" class="form-select candidate">
            </select>
            <button id="btn-d_field" class="btn btn-outline-primary" type="button">Select</button>
          </div>


          <button id="bulk-convert-button" class="btn btn-primary" type="button"
            title="Convert to other LRS"><i class="fa fa-cog" aria-hidden="true"></i> Convert</button>
        </form>
        <!-- End Upload and Field Picker Form -->

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  <!--End Modal -->`




const staticBulk_Modal_LatLon = `      
<!-- Modal -->
  <div class="modal fade" id="bulkModalLatLon" tabindex="-1" aria-labelledby="bulkModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="bulkModalLabel">Bulk Conversion</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <!-- Upload and Field Picker Form -->
        <form id="coordinates-bulk-form">
          <fieldset id="coordinates-bulk-fieldset" class="upload_dropZone text-center mb-3 p-4">
            <legend class="visually-hidden">CSV uploader</legend>
            <p class="small my-2">Drag &amp; Drop CSV inside dashed region<br><i>or</i></p>
            <input id="coordinates-uploadCsv-bulk" data-post-name="csv-bulk"
              class="position-absolute invisible form-control" type="file" placeholder="Select file"
              accept=".csv" />
            <label class="btn btn-upload mb-3" for="uploadCsv-bulk">Choose file(s)</label>
          </fieldset>
        
          <div class="input-group mb-3">
            <span class="input-group-text">Latitude Field:</span>
            <select id="lat_field" class="form-select candidate">
            </select>
            <button id="btn-lat_field" class="btn btn-outline-primary" type="button">Select</button>
          </div>
        
          <div class="input-group mb-3">
            <span class="input-group-text">Longitude Field:</span>
            <select id="lon_field" class="form-select candidate">
            </select>
            <button id="btn-lon_field" class="btn btn-outline-primary" type="button">Select</button>
          </div>
        
          <div class="input-group mb-3">
            <span class="input-group-text">Route Name Field:</span>
            <select id="coordinates-rte_nm_field" class="form-select candidate">
            </select>
            <button id="btn-coordinates-rte_nm_field" class="btn btn-outline-primary"
              type="button">Select</button>
          </div>
        
          <button id="coordinates-bulk-convert-button" class="btn btn-primary" type="button"
            title="Convert to other LRS"><i class="fa fa-cog" aria-hidden="true"></i> Convert</button>
        </form>
        <!-- End Upload and Field Picker Form -->
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  <!--End Modal -->`













