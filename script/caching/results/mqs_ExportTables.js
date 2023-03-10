// 1) tabularPointsConvertExport

function tabularPointsConvertExport(resultsArr) {
  $("#bulk-convert-download-bar").show();
  $("#bulk-convert-progress-bar").hide();

  if (GLOBALSETTINGS.InputMethod == "html") {
    btn_suffix = "Main";
  } else if (GLOBALSETTINGS.InputMethod == "table") {
    btn_suffix = "Modal";
  }

  exportPointsToCsvFile(resultsArr, btn_suffix);
  exportPointsToGeoJsonFile(resultsArr, btn_suffix);
  exportPointsToKMLFile(resultsArr, btn_suffix);
}

// 1a) exportPointsToCsvFile

function exportPointsToCsvFile(resultsArr, btn_suffix) {
  let unparsed = Papa.unparse(resultsArr);
  let dataUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(unparsed);
  let exportFileDefaultName = 'pointresults.csv';

  let linkElement = document.getElementById('CSVdownload' + btn_suffix);
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
}

// 1b) exportPointsToGeoJsonFile

function exportPointsToGeoJsonFile(resultsArr, btn_suffix) {
  var geojson = jsonFromLrsApiToPointGeoJson(resultsArr)
  let dataStr = JSON.stringify(geojson);
  let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
  let exportFileDefaultName = 'pointresults.json';

  let linkElement = document.getElementById('JSONdownload' + btn_suffix);
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
}

// 1c) exportPointsToKMLFile

function exportPointsToKMLFile(resultsArr, btn_suffix) {
  var kmlContent = jsonToKML(resultsArr)
  let dataUri = encodeURI(kmlContent);
  let exportFileDefaultName = 'pointresults.kml';

  let linkElement = document.getElementById('KMLdownload' + btn_suffix);
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
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



// 2) tabularRoutesConvertExport

function tabularRoutesConvertExport(resultsArr) {
  $("#bulk-convert-download-bar").show();
  $("#bulk-convert-progress-bar").hide();

  if (GLOBALSETTINGS.InputMethod == "html") {
    btn_suffix = "Main";
  } else if (GLOBALSETTINGS.InputMethod == "table") {
    btn_suffix = "Modal";
  }

  exportRoutesToCsvFile(resultsArr, btn_suffix);
  exportRoutesToGeoJsonFile(resultsArr, btn_suffix);
  exportRoutesToKMLFile(resultsArr, btn_suffix);
}

// 2a) exportRoutesToCsvFile

function exportRoutesToCsvFile(resultsArr, btn_suffix) {
  let unparsed = Papa.unparse(resultsArr);
  let dataUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(unparsed);
  let exportFileDefaultName = 'routeresults.csv';

  let linkElement = document.getElementById('CSVdownload' + btn_suffix);
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
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


