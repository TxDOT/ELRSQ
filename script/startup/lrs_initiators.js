GLOBALSETTINGS.CalcGeomType = 'Point'; // these are not always valid
GLOBALSETTINGS.CurrentLrmNo = 2; // these are not always valid

$(document).ready(function () {
  $("#topnav_point").on('click', function () { set_topnav_point(); });
  $("#topnav_route").on('click', function () { set_topnav_route(); });

  $("#btn_lrm_method_referencemarker").on('click', function () { set_lrm_method_referencemarker(); });
  $("#btn_lrm_method_controlsection").on('click', function () { set_lrm_method_controlsection(); });
  $("#btn_lrm_method_dfo").on('click', function () { set_lrm_method_dfo(); });
  $("#btn_lrm_method_coordinates").on('click', function () { set_lrm_method_coordinates(); });

  function set_topnav_point() {
    GLOBALSETTINGS.CalcGeomType = 'Point';
    console.log("setting CALCGEOMTYPE to: " + GLOBALSETTINGS.CalcGeomType);
    // resetLRMVariables();

    $("#input-route-form-card").hide();
    $("#input-route-form").hide();

    $("#input-point-form-card").show();
    $("#input-point-form").show();

    $("#input-bulk-route-form-card").hide();
    $("#input-bulk-route-form").hide();

    $("#input-bulk-point-form-card").show();
    $("#input-bulk-point-form").show();

    $("#results-table-route-card").hide();
    $("#results-table-point-card").show();

    $("#bulk-route-templates-toolbar").hide();
    $("#bulk-point-templates-toolbar").show();

  }

  function set_topnav_route() {
    GLOBALSETTINGS.CalcGeomType = 'Route';
    console.log("setting CALCGEOMTYPE to: " + GLOBALSETTINGS.CalcGeomType);
    // resetLRMVariables();
    
    $("#input-point-form-card").hide();
    $("#input-point-form").hide();

    $("#input-route-form-card").show();
    $("#input-route-form").show();

    $("#input-bulk-point-form-card").hide();
    $("#input-bulk-point-form").hide();

    $("#input-bulk-route-form-card").show();
    $("#input-bulk-route-form").show();

    $("#results-table-point-card").hide();
    $("#results-table-route-card").show();

    $("#bulk-point-templates-toolbar").hide();
    $("#bulk-route-templates-toolbar").show();

  }

  function set_lrm_method_referencemarker() {
    GLOBALSETTINGS.CurrentLrmNo = 2;
    resetLRMVariables();
    
    $("#kbPointInputRouteName").show();
    $("#kbPointInputReferenceMarker").show();

    $("#kbRouteInputRouteName").show();
    $("#kbRouteInputReferenceMarker").show();

    $("#csvPointInputRouteName").show();
    $("#csvPointInputReferenceMarker").show();

    $("#csvRouteInputRouteName").show();
    $("#csvRouteInputReferenceMarker").show();

    $(".referencemarker-template").show();
  }

  function set_lrm_method_controlsection() {
    GLOBALSETTINGS.CurrentLrmNo = 3;
    resetLRMVariables();
    
    $("#kbPointInputControlSection").show();

    $("#kbRouteInputControlSection").show();

    $("#csvPointInputControlSection").show();

    $("#csvRouteInputControlSection").show();

    $(".controlsection-template").show();
  }

  function set_lrm_method_dfo() {
    GLOBALSETTINGS.CurrentLrmNo = 4;
    resetLRMVariables();
    
    $("#kbPointInputRouteName").show();
    $("#kbPointInputDistanceFromOrigin").show();

    $("#kbRouteInputRouteName").show();
    $("#kbRouteInputDistanceFromOrigin").show();

    $("#csvPointInputRouteName").show();
    $("#csvPointInputDistanceFromOrigin").show();

    $("#csvRouteInputRouteName").show();
    $("#csvRouteInputDistanceFromOrigin").show();

    $(".dfo-template").show();
  }

  function set_lrm_method_coordinates() {
    GLOBALSETTINGS.CurrentLrmNo = 1;
    resetLRMVariables();
    
    $("#kbPointInputRouteName_optional").show();
    $("#kbPointInputCoordinates").show();

    $("#kbRouteInputRouteName_optional").show();
    $("#kbRouteInputCoordinates").show();

    $("#csvPointInputRouteName_optional").show();
    $("#csvPointInputCoordinates").show();

    $("#csvRouteInputRouteName_optional").show();
    $("#csvRouteInputCoordinates").show();

    $(".coordinates-template").show();
  }

});

$(document).ready(function () {

  $(".convert").on('click', function () {
    GLOBALSETTINGS.InputMethod = "html";
    lrsSingleQuery();
  });


  // FIXME Bulk Upload: change to use Convert button instead of automatic

  const myDropZone = document.getElementById("bulk-fieldset");
  dragDropEventHandlers(myDropZone);

  myDropZone.addEventListener('drop', async (event) => {
    event.preventDefault();

    const file = event.dataTransfer.files[0];
    const reader = new FileReader();

    const fileContents = await readFile(file);
    GLOBALSETTINGS.InputMethod = "table";
    lrsBulkQuery(fileContents, "AAdddd_dash_KG");

  });

  $(".uploadCsv-bulk").on('change', async function (e) {
    GreenToYellow();
    const fileContents = await readFile(e.target.files[0])
    YellowToGreen();
    GLOBALSETTINGS.InputMethod = "table";
    lrsBulkQuery(fileContents, "AAdddd_dash_KG");
    // lrsBulkQuery(fileContents, "AAdddd_dash");
  });

});