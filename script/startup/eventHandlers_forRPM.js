let MAPCURSORLIVE = 0;

$(":reset").on('click', function () { clearResults(); });
$(":reset").on('click', function () { clearResultsFromMap(); });
$(":reset").on('click', function () { clearForms(); });

function clearForms() {
  $("#input-bulk-point-form").trigger("reset");
  $("#input-bulk-route-form").trigger("reset");
  $("#input-point-form").trigger("reset");
  $("#input-route-form").trigger("reset");
  $("#style-form").trigger("reset");
}

$("#useCrosshairs").on('click', function () { cursorMode(); });

function cursorMode() {
  $("#viewDiv").css('cursor', 'crosshair');
  MAPCURSORLIVE = 1;
}

//return to point on map
$(".map-return").on('click', function () { returnToPoint(); });
$(".map-all").on('click', function () { showAllPoints(); });

//route builder
$("#addRow").on('click', function () { addProjectToArray(PROJECTSARR); });
$("#dropRow").on('click', function () { dropLastProjectFromArray(PROJECTSARR, PROJECTLINES); });
$("#clearRows").on('click', function () { clearProjectsFromArray(PROJECTSARR, PROJECTLINES); });


// toggle buttons for showing/hiding layers
$('#demo-mode-toggle').change(function () {
  if ($(this).prop('checked')) {
    console.log("demo checked");

    $("#kbInputRouteName_2").val("US0077-KG");
    $("#kbInputReferenceMarker").val("622");
    $("#kbInputDisplacement").val("0.065");

    $("#kbInputRouteName_4").val("FM1818-KG");
    $("#kbInputDistanceFromOrigin").val("1.606");

    $("#kbInputControlSection").val("012201");
    $("#kbInputMilepointMeasure").val("2.394");

    $("#kbInputLatitude").val("29.397809");
    $("#kbInputLongitude").val("-94.987590");

    $("#kbInputRouteName_4").val("FM1818-KG");
    $("#kbInputDistanceFromOrigin").val("1.606");


    $("#kbInputBeginReferenceMarker").val("622");
    $("#kbInputBeginDisplacement").val("0.065");
    $("#kbInputEndReferenceMarker").val("622");
    $("#kbInputEndDisplacement").val("0.065");

    $("#kbInputBeginControlSection").val("012201");
    $("#kbInputBeginMilepointMeasure").val("2.394");
    $("#kbInputEndControlSection").val("012201");
    $("#kbInputEndMilepointMeasure").val("2.394");

    $("#kbInputBeginDistanceFromOrigin").val("59.095");
    $("#kbInputEndDistanceFromOrigin").val("220.951");

    $("#kbInputBeginLatitude").val("29.652006");
    $("#kbInputBeginLongitude").val("-97.659926");
    $("#kbInputEndLatitude").val("29.666168");
    $("#kbInputEndLongitude").val("-97.650841");

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



  } else {
    console.log("demo unchecked");

    $(".latitude").val('');
    $(".longitude").val('');
    $(".referencemarker").val('');
    $(".displacement").val('');
    $(".dfo").val('');
    $(".controlsection").val('');
    $(".milepointmeasure").val('');
    $(".routename").val('');

    resetProjects();
  }
})


// set input min-max values
$(document).ready(function () {
  console.log("setting min-max values");
  $(".latitude").attr({
    "max": 37,
    "min": 24,
    "step": 0.000001
  });

  $(".longitude").attr({
    "max": -93,
    "min": -107,
    "step": 0.000001
  });

  $(".referencemarker").attr({
    "max": 1000,
    "min": 0,
    "step": 1
  });

  $(".displacement").attr({
    "max": 2,
    "min": 0,
    "step": 0.001
  });

  $(".dfo").attr({
    "max": 1000,
    "min": 0,
    "step": 0.001
  });

  $(".milepointmeasure").attr({
    "max": 1000,
    "min": 0,
    "step": 0.001
  });

});


