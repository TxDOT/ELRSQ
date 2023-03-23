// BEGIN CONVERT-SESSION level reset

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

  // $("#results-table-route-card").hide();
  // $("#results-table-point-card").show();

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

  // $("#results-table-point-card").hide();
  // $("#results-table-route-card").show();

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

  $("#kbPointInputRouteName_optional").hide(); //FIXME hiding this until it is needed
  $("#kbPointInputCoordinates").show();

  $("#kbRouteInputRouteName_optional").hide(); //FIXME hiding this until it is needed
  $("#kbRouteInputCoordinates").show();

  $("#csvPointInputRouteName_optional").show();
  $("#csvPointInputCoordinates").show();

  $("#csvRouteInputRouteName_optional").show();
  $("#csvRouteInputCoordinates").show();

  $(".coordinates-template").show();
}

// END CONVERT-SESSION level reset



function clearForms() {
  $("#input-bulk-point-form").trigger("reset");
  $("#input-bulk-route-form").trigger("reset");
  $("#input-point-form").trigger("reset");
  $("#input-route-form").trigger("reset");
  $("#style-form").trigger("reset");

  $("#bulk-point-templates-toolbar").show();
  $("#modal-upload").show();
  $("#input-bulk-point-form-card").show();

  $("#DownloadCard").hide();
  $("#PaginationCard").hide();
  $("#results-table-route-card").hide();
  $("#results-table-point-card").hide();

}

function resetLRMVariables() {
  clearResults();
  clearGraphicsFromMap();
  clearForms();
  resetDropdowns();
  resetKeyboard();
  resetBulkUpload();
  resetTemplates();

  if (GLOBALSETTINGS.DemoMode == 1) {
    setDemoKeyboardInputs();
  }
}

function setDemoKeyboardInputs() {
  $("#kbInputRouteName").val("US0077-KG");
  $("#kbInputReferenceMarker").val("622");
  $("#kbInputDisplacement").val("0.065");

  //$("#kbInputRouteName_4").val("FM1818-KG");
  $("#kbInputDistanceFromOrigin").val("1.606");

  $("#kbInputControlSection").val("012201");
  $("#kbInputMilepointMeasure").val("2.394");

  $("#kbInputLatitude").val("29.397809");
  $("#kbInputLongitude").val("-94.987590");

  $("#kbInputRouteName_2").val("FM0060-KG");
  $("#kbInputBeginReferenceMarker").val("624");
  $("#kbInputBeginDisplacement").val("1.362");
  $("#kbInputEndReferenceMarker").val("632");
  $("#kbInputEndDisplacement").val("1.950");

  $("#kbInputBeginControlSection").val("012201");
  $("#kbInputBeginMilepointMeasure").val("2.394");
  $("#kbInputEndMilepointMeasure").val("2.394");

  $("#kbInputBeginDistanceFromOrigin").val("59.095");
  $("#kbInputEndDistanceFromOrigin").val("220.951");

  $("#kbInputBeginLatitude").val("29.652006");
  $("#kbInputBeginLongitude").val("-97.659926");
  $("#kbInputEndLatitude").val("29.666168");
  $("#kbInputEndLongitude").val("-97.650841");
}

function clearDemoKeyboardInputs() {
  $(".latitude").val('');
  $(".longitude").val('');
  $(".referencemarker").val('');
  $(".displacement").val('');
  $(".dfo").val('');
  $(".controlsection").val('');
  $(".milepointmeasure").val('');
  $(".routename").val('');
}

function setKeyboardInputValidation() {
  $(".latitude").attr({
    "max": 37,
    "min": 24,
    "step": 0.000001,
    "placeholder": 29.652006
  });

  $(".longitude").attr({
    "max": -93,
    "min": -107,
    "step": 0.000001,
    "placeholder": -97.659926
  });

  $(".referencemarker").attr({
    "max": 1000,
    "min": 0,
    "step": 1,
    "placeholder": 622
  });

  $(".displacement").attr({
    "max": 2,
    "min": 0,
    "step": 0.001,
    "placeholder": 0.065
  });

  $(".dfo").attr({
    "max": 1000,
    "min": 0,
    "step": 0.001,
    "placeholder": 1.606
  });

  $(".milepointmeasure").attr({
    "max": 1000,
    "min": 0,
    "step": 0.001,
    "placeholder": 2.394
  });


  $(".controlsection").attr({
    "placeholder": "012201"
  });

  $(".routename").attr({
    "placeholder": "FM0060-KG"
  });

}

