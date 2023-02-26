const staticWizard_Form = `                
<!-- Horizontal Form -->
<form>
  <div class="row mb-3" id="rowInputControlSection">
    <label for="inputControlSection" class="col-sm-4 col-form-label">Control Section</label>
    <div class="input-group mb-3 col-sm-4">
      <input id="wizinputControlSection" type="text" name="controlsection" class="form-control textentry"
        placeholder="012201">
      <button id="missingControlSection" class="btn btn-outline-danger" type="button">Unknown</button>
    </div>
  </div>

  <div class="row mb-3" id="rowInputMilepointMeasure">
    <label for="inputMilepointMeasure" class="col-sm-4 col-form-label">Milepoint Measure</label>
    <div class="input-group mb-3 col-sm-4">
      <input id="wizinputMilepointMeasure" type="number" name="mpm" class="form-control textentry" placeholder="2.394">
      <button id="convert3-wizard" class="btn btn-outline-primary" type="button" title="Convert to other LRS">
      <i class="fa fa-cog" aria-hidden="true"></i> Convert</button>
      <button id="missingMilepointMeasure" class="btn btn-outline-danger" type="button">Unknown</button>
    </div>
  </div>

  <div class="row mb-3" style="display:none" id="rowInputRouteName">
    <label for="inputRouteName" class="col-sm-4 col-form-label">Route Name</label>
    <div class="input-group mb-3 col-sm-4">
      <input id="wizinputRouteName" type="text" pattern="[A-Z]{2}\d{4}[A-Z]?-[A-Z]{2}" name="routename"
        placeholder="US0077-KG" class="form-control textentry">
      <button id="missingRouteName" class="btn btn-outline-danger" type="button">Unknown</button>
    </div>
  </div>

  <div class="row mb-3" style="display:none" id="rowInputDistanceFromOrigin">
    <label for="inputDistanceFromOrigin" class="col-sm-4 col-form-label">Distance From Origin</label>
    <div class="input-group mb-3 col-sm-4">
      <input id="wizinputDistanceFromOrigin" type="number" name="dfo" placeholder="1.606"
        class="form-control textentry">
      <button id="convert4-wizard" class="btn btn-outline-primary" type="button" title="Convert to other LRS">
      <i class="fa fa-cog" aria-hidden="true"></i> Convert</button>
      <button id="missingDistanceFromOrigin" class="btn btn-outline-danger" type="button">Unknown</button>
    </div>
  </div>

  <div class="row mb-3" style="display:none" id="rowInputReferenceMarker">
    <label class="col-sm-4 col-form-label">Reference Marker & Displacement</label>
    <div class="input-group">
      <input id="wizinputReferenceMarker" type="number" name="refmarker" placeholder="622"
        class="form-control textentry">
      <input id="wizinputDisplacement" type="number" name="displacement" placeholder="0.065"
        class="form-control textentry">
      <button id="convert2-wizard" class="btn btn-outline-primary" type="button" title="Convert to other LRS">
        <i class="fa fa-cog" aria-hidden="true"></i> Convert</button>
      <button id="missingReferenceMarker" class="btn btn-outline-danger" type="button">Unknown</button>
    </div>
  </div>

  <!-- TODO Wizard: enable this -->
  <div class="row mb-3" style="display:none" id="rowInputMatchCoordinates">
    <label class="col-sm-4 col-form-label">Match Against:</label>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="matchcontrolsection"
        value="controlsection">
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
      <input id="wizinputLatitude" type="number" name="lat" placeholder="29.39780972" class="form-control textentry">
      <input id="wizinputLongitude" type="number" name="lon" placeholder="-94.98759004" class="form-control textentry">
      <button id="convert1-wizard" class="btn btn-outline-primary" type="button" title="Convert to other LRS">
        <i class="fa fa-cog" aria-hidden="true"></i> Convert</button>
      <button id="missingCoordinates" class="btn btn-outline-danger" type="button">Restart</button>
    </div>
  </div>

  <div class="btn-toolbar mb-3 justify-content-center" role="toolbar" aria-label="Toolbar with button groups">
    <button type="reset" class="btn btn-secondary" title="Reset to default values"><i class="fa fa-undo"
        aria-hidden="true"></i> Reset</button>
  </div>
</form>
<!-- End Horizontal Form -->
`


