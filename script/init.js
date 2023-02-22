let currentSelection = [];
let allResults = [];
let currentPos = 1;
let graphics = [];
//let projects = [];
var projectLines = [];


function resetGraphics() {
  graphics = []; //this is an experiment
}

function resetCurrentPos() {
  currentPos = 1;
}



let projects = [
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

  // FIXME Bulk Upload: change to use Convert button instead of automatic
  const myDropZone = document.getElementById("bulk-fieldset");
  eventHandlers(myDropZone);

  document.getElementById("bulk-fieldset").addEventListener('drop', async function (e) {
    console.log(e.dataTransfer.files[0]);
    const fileContents = await readFile(e.dataTransfer.files[0])
    thenConvertCSVByMethod(fileContents);
  });

  document.getElementById("upload_csv-bulk").addEventListener('change', async function (e) {
    const fileContents = await readFile(e.target.files[0])
    thenConvertCSVByMethod(fileContents);
  });

});



// drag and drop event handlers
function eventHandlers(zone) {
  // Prevent default drag behaviors
  ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(event => {
    zone.addEventListener(event, preventDefaults, false);
    document.body.addEventListener(event, preventDefaults, false);
  });

  // Highlighting drop area when item is dragged over it
  ;['dragenter', 'dragover'].forEach(event => {
    zone.addEventListener(event, highlight, false);
  });
  ;['dragleave', 'drop'].forEach(event => {
    zone.addEventListener(event, unhighlight, false);
  });
}

function preventDefaults(event) {
  event.preventDefault();
  event.stopPropagation();
};

function highlight(event) {
  event.target.classList.add('highlight');
}

function unhighlight(event) {
  event.target.classList.remove('highlight');
}