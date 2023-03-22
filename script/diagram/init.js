//Canvas setup locations
var BORDERPADDINGX_px = 150;
var BORDERPADDINGY_px = 50;
var CHARTWIDTH_px;
var CHARTHEIGHT_px;

//Attribute variables
var MAINROADWAYLINEY_px = 150;
var INITIALATTRIBUTEY_px = 285;
var ATTRIBUTEYSPACING_px = 55;
var DIAGRAMLENPIXELS_px = 0;
var PIXELSPERMILE = 0;


function getYBaseline(lineNo) { let ybase = INITIALATTRIBUTEY_px + (lineNo * ATTRIBUTEYSPACING_px); return ybase; }
function calcLeftLimit() { return BORDERPADDINGX_px; }
function calcRightLimit() { return CHARTWIDTH_px - BORDERPADDINGY_px; }
function calcDiagramLen() { return calcRightLimit() - calcLeftLimit(); }

function calcMiToPixOffset(mi) { return (BORDERPADDINGX_px + (mi) * PIXELSPERMILE); }

function limitOffsetBeg(offsetBeg_mi) { return Math.max(calcMiToPixOffset(offsetBeg_mi), calcLeftLimit()); }

function limitOffsetEnd(offsetEnd_mi) { return Math.min(calcMiToPixOffset(offsetEnd_mi), calcRightLimit()); }

function setDiagramScale(diagramDFOBeg_mi, diagramDFOEnd_mi) {
  DIAGRAMLENMILES_MI = diagramDFOEnd_mi - diagramDFOBeg_mi;
  PIXELSPERMILE = calcDiagramLen() / DIAGRAMLENMILES_MI;
}

function adjustApp() {
  document.getElementById("index").style.display = "block";
  document.getElementById("index").style.top = "0px";
  document.getElementById("index").style.height = "480px";
  document.getElementById("index").style.left = "0px";
  document.getElementById("index").style.width = "400px";


  document.getElementById("content").style.display = "block";
  document.getElementById("content").style.top = "0px";
  document.getElementById("content").style.height = "480px";
  document.getElementById("content").style.left = "400px";
  document.getElementById("content").style.width = "1200px";
}




//Diagram Specifications
let DIAGRAMRANGE = {};
let DIAGRAMSPECS = {};

let DIAGRAMLENMILES_MI = 0;

async function fastSRD(diagramRteNm, diagramDFOBeg_mi, diagramDFOEnd_mi) {
  console.log(diagramRteNm, diagramDFOBeg_mi, diagramDFOEnd_mi);

  let roadwayObj = checkLRMInputs(diagramRteNm, diagramDFOBeg_mi, diagramDFOEnd_mi);
  DIAGRAMRANGE.roadway = roadwayObj;

  let drawing = {};

  drawing.getRouteAttributesObj = await getRouteAttributes("TxDOT_Roadways_Unsegmented", "RTE_NM", roadwayObj.routename);
  drawing.addControlSectionsObj = await addControlSections("TxDOT_Control_Sections", "CTRL_SECT_NBR", "Control Sections", 0);
  drawing.addFeatAttrPointObj = await addFeatAttrPoint("TxDOT_Reference_Markers_SRD", "MRKR_NBR", "Reference Markers", 1);
  drawing.addFeatAttrBandObj = await addFeatAttrBand("TxDOT_Route_County_SRD", "CNTY_NM", "County", 2, 0);
  drawing.addConcurrencyObj = await addConcurrency("service", "servicefield", "Concurrency", drawing.getRouteAttributesObj.dfoGapArr, 3, 1);

  return drawing;
}

function drawSRD(drawing) {
  drawDiagramBaseAndTitle(DIAGRAMRANGE.roadway.routename);
  buildDfoAxis(DIAGRAMRANGE.roadway.dfo_fm, DIAGRAMRANGE.roadway.dfo_to);
  buildMptAxis();
  drawMultiControlSections(drawing.addControlSectionsObj.bands);
  drawFeatAttrMarks("Reference Markers", 1, drawing.addFeatAttrPointObj.marks);
  drawFeatAttrBands("County", 2, drawing.addFeatAttrBandObj.bands);
  drawFeatAttrBands("Concurrency", 3, drawing.addConcurrencyObj.bands);

  let imagedata = document.getElementById("srdCanvas").toDataURL("image/png");
  document.getElementById("img").src = imagedata;
}


