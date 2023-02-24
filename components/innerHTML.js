const staticBulk_Modal = `      
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
          <a type="button" id="tmpl-latlon" href="templates/queryPointByCoordinates.csv" download="queryPointByCoordinates.csv" class="btn btn-primary" title="Download a fillable template"><i class="fa fa-download"></i> Lat/Lon Template</a>
          <a type="button" id="tmpl-field" href="templates/queryPointByReferenceMarker.csv" download="queryPointByReferenceMarker.csv" class="btn btn-primary" style="display:none" title="Download a fillable template"><i class="fa fa-download"></i> Field Location Template</a>
          <a type="button" id="tmpl-controlsection" href="templates/queryPointByControlSection.csv" download="queryPointByControlSection.csv" class="btn btn-primary" style="display:none" title="Download a fillable template"><i class="fa fa-download"></i> Control Section Template</a>
          <a type="button" id="tmpl-dfo" href="templates/queryPointByDFO.csv" download="queryPointByDFO.csv" class="btn btn-primary" style="display:none" title="Download a fillable template"><i class="fa fa-download"></i> DFO Template</a>
          
          <form id="bulk-form">
            <fieldset id="fieldset-uploadCsv-bulk" class="upload_dropZone text-center mb-3 p-4">
            <legend class="visually-hidden">CSV uploader</legend>
              <p class="small my-2">Drag &amp; Drop CSV inside dashed region<br><i>or</i></p>
              <input id="uploadCsv-bulk" data-post-name="csv-bulk" 
                class="position-absolute invisible form-control" type="file" placeholder="Select file" accept=".csv" />
              <label class="btn btn-upload mb-3" for="uploadCsv-bulk">Choose file(s)</label>
            </fieldset>
            <button id="bulk-convert-button" class="btn btn-primary" type="button"  title="Convert to other LRS"><i class="fa fa-cog" aria-hidden="true"></i> Convert</button>
          </form>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  <!--End Modal -->`

const staticNav_Bar = `
<nav class="navbar navbar-expand-lg navbar-light bg-light"> 
<div class="container-fluid">
    <div id="navbarSupportedContent">  
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">

        <li class="nav-item">
        <a class="nav-link " href="index.html">
            <span>Home</span>
        </a>
        </li>
        <!-- End Form View Nav -->
        
        <li class="nav-item">
        <a class="nav-link " href="bulk_conversion.html">
            <span>Bulk Conversion</span>
        </a>
        </li>
        <!-- End Bulk Conversion Nav -->

        <li class="nav-item">
        <a class="nav-link collapsed" href="build-routes.html">
            <span>Build Routes</span>
        </a>
        </li>
        <!-- End Build Routes Page Nav -->

        <li class="nav-item">
        <a class="nav-link collapsed" href="brownwood.html">
            <span>Bulk Routes</span>
        </a>
        </li>
        <!-- End Bulk Routes Page Nav -->
    </ul>
    </div>
</div>
</nav>`

const staticIndicator = `
<style>
  .trafficlight {
    background: #222;
    width: 35px;
    height: 35px;
    border-radius: 25%;
    position: relative;
  }

  .lamp {
    background-size: 2px 2px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    position: absolute;
    top: 5px;
    left: 5px;
  }

  .red {
    background: red;
    background-image: radial-gradient(brown, transparent);
    animation: 13s red infinite;
    border: dotted 1px red;
    box-shadow:
      0 0 5px #111 inset,
      0 0 3px red;
  }

  .yellow {
    background: yellow;
    background-image: radial-gradient(orange, transparent);
    border: dotted 1px yellow;
    animation: 5s yellow infinite;
    box-shadow:
      0 0 5px #111 inset,
      0 0 3px yellow;
  }

  .green {
    background: green;
    background-image: radial-gradient(lime, transparent);
    border: dotted 1px lime;
    box-shadow:
      0 0 15x #111 inset,
      0 0 3px lime;
    animation: 10s green infinite;
  }

  @keyframes red {
    0% {
      opacity: 1
    }

    20% {
      opacity: 1
    }

    40% {
      opacity: 1
    }

    60% {
      opacity: .1
    }

    80% {
      opacity: .1
    }

    100% {
      opacity: .1
    }
  }

  @keyframes yellow {
    0% {
      opacity: .5
    }

    50% {
      opacity: 1
    }

    100% {
      opacity: .5
    }
  }

  @keyframes green {
    0% {
      opacity: .7
    }

    50% {
      opacity: 1
    }

    100% {
      opacity: .7
    }
  }

  @keyframes greenblink {
    0% {
      opacity: .1
    }

    40% {
      opacity: .1
    }

    60% {
      opacity: 1
    }

    80% {
      opacity: 1
    }

    83% {
      opacity: .1
    }

    100% {
      opacity: .1
    }
  }
</style>



<div class="card">
    <div class="card-body d-flex align-items-center justify-content-center">
      <span class="d-flex align-items-center justify-content-center me-3">System Status</span>
      <div class="d-flex align-items-center justify-content-center me-3">
        <span id="errorBadge" class="badge bg-danger" style="display:none">Error</span>
        <span id="busyBadge" class="badge bg-warning text-dark" style="display:none">Busy</span>
        <span id="readyBadge" class="badge bg-success">Ready</span>
      </div> 
      <div class="d-flex align-items-center justify-content-center me-3">
          <div class="trafficlight">
              <span id="errorIndicator" class="lamp"></span>
          </div> 
          <div class="trafficlight">
              <span id="busyIndicator" class="lamp"></span>
          </div>       
          <div class="trafficlight">
              <span id="readyIndicator" class="green lamp"></span>
          </div>
      </div>
      <button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#demoModal"
      title="Demo Mode"><i class="fa fa-user-secret" aria-hidden="true"></i></button>
    </div>
  </div>`