function setDemoProjectData() {
  // PROJECTSARR is an array containing JS objects

  PROJECTSARR = [
    {
      RTE_NM: "IH0035-KG",
      BDFO: "121.243",
      EDFO: "149.576",
      Color: "#ff8000",
      Width: 4,
      Desc: "35"
    },
    {
      RTE_NM: "IH0045-KG",
      BDFO: "1.243",
      EDFO: "9.576",
      Color: "#ff8000",
      Width: 4,
      Desc: "45"
    },
    {
      RTE_NM: "IH0010-KG",
      BDFO: "500.01",
      EDFO: "600.01",
      Color: "#ff8000",
      Width: 4,
      Desc: "10"
    }
  ];
}

function resetDropdowns() {
  dropDownDepopulator("#bcontrolsection_field");
  dropDownDepopulator("#bdfo_field");
  dropDownDepopulator("#bdisplacement_field");
  dropDownDepopulator("#blat_field");
  dropDownDepopulator("#blon_field");
  dropDownDepopulator("#bmilepoint_field");
  dropDownDepopulator("#breferencemarker_field");
  dropDownDepopulator("#controlsection_field");
  dropDownDepopulator("#dfo_field");
  dropDownDepopulator("#displacement_field");
  dropDownDepopulator("#edfo_field");
  dropDownDepopulator("#edisplacement_field");
  dropDownDepopulator("#elat_field");
  dropDownDepopulator("#elon_field");
  dropDownDepopulator("#emilepoint_field");
  dropDownDepopulator("#ereferencemarker_field");
  dropDownDepopulator("#lat_field");
  dropDownDepopulator("#lon_field");
  dropDownDepopulator("#milepoint_field");
  dropDownDepopulator("#point_rte_nm_field");
  dropDownDepopulator("#referencemarker_field");
  dropDownDepopulator("#route_rte_nm_field");
  dropDownDepopulator("#rte_nm_field");
}

function resetKeyboard() {
  $("#kbPointInputControlSection").hide();
  $("#kbPointInputCoordinates").hide();
  $("#kbPointInputDistanceFromOrigin").hide();
  $("#kbPointInputReferenceMarker").hide();
  $("#kbPointInputRouteName_optional").hide();
  $("#kbPointInputRouteName").hide();
  $("#kbRouteInputControlSection").hide();
  $("#kbRouteInputCoordinates").hide();
  $("#kbRouteInputDistanceFromOrigin").hide();
  $("#kbRouteInputReferenceMarker").hide();
  $("#kbRouteInputRouteName_optional").hide();
  $("#kbRouteInputRouteName").hide();
}

function resetBulkUpload() {
  $("#csvPointInputControlSection").hide();
  $("#csvPointInputCoordinates").hide();
  $("#csvPointInputDistanceFromOrigin").hide();
  $("#csvPointInputReferenceMarker").hide();
  $("#csvPointInputRouteName_optional").hide();
  $("#csvPointInputRouteName").hide();
  $("#csvRouteInputControlSection").hide();
  $("#csvRouteInputCoordinates").hide();
  $("#csvRouteInputDistanceFromOrigin").hide();
  $("#csvRouteInputReferenceMarker").hide();
  $("#csvRouteInputRouteName_optional").hide();
  $("#csvRouteInputRouteName").hide();
}

function resetTemplates() {
  $(".controlsection-template").hide();
  $(".coordinates-template").hide();
  $(".dfo-template").hide();
  $(".referencemarker-template").hide();
}


function resetProgressAndDownloads() {
  zeroProgressBar();
  $("#convert-download-bar").hide();
  $("#convert-progress-bar").hide();

  $(".tabular-download").hide();
  $(".tabular-download").removeAttr('href');
  $(".tabular-download").removeAttr('download');
}




function updateProgressBar(aCurrentRow, total) {
  console.log("updateProgressBar");

  let progress = Math.round(100 * aCurrentRow / total);
  let widthstring = progress.toString() + "%";

  $(".progress-bar").css("width", widthstring);
  $(".progress-bar").html(widthstring);

}


function zeroProgressBar() {

  let progress = 0;
  let widthstring = progress.toString() + "%";

  $(".progress-bar").css("width", widthstring);
  $(".progress-bar").html(widthstring);

}






