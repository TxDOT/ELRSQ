const staticBulk_Modal = `      
<!-- Modal -->
  <div class="modal fade" id="bulkModal" tabindex="-1" aria-labelledby="bulkModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" >Bulk Conversion</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <!-- Horizontal Form -->
          <h3>Placeholder for Bulk Conversion UI</h3>
          <a type="button" id="tmpl-latlon" href="templates/queryPointByCoordinates.csv" download="queryPointByCoordinates.csv" class="btn btn-primary" title="Download a fillable template"><i class="fa fa-download"></i> Lat/Lon Template</a>
          <a type="button" id="tmpl-field" href="templates/queryPointByReferenceMarker.csv" download="queryPointByReferenceMarker.csv" class="btn btn-primary" style="display:none" title="Download a fillable template"><i class="fa fa-download"></i> Reference Marker</a>
          <a type="button" id="tmpl-controlsection" href="templates/queryPointByControlSection.csv" download="queryPointByControlSection.csv" class="btn btn-primary" style="display:none" title="Download a fillable template"><i class="fa fa-download"></i> Control Section Template</a>
          <a type="button" id="tmpl-dfo" href="templates/queryPointByDFO.csv" download="queryPointByDFO.csv" class="btn btn-primary" style="display:none" title="Download a fillable template"><i class="fa fa-download"></i> DFO Template</a>
          
          <form>
            <fieldset id="fieldset-uploadCsv-bulk" class="upload_dropZone fieldset-uploadCsv-bulk text-center mb-3 p-4">
            <legend class="visually-hidden">CSV uploader</legend>
              <p class="small my-2">Drag &amp; Drop CSV inside dashed region<br><i>or</i></p>
              <input id="uploadCsv-bulk" data-post-name="csv-bulk" 
                class="position-absolute invisible form-control uploadCsv-bulk" type="file" placeholder="Select file" accept=".csv" />
              <label class="btn btn-upload mb-3" for="uploadCsv-bulk">Choose file(s)</label>
            </fieldset>
            <button class="btn btn-primary bulk-convert" type="button"  title="Convert to other LRS"><i class="fa fa-cog" aria-hidden="true"></i> Convert</button>
          </form>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  <!--End Modal -->`