const staticCursor_Help_Modal = `
<!-- Modal -->
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

const staticResults_Card = `      
  <style>
  #results_card table thead tr {
    border: 0;
  }

  /* set column width */
  #results_card table thead tr td {
    width: 50%;
    border: 0;
  }

  /* bolded headers and data results */
  #results_card table tbody tr:first-child td {
    font-weight: bold;
    border-bottom: solid black 1px;
  }

  #results_card table tbody tr:not(:first-child) td:last-child {
    font-weight: bold;
    /*border-top: solid black 1px;*/
    border-bottom: solid black 1px;
    border-left: solid black 1px;
  }




  /* borders around mini-tables */
  #results_card table tbody tr:first-child {
    border-top: solid 2px;
  }

  #results_card table tbody tr:last-child {
    border-bottom: solid 2px;
  }

  #results_card table tbody tr td:first-child {
    border-left: solid 2px;
  }

  #results_card table tbody tr td:last-child {
    border-right: solid 2px;
  }
</style>

  
  
  
  <div id="results_card" class="card">
  <div class="card-body">
      <h5 class="card-title">Results:</h5>
  
      <div class="card">
          <div id="results-header" class="card-body">
              <span id="result-pagination"></span>
              <div class="btn-toolbar mb-3 justify-content-center" role="toolbar"
                  aria-label="Toolbar with button groups">
                  <div class="btn-group me-2 mb-2" role="group" aria-label="download group">
                      <a id="CSVdownload" type="button" href=" " download=" " class="btn btn-primary"
                          title="Export a CSV file of all points"><i class="fa fa-download"></i> CSV</button>
  
                      <a id="JSONdownload" type="button" href=" " download=" " class="btn btn-primary"
                          title="Export a JSON file of all points"><i class="fa fa-download"></i> JSON</a>
  
                      <a id="KMLdownload" type="button" href=" " download=" " class="btn btn-primary"
                          title="Export a KML file of all points"><i class="fa fa-download"></i> KML</a>
                  </div>
                  <div class="btn-group mb-2" role="group" aria-label="download group">
                      <button type="button" class="btn btn-info" data-bs-toggle="modal"
                          data-bs-target="#resultsHelpModal" title="Results Help"><i class="fa fa-question"
                              aria-hidden="true"></i> Help</button>
                  </div>
              </div>
          </div>
      </div>
  
  
      <div class="card">
          <div class="card-body">
              <!-- Bordered Table -->
              <table class="table table-sm">
                  <thead>
                      <tr>
                          <td ></td>
                          <td ></td>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td >Route Information</td>
                          <td >
                              <button type="button" class="btn btn-info" onclick="copyRouteDFO()" title="copy"><i
                                      class="fa fa-copy" aria-hidden="true"></i></button>
                              <button type="button" class="btn btn-info"
                                  onclick="makequeryTxDOT_Roadways_Unsegmented()"><i class="fa fa-link"
                                      aria-hidden="true"></i></button>
                          </td>
                      </tr>
                      <tr>
                          <td >RouteID:</td>
                          <td id="p_returned_ROUTEID" class="textout table-secondary"></td>
                      </tr>
                      <tr>
                          <td >Route:</td>
                          <td id="p_returned_RTE_DEFN_LN_NM" class="textout table-secondary"></td>
                      </tr>
                      <tr>
                          <td >Roadbed Type:</td>
                          <td id="p_returned_RDBD_TYPE_DSCR" class="textout table-secondary"></td>
                      </tr>
                      <tr>
                          <td >DFO:</td>
                          <td id="p_returned_RTE_DFO" class="textout table-secondary"></td>
                      </tr>
                  </tbody>
              </table>
  
              <table class="table table-sm">
                  <thead>
                      <tr>
                          <td ></td>
                          <td ></td>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td >Control Section</td>
                          <td ><button type="button" class="btn btn-info" onclick="copyControlSection()"
                                  title="copy"><i class="fa fa-copy" aria-hidden="true"></i></button></td>
                      </tr>
                      <tr>
                          <td >Control Section:</td>
                          <td id="p_returned_CTRL_SECT_LN_NBR" class="textout table-secondary"></td>
                      </tr>
                      <tr>
                          <td >Mile Point:</td>
                          <td id="p_returned_CTRL_SECT_MPT" class="textout table-secondary"></td>
                      </tr>
                  </tbody>
              </table>
  
              <table class="table table-sm">
                  <thead>
                      <tr>
                          <td ></td>
                          <td ></td>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td >Field Location</td>
                          <td ><button type="button" class="btn btn-info" onclick="copyFieldLocation()"
                                  title="copy"><i class="fa fa-copy" aria-hidden="true"></i></button></td>
                      </tr>
                      <tr>
                          <td >Reference Marker:</td>
                          <td id="p_returned_RMRKR_PNT_NBR" class="textout table-secondary"></td>
                      </tr>
                      <tr>
                          <td >Displacement:</td>
                          <td id="p_returned_RMRKR_DISPLACEMENT" class="textout table-secondary"></td>
                      </tr>
                  </tbody>
              </table>
  
  
              <table class="table table-sm">
                  <thead>
                      <tr>
                          <td ></td>
                          <td ></td>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td >Coordinates</td>
                          <td ><button type="button" class="btn btn-info" onclick="copyCoordinates()"
                                  title="copy"><i class="fa fa-copy" aria-hidden="true"></i></button></td>
                      </tr>
                      <tr>
                          <td >Latitude:</td>
                          <td id="p_returned_LAT" class="textout table-secondary"></td>
                      </tr>
                      <tr>
                          <td >Longitude:</td>
                          <td id="p_returned_LON" class="textout table-secondary"></td>
                      </tr>
                  </tbody>
              </table>
              <!-- End Bordered Table -->
  
          </div>
      </div>
  
  </div>
  </div>`

const staticForm_Help_Modal = `      
<!-- Modal -->
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

