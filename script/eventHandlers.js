
$("#convert1").on('click', function () { lrsQuery(1, 1, 'inputLatitude', 'inputLongitude'); });
$("#convert2").on('click', function () { lrsQuery(2, 1, 'inputRouteName_2', 'inputReferenceMarker', 'inputDisplacement'); });
$("#convert3").on('click', function () { lrsQuery(3, 1, 'inputControlSection', 'inputMilepointMeasure'); });
$("#convert4").on('click', function () { lrsQuery(4, 1, 'inputRouteName_4', 'inputDistanceFromOrigin'); });


$("#convert1-2point").on('click', function () { lrsDualQuery(1, 0, 'inputBeginLatitude', 'inputBeginLongitude', 'inputEndLatitude', 'inputEndLongitude'); });
$("#convert2-2point").on('click', function () { lrsDualQuery(2, 0, 'inputRouteName_2', 'inputBeginReferenceMarker', 'inputBeginDisplacement', 'inputEndReferenceMarker', 'inputEndDisplacement'); });
$("#convert3-2point").on('click', function () { lrsDualQuery(3, 0, 'inputBeginControlSection', 'inputBeginMilepointMeasure', 'inputEndControlSection', 'inputEndMilepointMeasure'); });
$("#convert4-2point").on('click', function () { lrsDualQuery(4, 0, 'inputRouteName_4', 'inputBeginDistanceFromOrigin', 'inputEndDistanceFromOrigin'); });


$(":reset").on('click', function () { clearResults(); });
$(":reset").on('click', function () { clearResultsFromMap(); });


//return to point on map
$("#returnToPoint").on('click', function () { returnToPoint(); });

//route builder
$("#addRow").on('click', function () { addProjectToArray(projectsArr); });
$("#dropRow").on('click', function () { dropLastProjectFromArray(projectsArr, projectLines); });
$("#clearRows").on('click', function () { clearProjectsFromArray(projectsArr, projectLines); });








// toggle buttons for showing/hiding layers
$('#demo-mode-toggle').change(function () {
  if ($(this).prop('checked')) {
    console.log("demo checked");
    $("#inputLatitude").val("29.39780972");
    $("#inputLongitude").val("-94.98759004");
    $("#inputRouteName_2").val("US0077-KG");
    $("#inputReferenceMarker").val("622");
    $("#inputDisplacement").val("0.065");
    $("#inputRouteName_4").val("FM1818-KG");
    $("#inputDistanceFromOrigin").val("1.606");
    $("#inputControlSection").val("012201");
    $("#inputMilepointMeasure").val("2.394");
    $("#inputBeginDistanceFromOrigin").val("59.095");
    $("#inputEndDistanceFromOrigin").val("220.951");
    $("#inputBeginLatitude").val("29.652006");
    $("#inputBeginLongitude").val("-97.659926");
    $("#inputEndLatitude").val("29.666168");
    $("#inputEndLongitude").val("-97.650841");
    $("#inputBeginReferenceMarker").val("622");
    $("#inputBeginDisplacement").val("0.065");
    $("#inputEndReferenceMarker").val("622");
    $("#inputEndDisplacement").val("0.065");
    $("#inputBeginControlSection").val("012201");
    $("#inputBeginMilepointMeasure").val("2.394");
    $("#inputEndControlSection").val("012201");
    $("#inputEndMilepointMeasure").val("2.394");

    // projectsArr is an array containing JS objects
    projectsArr = [
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
    $("#inputLatitude").val('');
    $("#inputLongitude").val('');
    $("#inputRouteName_2").val('');
    $("#inputReferenceMarker").val('');
    $("#inputDisplacement").val('');
    $("#inputRouteName_4").val('');
    $("#inputDistanceFromOrigin").val('');
    $("#inputControlSection").val('');
    $("#inputMilepointMeasure").val('');
    $("#inputBeginDistanceFromOrigin").val('');
    $("#inputEndDistanceFromOrigin").val('');
    $("#inputBeginLatitude").val('');
    $("#inputBeginLongitude").val('');
    $("#inputEndLatitude").val('');
    $("#inputEndLongitude").val('');
    $("#inputBeginReferenceMarker").val('');
    $("#inputBeginDisplacement").val('');
    $("#inputEndReferenceMarker").val('');
    $("#inputEndDisplacement").val('');
    $("#inputBeginControlSection").val('');
    $("#inputBeginMilepointMeasure").val('');
    $("#inputEndControlSection").val('');
    $("#inputEndMilepointMeasure").val('');

    resetProjects();
  }
})

// set input min-max values
$(document).ready(function () {
  console.log("setting min-max values");
  $("#inputLatitude").attr({
    "max": 37,
    "min": 24,
    "step": 0.000001
  });

  $("#inputLongitude").attr({
    "max": -93,
    "min": -107,
    "step": 0.000001
  });

  $("#inputReferenceMarker").attr({
    "max": 1000,
    "min": 0,
    "step": 1
  });

  $("#inputDisplacement").attr({
    "max": 2,
    "min": 0,
    "step": 0.001
  });

  $("#inputDistanceFromOrigin").attr({
    "max": 1000,
    "min": 0,
    "step": 0.001
  });

  $("#inputMilepointMeasure").attr({
    "max": 1000,
    "min": 0,
    "step": 0.001
  });

  $("#inputBeginDistanceFromOrigin").attr({
    "max": 1000,
    "min": 0,
    "step": 0.001
  });

  $("#inputEndDistanceFromOrigin").attr({
    "max": 1000,
    "min": 0,
    "step": 0.001
  });

  $("#inputBeginLatitude").attr({
    "max": 37,
    "min": 24,
    "step": 0.000001
  });

  $("#inputBeginLongitude").attr({
    "max": -93,
    "min": -107,
    "step": 0.000001
  });

  $("#inputEndLatitude").attr({
    "max": 37,
    "min": 24,
    "step": 0.000001
  });

  $("#inputEndLongitude").attr({
    "max": -93,
    "min": -107,
    "step": 0.000001
  });

  $("#inputBeginReferenceMarker").attr({
    "max": 1000,
    "min": 0,
    "step": 1
  });

  $("#inputBeginDisplacement").attr({
    "max": 2,
    "min": 0,
    "step": 0.001
  });

  $("#inputEndReferenceMarker").attr({
    "max": 1000,
    "min": 0,
    "step": 1
  });

  $("#inputEndDisplacement").attr({
    "max": 2,
    "min": 0,
    "step": 0.001
  });

  $("#inputBeginMilepointMeasure").attr({
    "max": 1000,
    "min": 0,
    "step": 0.001
  });

  $("#inputEndMilepointMeasure").attr({
    "max": 1000,
    "min": 0,
    "step": 0.001
  });

});