const staticWizard_Form = `                
<!-- Horizontal Form -->
  <form>
    <div class="row mb-3" id="rowInputControlSection">
      <label for="inputControlSection" class="col-sm-4 col-form-label">Control Section</label>
      <div class="input-group mb-3 col-sm-4">
        <input id="wizinputControlSection" type="text" name="controlsection" class="form-control textentry"
          placeholder="012201">
        <button id="missingControlSection" class="btn btn-outline-danger" type="button"
          onclick="noControlSection()">Unknown</button>
      </div>
    </div>
  
  
    <div class="row mb-3" id="rowInputMilepointMeasure">
      <label for="inputMilepointMeasure" class="col-sm-4 col-form-label">Milepoint Measure</label>
      <div class="input-group mb-3 col-sm-4">
        <input id="wizinputMilepointMeasure" type="number" name="mpm" class="form-control textentry"
          placeholder="2.394">
        <button class="btn btn-outline-primary" type="button" onclick="lrsSinglePointQuery(3, 0, 'inputControlSection', 'inputMilepointMeasure')"
          title="Convert to other LRS"><i class="fa fa-cog" aria-hidden="true"></i> Convert</button>
        <button id="missingMilepointMeasure" class="btn btn-outline-danger" type="button"
          onclick="noMilepointMeasure()">Unknown</button>
      </div>
    </div>
  
  
    <div class="row mb-3" style="display:none" id="rowInputRouteName">
      <label for="inputRouteName" class="col-sm-4 col-form-label">Route Name</label>
      <div class="input-group mb-3 col-sm-4">
        <input id="wizinputRouteName" type="text" pattern="[A-Z]{2}\d{4}[A-Z]?-[A-Z]{2}" name="routename"
          placeholder="US0077-KG" class="form-control textentry">
        <button id="missingRouteName" class="btn btn-outline-danger" type="button"
          onclick="noRouteName()">Unknown</button>
      </div>
    </div>
  
    <div class="row mb-3" style="display:none" id="rowInputDistanceFromOrigin">
      <label for="inputDistanceFromOrigin" class="col-sm-4 col-form-label">Distance From Origin</label>
      <div class="input-group mb-3 col-sm-4">
        <input id="wizinputDistanceFromOrigin" type="number" name="dfo" placeholder="1.606"
          class="form-control textentry">
        <button class="btn btn-outline-primary" type="button" onclick="lrsSinglePointQuery(4, 0, 'inputRouteName', 'inputDistanceFromOrigin')"
          title="Convert to other LRS"><i class="fa fa-cog" aria-hidden="true"></i> Convert</button>
        <button id="missingDistanceFromOrigin" class="btn btn-outline-danger" type="button"
          onclick="noDistanceFromOrigin()">Unknown</button>
      </div>
    </div>
  
    <div class="row mb-3" style="display:none" id="rowInputReferenceMarker">
      <label class="col-sm-4 col-form-label">Reference Marker & Displacement</label>
      <div class="input-group">
        <input id="wizinputReferenceMarker" type="number" name="refmarker" placeholder="622"
          class="form-control textentry">
        <input id="wizinputDisplacement" type="number" name="displacement" placeholder="0.065"
          class="form-control textentry">
        <button class="btn btn-outline-primary" type="button" onclick="lrsSinglePointQuery(2, 0, 'inputRouteName', 'inputReferenceMarker', 'inputDisplacement')"
          title="Convert to other LRS"><i class="fa fa-cog" aria-hidden="true"></i> Convert</button>
        <button id="missingReferenceMarker" class="btn btn-outline-danger" type="button"
          onclick="noReferenceMarker()">Unknown</button>
      </div>
    </div>
  
    <div class="row mb-3" style="display:none" id="rowInputMatchCoordinates">
      <label class="col-sm-4 col-form-label">Match Against:</label>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="matchcontrolsection" value="controlsection">
        <label class="form-check-label" for="inlineRadio1">Control Section</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="matchroutename" value="routename">
        <label class="form-check-label" for="inlineRadio2">Route Name</label>
      </div>
    </div>
  
  
    <div class="row mb-3" style="display:none" id="rowInputCoordinates">
      <label class="col-sm-4 col-form-label">Latitude & Longitude</label>
      <div class="input-group">
        <input id="wizinputLatitude" type="number" name="lat" placeholder="29.39780972"
          class="form-control textentry">
        <input id="wizinputLongitude" type="number" name="lon" placeholder="-94.98759004"
          class="form-control textentry">
        <button class="btn btn-outline-primary" type="button" onclick="lrsSinglePointQuery(1, 0, 'inputLatitude', 'inputLongitude')"
          title="Convert to other LRS"><i class="fa fa-cog" aria-hidden="true"></i> Convert</button>
        <button id="missingCoordinates" class="btn btn-outline-danger" type="button"
          onclick="restartWizard()">Restart</button>
      </div>
    </div>
  
    <div class="btn-toolbar mb-3 justify-content-center" role="toolbar"
      aria-label="Toolbar with button groups">
      <button type="reset" class="btn btn-secondary" title="Reset to default values"><i class="fa fa-undo"
          aria-hidden="true"></i> Reset</button>
    </div>
  </form><!-- End Horizontal Form -->`