function checkLRMInputs(diagramRteNm, diagramDFOBeg_mi, diagramDFOEnd_mi) {
  setDiagramBase();
  clearDrawings();

  /**
    var diagramRteNm = document.getElementById("inpRouteID").value;
    var diagramDFOBeg_mi = Number(document.getElementById("inpFromDFO").value);
    var diagramDFOEnd_mi = Number(document.getElementById("inpToDFO").value);
  */
  /**
    var diagramRteNm = "FM0051-KG";
    var diagramDFOBeg_mi = Number(0);
    var diagramDFOEnd_mi = Number(122.667);
  */

  setDiagramScale(diagramDFOBeg_mi, diagramDFOEnd_mi);

  var theLRM = "";

  if (diagramRteNm.length == 8 && isNaN(diagramRteNm) == true && diagramRteNm.indexOf(" ") < 0) { theLRM = "DFO"; }
  else if (diagramRteNm.length == 9 && isNaN(diagramRteNm) == true && diagramRteNm.indexOf(" ") < 0) { theLRM = "DFO"; }
  else if (diagramRteNm.length == 10 && isNaN(diagramRteNm) == true && diagramRteNm.indexOf(" ") < 0) { theLRM = "DFO"; }
  else { alert("Unrecognized Roadway ID, please try again."); return; }

  //Add roadway inputs to diagram specs
  return { "routename": diagramRteNm, "dfo_fm": diagramDFOBeg_mi, "dfo_to": diagramDFOEnd_mi, "theLRM": theLRM };
}





async function new_xmlRequestWithProcessing(theService) {
  const response = await fetch(theService, { method: 'POST' });
  return response.json(); // parses JSON response into native JavaScript objects
}

function queryRoadwayfromService(theServiceName, theField, theAttribute, theFields, theOrder) {
  var theRequest = theServiceName + "/query?f=json&where=" + theField + "='" + theAttribute +
    "'&outFields=" + theFields + "returnGeometry=true&outSR=4326" + "&orderByFields=" + theOrder;
  return theRequest;
}

async function queryRoadwayService(url) {
  const response = await fetch(url, { method: 'GET', });
  return response.json(); // parses JSON response into native JavaScript objects
}

function queryRecordFromService(theServiceName, theQuery, theOrder, theFields) {
  var theRequest = theServiceName + "/query?f=json&orderByFields=" + theOrder + "&returnGeometry=false&where=" + theQuery + "&outFields=" + theFields;
  return theRequest;
}



function getSegmentDfoRange(results) {
  let min_DFO = results.features[0].attributes.BEGIN_DFO;
  let max_DFO = results.features.last().attributes.END_DFO;
  if (DIAGRAMRANGE.roadway.dfo_to > max_DFO) { console.log(`Entered end DFO exceeds roadway end DFO of ${max_DFO}`); }
  return { "min_DFO": min_DFO, "max_DFO": max_DFO };
}

function getDfoGapArr(results) {
  let attributes_Arr = _.map(results.features, _.property('attributes'));
  let geometry_Arr = _.map(results.features, _.property('geometry'));

  let dfoGaps_Arr = [];
  for (let i = 1; i < attributes_Arr.length; i = i + 1) {
    let gap = {};
    gap.BDFO = attributes_Arr[i - 1].END_DFO;
    gap.EDFO = attributes_Arr[i].BEGIN_DFO;
    gap.bpoint = geometry_Arr[i - 1].paths[0].last();
    gap.epoint = geometry_Arr[i].paths[0][0];
    gap.width = roundToDecimalPlace(gap.EDFO - gap.BDFO, 3);
    dfoGaps_Arr.push(gap);
  }
  return dfoGaps_Arr;
}

async function getConcurrenciesByLatLon(routeName, lat, lon) {
  let tolerance = 0.0008;

  xmin = (parseFloat(lon) - tolerance);
  xmax = (parseFloat(lon) + tolerance);
  ymin = (parseFloat(lat) - tolerance);
  ymax = (parseFloat(lat) + tolerance);

  point = `{"xmin":${xmin},"ymin":${ymin},"xmax":${xmax},"ymax":${ymax},"spatialReference":{"wkid":4326}}`
  encodedpoint = encodeURIComponent(point);

  url = `https://services.arcgis.com/KTcxiTD9dsQw4r7Z/arcgis/rest/services/TxDOT_Concurrencies/FeatureServer/0/query?f=json&` +
    `where=RTE_NM%3D%27${routeName}%27&` +
    `geometry=${encodedpoint}&geometryType=esriGeometryEnvelope&inSR=4326&spatialRel=esriSpatialRelIntersects&` +
    `outFields=*&returnGeometry=false`

  results = await queryRoadwayService(url);
  return results;
}

