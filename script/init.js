let currentSelection = [];
let allResults = [];
let currentPos = 1;
let graphics = [];
let projects = [];
var projectLines = [];


function resetGraphics() {
  graphics = []; //this is an experiment
}

function resetCurrentPos() {
  currentPos = 1;
}



/*let projects = [
    [
        "IH0035-KG",
        "121.243",
        "149.576",
        "#ff8000",
        4,
        "35"
    ],
    [
        "IH0045-KG",
        "1.243",
        "9.576",
        "#ff8000",
        4,
        "45"
    ],
    [
        "IH0010-KG",
        "500",
        "600",
        "#ff8000",
        4,
        "10"
    ]
]*/


if (screen.width >= 768) {
  const GUTTER_SIZE = 30;
  Split(['#split-0', '#split-1'], {
    sizes: [33, 66],
    minSize: [300, 400],
    expandToMin: false
  });
}





$(document).ready(function () {
  console.log("doc ready");

  $("nav_bar-component").load("components/html/nav_bar.html", function (response, status, xhr) {
    if (status == "error") { $("nav_bar-component").html(staticNav_Bar); }
  });

  $("indicator-component").load("components/html/indicator.html", function (response, status, xhr) {
    if (status == "error") { $("indicator-component").html(staticIndicator); }
  });

  $("results_card-component").load("components/html/results_card.html", function (response, status, xhr) {
    if (status == "error") { $("results_card-component").html(staticResults_Card); }
    $("#copyRouteDFO").on('click', function () { copyRouteDFO(); });
    $("#makequeryTxDOT_Roadways_Unsegmented").on('click', function () { makequeryTxDOT_Roadways_Unsegmented(); });
    $("#copyControlSection").on('click', function () { copyControlSection(); });
    $("#copyFieldLocation").on('click', function () { copyFieldLocation(); });
    $("#copyCoordinates").on('click', function () { copyCoordinates(); });
  });

  $("wizard_form-component").load("components/html/wizard_form.html", function (response, status, xhr) {
    if (status == "error") { $("wizard_form-component").html(staticWizard_Form); }
    $("#missingControlSection").on('click', function () { noControlSection(); });
    $("#convert3-wizard").on('click', function () { lrsQuery(3, 0, 'wizinputControlSection', 'wizinputMilepointMeasure'); });
    $("#missingMilepointMeasure").on('click', function () { noMilepointMeasure(); });
    $("#missingRouteName").on('click', function () { noRouteName(); });
    $("#conver4-wizard").on('click', function () { lrsQuery(4, 0, 'wizinputRouteName', 'wizinputDistanceFromOrigin'); });
    $("#missingDistanceFromOrigin").on('click', function () { noDistanceFromOrigin(); });
    $("#convert2-wizard").on('click', function () { lrsQuery(2, 0, 'wizinputRouteName', 'wizinputReferenceMarker', 'wizinputDisplacement'); });
    $("#missingReferenceMarker").on('click', function () { noReferenceMarker(); });
    $("#convert1-wizard").on('click', function () { lrsQuery(1, 0, 'wizinputLatitude', 'wizinputLongitude'); });
    $("#missingCoordinates").on('click', function () { restartWizard(); });
  });

});