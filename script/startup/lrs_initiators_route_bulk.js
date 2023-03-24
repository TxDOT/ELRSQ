
$(document).ready(function () {
  set_topnav_route();

  $("#btn_lrm_method_referencemarker").on('click', function () { set_lrm_method_referencemarker(); });
  $("#btn_lrm_method_controlsection").on('click', function () { set_lrm_method_controlsection(); });
  $("#btn_lrm_method_dfo").on('click', function () { set_lrm_method_dfo(); });
  $("#btn_lrm_method_coordinates").on('click', function () { set_lrm_method_coordinates(); });
});

$(document).ready(function () {

  const myDropZone = document.getElementById("bulk-fieldset");
  dragDropEventHandlers(myDropZone);

  myDropZone.addEventListener('drop', async (event) => {
    event.preventDefault();

    let file = event.dataTransfer.files[0];

    const fileContents = await readFile(file);
    GLOBALSETTINGS.FileName = file.name.split('.')[0];

    file = ''; //WATCH reset file test

    GLOBALSETTINGS.InputMethod = "table";
    let convertSessionParams = new Object();
    convertSessionParams.calcGeomType = GLOBALSETTINGS.CalcGeomType;
    convertSessionParams.currentLrmNo = GLOBALSETTINGS.CurrentLrmNo;
    convertSessionParams.inputMethod = GLOBALSETTINGS.InputMethod;
    convertSessionParams.fileName = GLOBALSETTINGS.FileName;
    lrsBulkQuery(convertSessionParams, fileContents, "AAdddd_dash_KG");

  });

  $(".uploadCsv-bulk").on('change', async function (e) {

    const fileContents = await readFile(e.target.files[0]);
    GLOBALSETTINGS.FileName = e.target.files[0].name.split('.')[0];

    //e.target.files = []; //WATCH reset file test

    GLOBALSETTINGS.InputMethod = "table";
    let convertSessionParams = new Object();
    convertSessionParams.calcGeomType = GLOBALSETTINGS.CalcGeomType;
    convertSessionParams.currentLrmNo = GLOBALSETTINGS.CurrentLrmNo;
    convertSessionParams.inputMethod = GLOBALSETTINGS.InputMethod;
    convertSessionParams.fileName = GLOBALSETTINGS.FileName;
    lrsBulkQuery(convertSessionParams, fileContents, "AAdddd_dash_KG");
    //// lrsBulkQuery(convertSessionParams, fileContents, "AAdddd_dash");
  });

});


$(":reset").on('click', function () { clearResults(); });
$(":reset").on('click', function () { clearGraphicsFromMap(); });
$(":reset").on('click', function () { clearForms(); });
$(":cancel").on('click', function () { GLOBALSETTINGS.continueConversion = 0; });


$("#useCrosshairs").on('click', function () { cursorMode(); });

//return to point on map
$(".map-return").on('click', function () { returnToPoint(); });
$(".map-all").on('click', function () { showAllPoints(); });

//route builder
$("#addRow").on('click', function () { addProjectToArray_sequential(GLOBALPROJECTDATA.ProjectDrawParameters); });
$("#dropRow").on('click', function () { dropLastProjectFromArray(GLOBALPROJECTDATA.ProjectDrawParameters, GLOBALPROJECTDATA.ProjectFeatureCollections); });
$("#clearRows").on('click', function () { clearProjectsFromArray(GLOBALPROJECTDATA.ProjectDrawParameters, GLOBALPROJECTDATA.ProjectFeatureCollections); });
$("#queryProjectGeometry-button").on('click', function () { });
$("#localRouteGeoJSONToMap-button").on('click', function () { });


// toggle buttons for showing/hiding layers
$('#demo-mode-toggle').change(function () {
  if ($(this).prop('checked')) {
    GLOBALSETTINGS.DemoMode = 1;
    setDemoKeyboardInputs();

  } else {
    GLOBALSETTINGS.DemoMode = 0;
    clearDemoKeyboardInputs();
    resetProjectDrawParameters();
  }
})


// set input min-max values
$(document).ready(function () {
  setKeyboardInputValidation();
});


$(document).ready(function () {
  $("#color").on('click', function () {
    $("#colorInput").val($("#color").val());
  });

  $("#colorInput").on('change', function () {
    $("#color").val($("#colorInput").val());
  });
});

$(document).ready(function () {
  $("#width").on('click', function () {
    $("#widthInput").val($("#width").val());
  });

  $("#widthInput").on('change', function () {
    $("#width").val($("#widthInput").val());
  });
});


