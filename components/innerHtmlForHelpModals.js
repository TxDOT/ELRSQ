const staticCursor_Help_Modal = `
<!-- Modal -->
  <div class="modal fade" id="cursorHelpModal" tabindex="-1" aria-labelledby="cursorHelpModalLabel" aria-hidden="true">cog
      <div class="modal-dialog">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title">Help with...</h5>
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


const staticForm_Help_Modal = `      
<!-- Modal -->
  <div class="modal fade" id="formHelpModal" tabindex="-1" aria-labelledby="formHelpModalLabel" aria-hidden="true">
      <div class="modal-dialog">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title">Help with...</h5>
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
                  <h5 class="modal-title" >Help with...</h5>
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

const staticRoute_Help_Modal = `
<!-- Modal -->
<div class="modal fade" id="routeHelpModal" tabindex="-1" aria-labelledby="routeHelpModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" >Help with...</h5>
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
                <h5 class="modal-title" >Help with...</h5>
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