const staticResults_Help_Modal = `
<!-- Modal -->
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
        <button class="btn btn-outline-primary" type="button" onclick="lrsQuery(3, 0, 'inputControlSection', 'inputMilepointMeasure')"
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
        <button class="btn btn-outline-primary" type="button" onclick="lrsQuery(4, 0, 'inputRouteName', 'inputDistanceFromOrigin')"
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
        <button class="btn btn-outline-primary" type="button" onclick="lrsQuery(2, 0, 'inputRouteName', 'inputReferenceMarker', 'inputDisplacement')"
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
        <button class="btn btn-outline-primary" type="button" onclick="lrsQuery(1, 0, 'inputLatitude', 'inputLongitude')"
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

const staticRoute_Help_Modal = `
<!-- Modal -->
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

const staticRoute_Style_Help_Modal = `
<!-- Modal -->
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

const staticMap_Controls = `
<div class="card-body">

  <input id="basemap-event"    
  type="checkbox" checked 
  data-toggle="toggle" data-html="true" 
  data-onlabel="<i class='fa fa-camera'     aria-hidden='true'></i> Imagery"     
  data-offlabel="<i class='fa fa-map-signs' aria-hidden='true'></i> TxDOT"       
  data-onstyle="success" 
  data-offstyle="primary">

  <input id="refmrkr-event"    
  type="checkbox" 
  data-toggle="toggle" data-html="true" 
  data-onlabel="<i class='fa fa-toggle-off' aria-hidden='true'></i> Ref Mrkr"    
  data-offlabel="<i class='fa fa-toggle-on' aria-hidden='true'></i> Ref Mrkr"    
  data-onstyle="info" 
  data-offstyle="primary" 
  disabled>

  <input id="controlsec-event" 
  type="checkbox" 
  data-toggle="toggle" data-html="true" 
  data-onlabel="<i class='fa fa-toggle-off' aria-hidden='true'></i> Ctrl Sec" 
  data-offlabel="<i class='fa fa-toggle-on' aria-hidden='true'></i> Ctrl Sec" 
  data-onstyle="info" 
  data-offstyle="primary" 
  disabled> 

