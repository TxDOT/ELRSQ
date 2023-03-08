let CALCGEOMTYPE = 'Point'; // these are not always valid
let CURRENTLRMNO = 2; // these are not always valid

$(document).ready(function () {
  $("#topnav_point").on('click', function () { set_topnav_point(); });
  $("#topnav_route").on('click', function () { set_topnav_route(); });

  $("#btn_lrm_method_referencemarker").on('click', function () { set_lrm_method_referencemarker(); });
  $("#btn_lrm_method_controlsection").on('click', function () { set_lrm_method_controlsection(); });
  $("#btn_lrm_method_dfo").on('click', function () { set_lrm_method_dfo(); });
  $("#btn_lrm_method_coordinates").on('click', function () { set_lrm_method_coordinates(); });

  function set_topnav_point() {
    CALCGEOMTYPE = 'Point';
    console.log("setting CALCGEOMTYPE to: " + CALCGEOMTYPE);
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
    CALCGEOMTYPE = 'Route';
    console.log("setting CALCGEOMTYPE to: " + CALCGEOMTYPE);
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
    CURRENTLRMNO = 2;
    $("#kbPointInputRouteName").show();
    $("#kbPointInputReferenceMarker").show();
    $("#kbPointInputControlSection").hide();
    $("#kbPointInputDistanceFromOrigin").hide();
    $("#kbPointInputRouteName_optional").hide();
    $("#kbPointInputCoordinates").hide();

    $("#kbRouteInputRouteName").show();
    $("#kbRouteInputReferenceMarker").show();
    $("#kbRouteInputControlSection").hide();
    $("#kbRouteInputDistanceFromOrigin").hide();
    $("#kbRouteInputRouteName_optional").hide();
    $("#kbRouteInputCoordinates").hide();

    $("#csvPointInputRouteName").show();
    $("#csvPointInputReferenceMarker").show();
    $("#csvPointInputControlSection").hide();
    $("#csvPointInputDistanceFromOrigin").hide();
    $("#csvPointInputRouteName_optional").hide();
    $("#csvPointInputCoordinates").hide();

    $("#csvRouteInputRouteName").show();
    $("#csvRouteInputReferenceMarker").show();
    $("#csvRouteInputControlSection").hide();
    $("#csvRouteInputDistanceFromOrigin").hide();
    $("#csvRouteInputRouteName_optional").hide();
    $("#csvRouteInputCoordinates").hide();

    $(".referencemarker-template").show();
    $(".controlsection-template").hide();
    $(".dfo-template").hide();
    $(".coordinates-template").hide();

  }

  function set_lrm_method_controlsection() {
    CURRENTLRMNO = 3;
    $("#kbPointInputRouteName").hide();
    $("#kbPointInputReferenceMarker").hide();
    $("#kbPointInputControlSection").show();
    $("#kbPointInputDistanceFromOrigin").hide();
    $("#kbPointInputRouteName_optional").hide();
    $("#kbPointInputCoordinates").hide();

    $("#kbRouteInputRouteName").hide();
    $("#kbRouteInputReferenceMarker").hide();
    $("#kbRouteInputControlSection").show();
    $("#kbRouteInputDistanceFromOrigin").hide();
    $("#kbRouteInputRouteName_optional").hide();
    $("#kbRouteInputCoordinates").hide();

    $("#csvPointInputRouteName").hide();
    $("#csvPointInputReferenceMarker").hide();
    $("#csvPointInputControlSection").show();
    $("#csvPointInputDistanceFromOrigin").hide();
    $("#csvPointInputRouteName_optional").hide();
    $("#csvPointInputCoordinates").hide();

    $("#csvRouteInputRouteName").hide();
    $("#csvRouteInputReferenceMarker").hide();
    $("#csvRouteInputControlSection").show();
    $("#csvRouteInputDistanceFromOrigin").hide();
    $("#csvRouteInputRouteName_optional").hide();
    $("#csvRouteInputCoordinates").hide();

    $(".controlsection-template").show();
    $(".referencemarker-template").hide();
    $(".dfo-template").hide();
    $(".coordinates-template").hide();

  }

  function set_lrm_method_dfo() {
    CURRENTLRMNO = 4;
    $("#kbPointInputRouteName").show();
    $("#kbPointInputReferenceMarker").hide();
    $("#kbPointInputControlSection").hide();
    $("#kbPointInputDistanceFromOrigin").show();
    $("#kbPointInputRouteName_optional").hide();
    $("#kbPointInputCoordinates").hide();

    $("#kbRouteInputRouteName").show();
    $("#kbRouteInputReferenceMarker").hide();
    $("#kbRouteInputControlSection").hide();
    $("#kbRouteInputDistanceFromOrigin").show();
    $("#kbRouteInputRouteName_optional").hide();
    $("#kbRouteInputCoordinates").hide();

    $("#csvPointInputRouteName").show();
    $("#csvPointInputReferenceMarker").hide();
    $("#csvPointInputControlSection").hide();
    $("#csvPointInputDistanceFromOrigin").show();
    $("#csvPointInputRouteName_optional").hide();
    $("#csvPointInputCoordinates").hide();

    $("#csvRouteInputRouteName").show();
    $("#csvRouteInputReferenceMarker").hide();
    $("#csvRouteInputControlSection").hide();
    $("#csvRouteInputDistanceFromOrigin").show();
    $("#csvRouteInputRouteName_optional").hide();
    $("#csvRouteInputCoordinates").hide();

    $(".dfo-template").show();
    $(".referencemarker-template").hide();
    $(".controlsection-template").hide();
    $(".coordinates-template").hide();

  }

  function set_lrm_method_coordinates() {
    CURRENTLRMNO = 1;
    $("#kbPointInputRouteName").hide();
    $("#kbPointInputReferenceMarker").hide();
    $("#kbPointInputControlSection").hide();
    $("#kbPointInputDistanceFromOrigin").hide();
    $("#kbPointInputRouteName_optional").show();
    $("#kbPointInputCoordinates").show();

    $("#kbRouteInputRouteName").hide();
    $("#kbRouteInputReferenceMarker").hide();
    $("#kbRouteInputControlSection").hide();
    $("#kbRouteInputDistanceFromOrigin").hide();
    $("#kbRouteInputRouteName_optional").show();
    $("#kbRouteInputCoordinates").show();

    $("#csvPointInputRouteName").hide();
    $("#csvPointInputReferenceMarker").hide();
    $("#csvPointInputControlSection").hide();
    $("#csvPointInputDistanceFromOrigin").hide();
    $("#csvPointInputRouteName_optional").show();
    $("#csvPointInputCoordinates").show();

    $("#csvRouteInputRouteName").hide();
    $("#csvRouteInputReferenceMarker").hide();
    $("#csvRouteInputControlSection").hide();
    $("#csvRouteInputDistanceFromOrigin").hide();
    $("#csvRouteInputRouteName_optional").show();
    $("#csvRouteInputCoordinates").show();

    $(".coordinates-template").show();
    $(".referencemarker-template").hide();
    $(".controlsection-template").hide();
    $(".dfo-template").hide();

  }

});

$(document).ready(function () {

  $(".convert").on('click', function () {
    inputMethod = "html";
    lrsSingleQuery(CURRENTLRMNO, inputMethod);
  });


  // FIXME Bulk Upload: change to use Convert button instead of automatic

  const myDropZone = document.getElementById("bulk-fieldset");
  dragDropEventHandlers(myDropZone);


  myDropZone.addEventListener('drop', async (event) => {
    event.preventDefault();

    const file = event.dataTransfer.files[0];
    const reader = new FileReader();

    const fileContents = await readFile(file);
    inputMethod = "table";
    lrsBulkQuery(CURRENTLRMNO, fileContents, "AAdddd_dash_KG");

  });

  $(".uploadCsv-bulk").on('change', async function (e) {
    GreenToYellow();
    const fileContents = await readFile(e.target.files[0])
    YellowToGreen();
    inputMethod = "table";
    lrsBulkQuery(CURRENTLRMNO, fileContents, "AAdddd_dash_KG");
    // lrsBulkQuery(CURRENTLRMNO, fileContents, "AAdddd_dash");
  });

});