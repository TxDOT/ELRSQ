GLOBALSETTINGS.CalcGeomType = 'Point'; // these are not always valid
GLOBALSETTINGS.CurrentLrmNo = 2; // these are not always valid

GLOBALSETTINGS.UseLoadIndicator = 1;
GLOBALSETTINGS.PrintUrls = 1;
GLOBALSETTINGS.PrintIterations = 0;
GLOBALSETTINGS.PrintProjGeom = 0;
GLOBALSETTINGS.DemoMode = 0;
GLOBALSETTINGS.MapCursorLive = 0;

// TODO this changes a global variable
function cursorMode() {
  $("#viewDiv").css('cursor', 'crosshair');
  GLOBALSETTINGS.MapCursorLive = 1;
}


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

//FIXME add caching by making this a push
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


//screen pane slider

if (GLOBALSETTINGS.UseMap == 1) {

  if (screen.width >= 768) {
    const GUTTER_SIZE = 30;
    Split(['#split-0', '#split-1'], {
      sizes: [33, 66],
      minSize: [300, 400],
      expandToMin: false
    });
  }

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