const staticBulk_Modal_ReferenceMarker = `      
  <!-- Modal -->
    <div class="modal fade" id="bulkModalReferenceMarker" tabindex="-1" aria-labelledby="bulkModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" >Bulk Conversion</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
          <!-- Upload and Field Picker Form -->
          <form>
            <fieldset class="upload_dropZone text-center mb-3 p-4">
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
  
  
            <button class="btn btn-primary bulk-convert" type="button"
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
            <h5 class="modal-title">Bulk Conversion</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
          <!-- Upload and Field Picker Form -->
          <form>
            <fieldset class="upload_dropZone text-center mb-3 p-4">
              <legend class="visually-hidden">CSV uploader</legend>
              <p class="small my-2">Drag &amp; Drop CSV inside dashed region<br><i>or</i></p>
              <input id="uploadCsv-bulk" data-post-name="csv-bulk"
                class="position-absolute invisible form-control uploadCsv-bulk" type="file" placeholder="Select file"
                accept=".csv" />
              <label class="btn btn-upload mb-3" for="uploadCsv-bulk">Choose file(s)</label>
            </fieldset>
          
            <div class="input-group mb-3">
              <span class="input-group-text">Latitude Field:</span>
              <select id="lat_field" class="form-select candidate">
              </select>
              <button id="btn-lat_field" class="btn btn-outline-primary confirm" type="button">Select</button>
            </div>
          
            <div class="input-group mb-3">
              <span class="input-group-text">Longitude Field:</span>
              <select id="lon_field" class="form-select candidate">
              </select>
              <button id="btn-lon_field" class="btn btn-outline-primary confirm" type="button">Select</button>
            </div>
          
            <div class="input-group mb-3">
              <span class="input-group-text">Route Name Field:</span>
              <select id="coordinates-rte_nm_field" class="form-select candidate">
              </select>
              <button id="btn-coordinates-rte_nm_field" class="btn btn-outline-primary confirm"
                type="button">Select</button>
            </div>
          
            <button class="btn btn-primary bulk-convert" type="button"
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




const staticBulk_Modal_ControlSection = `      
    <!-- Modal -->
      <div class="modal fade" id="bulkModalControlSection" tabindex="-1" aria-labelledby="bulkModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Bulk Conversion</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <!-- Upload and Field Picker Form -->
            <form>
              <fieldset class="upload_dropZone text-center mb-3 p-4">
                <legend class="visually-hidden">CSV uploader</legend>
                <p class="small my-2">Drag &amp; Drop CSV inside dashed region<br><i>or</i></p>
                <input id="uploadCsv-bulk" data-post-name="csv-bulk" class="position-absolute invisible form-control uploadCsv-bulk"
                  type="file" placeholder="Select file" accept=".csv" />
                <label class="btn btn-upload mb-3" for="uploadCsv-bulk">Choose file(s)</label>
              </fieldset>

              <div class="input-group mb-3">
                <span class="input-group-text">Control Section Field:</span>
                <select id="cs_field" class="form-select candidate">
                </select>
                <button id="btn-cs_field" class="btn btn-outline-primary confirm" type="button">Select</button>
              </div>

              <div class="input-group mb-3">
                <span class="input-group-text">Milepoint Marker Field:</span>
                <select id="mp_field" class="form-select candidate">
                </select>
                <button id="btn-mp_field" class="btn btn-outline-primary confirm" type="button">Select</button>
              </div>

              <div class="input-group mb-3">
                <span class="input-group-text">Route Name Field:</span>
                <select id="controlsection-rte_nm_field" class="form-select candidate">
                </select>
                <button id="btn-controlsection-rte_nm_field" class="btn btn-outline-primary confirm"
                  type="button">Select</button>
              </div>

              <button class="btn btn-primary bulk-convert" type="button" title="Convert to other LRS"><i
                  class="fa fa-cog" aria-hidden="true"></i> Convert</button>
            </form>
            <!-- End Upload and Field Picker Form -->>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      <!--End Modal -->`





const staticBulk_Modal_DFO = `      
      <!-- Modal -->
        <div class="modal fade" id="bulkModalDFO" tabindex="-1" aria-labelledby="bulkModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Bulk Conversion</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
              <!-- Upload and Field Picker Form -->
              <form>
                <fieldset class="upload_dropZone text-center mb-3 p-4">
                  <legend class="visually-hidden">CSV uploader</legend>
                  <p class="small my-2">Drag &amp; Drop CSV inside dashed region<br><i>or</i></p>
                  <input id="uploadCsv-bulk" data-post-name="csv-bulk" class="position-absolute invisible form-control uploadCsv-bulk"
                    type="file" placeholder="Select file" accept=".csv" />
                  <label class="btn btn-upload mb-3" for="uploadCsv-bulk">Choose file(s)</label>
                </fieldset>

                <div class="input-group mb-3">
                  <span class="input-group-text">Route Name Field:</span>
                  <select id="distancefromorigin-rte_nm_field" class="form-select candidate">
                  </select>
                  <button id="btn-distancefromorigin-rte_nm_field" class="btn btn-outline-primary confirm"
                    type="button">Select</button>
                </div>

                <div class="input-group mb-3">
                  <span class="input-group-text">DFO Field:</span>
                  <select id="dfo_field" class="form-select candidate">
                  </select>
                  <button id="btn-dfo_field" class="btn btn-outline-primary confirm" type="button">Select</button>
                </div>

                <button class="btn btn-primary bulk-convert" type="button" title="Convert to other LRS"><i
                    class="fa fa-cog" aria-hidden="true"></i> Convert</button>
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






