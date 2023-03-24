//GLOBALSETTINGS.CalcGeomType = 'Point'; // these are not always valid
GLOBALSETTINGS.CurrentLrmNo = 2; // these are not always valid

GLOBALSETTINGS.UseLoadIndicator = 1;
GLOBALSETTINGS.PrintUrls = 0;
GLOBALSETTINGS.PrintIterations = 0;
GLOBALSETTINGS.PrintProjGeom = 0;
GLOBALSETTINGS.DemoMode = 0;
GLOBALSETTINGS.MapCursorLive = 0;

function cursorMode() {
  $("#viewDiv").css('cursor', 'crosshair');
  GLOBALSETTINGS.MapCursorLive = 1;
}

let SESSIONHISTORYARR = [];
let ONSCREENMATCH = {};


const GLOBALPROJECTDATA = {};
GLOBALPROJECTDATA.ProjectDrawParameters = [];
GLOBALPROJECTDATA.ProjectGeometry = [];
GLOBALPROJECTDATA.ProjectGeometryCache = [];
GLOBALPROJECTDATA.ProjectFeatureCollections = [];

function resetProjectDrawParameters() {
  GLOBALPROJECTDATA.ProjectDrawParameters = [];
}

function resetProjectGeometry() {
  GLOBALPROJECTDATA.ProjectGeometry = [];
}

function resetProjectFeatureCollections() {
  GLOBALPROJECTDATA.ProjectFeatureCollections = [];
}

function setProjectGeometry(someProjectGeometry) {
  GLOBALPROJECTDATA.ProjectGeometry = someProjectGeometry;
  GLOBALPROJECTDATA.ProjectGeometryCache.push(someProjectGeometry);
}


let PAGINATION = {};

PAGINATION.allResults = [];
PAGINATION.currentPagination = 1;

function resetAllResults() {
  PAGINATION.allResults = [];
}

function resetCurrentPagination() {
  PAGINATION.currentPagination = 1;
}


let graphics = [];

function resetGraphics() {
  graphics = [];
}




// add nav bar and status indicator
$(document).ready(function () {

  $("nav_bar-component").load("components/html/nav_bar.html", function (response, status, xhr) {
    if (status == "error") { $("nav_bar-component").html(staticNav_Bar); }
  });

  $("indicator-component").load("components/html/indicator.html", function (response, status, xhr) {
    if (status == "error") { $("indicator-component").html(staticIndicator); }
  });

  var url = window.location;
  $('a[href="' + url + '"]').parent().addClass("active");
  $('a').filter(function () {
    return this.href == url;
  }).parent().addClass('active');

});


// add results card
$(document).ready(function () {
  /**
    $("results_card-component").load("components/html/results_card.html", function (response, status, xhr) {
      if (status == "error") { $("results_card-component").html(staticResults_Card); }
      $("#copyRouteDFO").on('click', function () { copyRouteDFO(); });
      $("#makequeryTxDOT_Roadways_Unsegmented").on('click', function () { makequeryTxDOT_Roadways_Unsegmented(); });
      $("#copyControlSection").on('click', function () { copyControlSection(); });
      $("#copyFieldLocation").on('click', function () { copyFieldLocation(); });
      $("#copyCoordinates").on('click', function () { copyCoordinates(); });
    });
  */

  $("#copyRouteDFO").on('click', function () { copyRouteDFO(); });
  $("#makequeryTxDOT_Roadways_Unsegmented").on('click', function () { makequeryTxDOT_Roadways_Unsegmented(); });
  $("#copyControlSection").on('click', function () { copyControlSection(); });
  $("#copyFieldLocation").on('click', function () { copyFieldLocation(); });
  $("#copyCoordinates").on('click', function () { copyCoordinates(); });

});