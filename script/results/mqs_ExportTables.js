// 1) tabularPointsConvertExport

function tabularPointsConvertExport(resultsArr, fieldnames) {

  $("#DownloadCard").show();
  $("#convert-download-bar").show();
  $("#convert-progress-bar").hide();

  if (GLOBALSETTINGS.InputMethod == "html") {
    btn_suffix = "Main";
  } else if (GLOBALSETTINGS.InputMethod == "table") {
    btn_suffix = "Modal";
  }

  exportPointsToCsvFile(resultsArr, fieldnames, btn_suffix);
  exportPointsToGeoJsonFile(resultsArr, btn_suffix);
  exportPointsToKMLFile(resultsArr, btn_suffix);
}

// 2) tabularRoutesConvertExport

function tabularRoutesConvertExport(resultsArr, fieldnames) {
  $("#DownloadCard").show();
  $("#convert-download-bar").show();
  $("#convert-progress-bar").hide();

  if (GLOBALSETTINGS.InputMethod == "html") {
    btn_suffix = "Main";
  } else if (GLOBALSETTINGS.InputMethod == "table") {
    btn_suffix = "Modal";
  }

  exportRoutesToCsvFile(resultsArr, fieldnames, btn_suffix);
  exportRoutesToGeoJsonFile(resultsArr, btn_suffix);
  exportRoutesToKMLFile(resultsArr, btn_suffix);
}






// 1a) exportPointsToCsvFile

function exportPointsToCsvFile(resultsArr, fieldnames, btn_suffix) {

  let fieldnames_rtenm = exportFields.point_rtenm;
  let fieldnames_controlsection = ($('#outputControlSection').is(':checked')) ? exportFields.point_controlsection : [];
  let fieldnames_fieldlocation = ($('#outputFieldLocation').is(':checked')) ? exportFields.point_fieldlocation : [];
  let fieldnames_coordinates = ($('#outputCoordinates').is(':checked')) ? exportFields.point_coordinates : [];
  let fieldorder = [...fieldnames, ...fieldnames_rtenm, ...fieldnames_controlsection, ...fieldnames_fieldlocation, ...fieldnames_coordinates];


  let unparsed = Papa.unparse({ fields: fieldorder, data: resultsArr });
  let dataUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(unparsed);
  let exportFileDefaultName = GLOBALSETTINGS.FileName + 'pointresults.csv';

  $("#CSVdownload" + btn_suffix).show();
  $("#CSVdownload" + btn_suffix).attr('href', dataUri);
  $("#CSVdownload" + btn_suffix).attr('download', exportFileDefaultName);
}

// 2a) exportRoutesToCsvFile

function exportRoutesToCsvFile(resultsArr, fieldnames, btn_suffix) {

  let fieldnames_rtenm = exportFields.route_rtenm;
  let fieldnames_controlsection = ($('#outputControlSection').is(':checked')) ? exportFields.route_controlsection : [];
  let fieldnames_fieldlocation = ($('#outputFieldLocation').is(':checked')) ? exportFields.route_fieldlocation : [];
  let fieldnames_coordinates = ($('#outputCoordinates').is(':checked')) ? exportFields.route_coordinates : [];
  let fieldorder = [...fieldnames, ...fieldnames_rtenm, ...fieldnames_controlsection, ...fieldnames_fieldlocation, ...fieldnames_coordinates];

  let unparsed = Papa.unparse({ fields: fieldorder, data: resultsArr });
  let dataUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(unparsed);
  let exportFileDefaultName = GLOBALSETTINGS.FileName + 'routeresults.csv';

  $("#CSVdownload" + btn_suffix).show();
  $("#CSVdownload" + btn_suffix).attr('href', dataUri);
  $("#CSVdownload" + btn_suffix).attr('download', exportFileDefaultName);
}






// 1b) exportPointsToGeoJsonFile

function exportPointsToGeoJsonFile(resultsArr, btn_suffix) {
  var geojson = jsonFromLrsApiToPointGeoJson(resultsArr)
  let dataStr = JSON.stringify(geojson);
  let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
  let exportFileDefaultName = 'pointresults.json';

  // let linkElement = document.getElementById('JSONdownload' + btn_suffix);
  // linkElement.setAttribute('href', dataUri);
  // linkElement.setAttribute('download', exportFileDefaultName);
  $("#JSONdownload" + btn_suffix).show();
  $("#JSONdownload" + btn_suffix).attr('href', dataUri);
  $("#JSONdownload" + btn_suffix).attr('download', exportFileDefaultName);
}

// 1c) exportPointsToKMLFile

function exportPointsToKMLFile(resultsArr, btn_suffix) {
  var kmlContent = jsonToKML(resultsArr)
  let dataUri = encodeURI(kmlContent);
  let exportFileDefaultName = 'pointresults.kml';

  // let linkElement = document.getElementById('KMLdownload' + btn_suffix);
  // linkElement.setAttribute('href', dataUri);
  // linkElement.setAttribute('download', exportFileDefaultName);
  $("#KMLdownload" + btn_suffix).show();
  $("#KMLdownload" + btn_suffix).attr('href', dataUri);
  $("#KMLdownload" + btn_suffix).attr('download', exportFileDefaultName);
}


// 1ci) jsonToKML

function jsonToKML(resultsArr) {
  // build kml file
  var headerTags = `<?xml version='1.0' encoding='UTF-8'?>
    <kml xmlns='http://www.opengis.net/kml/2.2'>
    <Document id='Results'>
    <visibility>1</visibility>
    <open>1</open>`;
  var closingTags = `</Document></kml>`;

  //Loop of results
  var kmlContent = "data:text/kml;charset=utf-8,";
  kmlContent += headerTags;

  for (var i = 0; i < resultsArr.length; i++) {
    var RTE_DEFN_LN_NM = resultsArr[i].RTE_DEFN_LN_NM;
    var LON = resultsArr[i].LON;
    var LAT = resultsArr[i].LAT;

    kmlContent += addTags("Placemark id='" + RTE_DEFN_LN_NM + "'", "Open");
    kmlContent += (addTags("name", "Open") + RTE_DEFN_LN_NM + addTags("name", "Close"));
    kmlContent += (addTags("description", "Open") + RTE_DEFN_LN_NM + addTags("description", "Close"));
    kmlContent += addTags("Point", "Open");
    /*kmlContent += (addTags("coordinates", "Open") + kmlGeom(LON + ',' + LAT) + addTags("coordinates", "Close"));*/
    kmlContent += (addTags("coordinates", "Open") + (LON + ',' + LAT) + addTags("coordinates", "Close"));
    kmlContent += addTags("Point", "Close");
    kmlContent += addTags("Placemark", "Close");
  }

  kmlContent += closingTags;
  // end build kml file

  return kmlContent;
}


// 1cii) addTags

function addTags(theData, theTagType) {
  var taggedData = "";

  if (theTagType == "Open") {
    taggedData = "<" + theData + ">";
  }
  else {
    taggedData = "</" + theData + ">";
  }

  return taggedData;
}







// stub
function exportRoutesToGeoJsonFile(resultsArr, btn_suffix) {
  let r = resultsArr;
  // console.log("no geoJSON export yet");
}

// stub
function exportRoutesToKMLFile(resultsArr, btn_suffix) {
  let r = resultsArr;
  // console.log("no KML export yet");
}