</div>`

const staticDemo_Modal = `
<!-- Modal -->
<div class="modal fade" id="demoModal" tabindex="-1" aria-labelledby="demoModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="demoModalLabel">Demo Mode</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
          <div class="modal-body">
              <div class="card-body">
                  <input id="demo-mode-toggle"    
                  type="checkbox" 
                  checked
                  data-toggle="toggle" data-html="true" 
                  data-onlabel="<i class='fa fa-toggle-off' aria-hidden='true'></i> Demo Mode"    
                  data-offlabel="<i class='fa fa-toggle-on' aria-hidden='true'></i> Demo Mode"    
                  data-onstyle="info" 
                  data-offstyle="primary">
              </div>
          </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
<!--End Modal -->
`

const staticResults_Card2 = `
<div id="results_card" class="card">
<div class="card-body">
  <h5 class="card-title">Results:</h5>

  <div class="card">
    <div id="results-header" class="card-body">
      <span id="result-pagination"></span>
      <div class="btn-toolbar mb-3 justify-content-center" role="toolbar" aria-label="Toolbar with button groups">
        <div class="btn-group me-2 mb-2" role="group" aria-label="download group">
          <a id="CSVdownload" type="button" href=" " download=" " class="btn btn-primary"
            title="Export a CSV file of all points"><i class="fa fa-download"></i> CSV</a>

          <a id="JSONdownload" type="button" href=" " download=" " class="btn btn-primary"
            title="Export a JSON file of all points"><i class="fa fa-download"></i> JSON</a>

          <a id="KMLdownload" type="button" href=" " download=" " class="btn btn-primary"
            title="Export a KML file of all points"><i class="fa fa-download"></i> KML</a>
        </div>
        <div class="btn-group mb-2" role="group" aria-label="download group">
          <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#resultsHelpModal"
            title="Results Help"><i class="fa fa-question" aria-hidden="true"></i> Help</button>
        </div>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-body">
      <!-- Bordered Table -->
      <table class="table table-sm">
        <thead>
          <tr>
            <td></td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Route Information</td>
            <td>
              <button id="copyRouteDFO" type="button" class="btn btn-info" title="copy"><i class="fa fa-copy"
                  aria-hidden="true"></i></button>
              <button id="makequeryTxDOT_Roadways_Unsegmented" type="button" class="btn btn-info"><i
                  class="fa fa-link" aria-hidden="true"></i></button>
            </td>
          </tr>
          <tr>
            <td>RouteID:</td>
            <td id="p_returned_ROUTEID" class="textout table-secondary"></td>
          </tr>
          <tr>
            <td>Route:</td>
            <td id="p_returned_RTE_DEFN_LN_NM" class="textout table-secondary"></td>
          </tr>
          <tr>
            <td>Roadbed Type:</td>
            <td id="p_returned_RDBD_TYPE_DSCR" class="textout table-secondary"></td>
          </tr>
          <tr>
            <td>DFO:</td>
            <td id="p_returned_RTE_DFO" class="textout table-secondary"></td>
          </tr>
        </tbody>
      </table>

      <table class="table table-sm">
        <thead>
          <tr>
            <td></td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Control Section</td>
            <td><button id="copyControlSection" type="button" class="btn btn-info" title="copy"><i class="fa fa-copy"
                  aria-hidden="true"></i></button></td>
          </tr>
          <tr>
            <td>Control Section:</td>
            <td id="p_returned_CTRL_SECT_LN_NBR" class="textout table-secondary"></td>
          </tr>
          <tr>
            <td>Mile Point:</td>
            <td id="p_returned_CTRL_SECT_MPT" class="textout table-secondary"></td>
          </tr>
        </tbody>
      </table>

      <table class="table table-sm">
        <thead>
          <tr>
            <td></td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Field Location</td>
            <td><button id="copyFieldLocation" type="button" class="btn btn-info" title="copy"><i class="fa fa-copy"
                  aria-hidden="true"></i></button></td>
          </tr>
          <tr>
            <td>Reference Marker:</td>
            <td id="p_returned_RMRKR_PNT_NBR" class="textout table-secondary"></td>
          </tr>
          <tr>
            <td>Displacement:</td>
            <td id="p_returned_RMRKR_DISPLACEMENT" class="textout table-secondary"></td>
          </tr>
        </tbody>
      </table>


      <table class="table table-sm">
        <thead>
          <tr>
            <td></td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Coordinates</td>
            <td><button id="copyCoordinates" type="button" class="btn btn-info" title="copy"><i class="fa fa-copy"
                  aria-hidden="true"></i></button></td>
          </tr>
          <tr>
            <td>Latitude:</td>
            <td id="p_returned_LAT" class="textout table-secondary"></td>
          </tr>
          <tr>
            <td>Longitude:</td>
            <td id="p_returned_LON" class="textout table-secondary"></td>
          </tr>
        </tbody>
      </table>
      <!-- End Bordered Table -->

    </div>
  </div>

</div>
</div>
`

