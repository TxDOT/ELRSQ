// 1) tabularPointsConvertExport

function tabularPointsConvertExport(resultsArr) {
  //console.log(resultsArr);
  exportPointsToCsvFile(resultsArr);
  exportPointsToGeoJsonFile(resultsArr);
  exportPointsToKMLFile(resultsArr);
}

// 1a) exportPointsToCsvFile

function exportPointsToCsvFile(resultsArr) {
  //console.log("CSV export");

  //let unparsed = Papa.unparse(jsonData, { "quotes": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0] }); // this makes sure msg has quotes
  let unparsed = Papa.unparse(resultsArr);
  let dataUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(unparsed);
  let exportFileDefaultName = 'pointresults.csv';

  let linkElement = document.getElementById('CSVdownload');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
}

// 1b) exportPointsToGeoJsonFile

function exportPointsToGeoJsonFile(resultsArr) {
  //console.log("geoJSON export");

  var geojson = jsonFromLrsApiToGeoJson(resultsArr)
  let dataStr = JSON.stringify(geojson);
  let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
  let exportFileDefaultName = 'pointresults.json';

  let linkElement = document.getElementById('JSONdownload');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
}

// 1bi) jsonFromLrsApiToGeoJson

function jsonFromLrsApiToGeoJson(resultsArr) {

  var geojson = {
    type: "FeatureCollection",
    features: [],
  };

  for (i = 0; i < resultsArr.length; i++) {
    //console.log("looping through features, i = " + i);
    geojson.features.push({
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [resultsArr[i].LON, resultsArr[i].LAT]
      },
      "properties": {
        "ROUTEID": resultsArr[i].ROUTEID,
        "RTE_DEFN_LN_NM": resultsArr[i].RTE_DEFN_LN_NM,
        "RDBD_TYPE_DSCR": resultsArr[i].RDBD_TYPE_DSCR,
        "RTE_DFO": resultsArr[i].RTE_DFO,
        "CTRL_SECT_LN_NBR": resultsArr[i].CTRL_SECT_LN_NBR,
        "CTRL_SECT_MPT": resultsArr[i].CTRL_SECT_MPT,
        "RMRKR_PNT_NBR": resultsArr[i].RMRKR_PNT_NBR,
        "RMRKR_DISPLACEMENT": resultsArr[i].RMRKR_DISPLACEMENT
      }
    });
  }

  return geojson;
}


// 1c) exportPointsToKMLFile

function exportPointsToKMLFile(resultsArr) {
  //console.log("KML export");

  var kmlContent = jsonToKML(resultsArr)
  let dataUri = encodeURI(kmlContent);
  let exportFileDefaultName = 'pointresults.kml';

  let linkElement = document.getElementById('KMLdownload');
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
  console.log(resultsArr);
  exportRoutesToCsvFile(resultsArr);
  exportRoutesToGeoJsonFile(resultsArr);
  exportRoutesToKMLFile(resultsArr);
}

// 2a) exportRoutesToCsvFile

function exportRoutesToCsvFile(resultsArr) {
  console.log("CSV export");

  let unparsed = Papa.unparse(resultsArr);
  let dataUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(unparsed);
  let exportFileDefaultName = 'routeresults.csv';

  let linkElement = document.getElementById('CSVdownload');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
}

// stub
function exportRoutesToGeoJsonFile(resultsArr) {
  let r = resultsArr;
  console.log("no geoJSON export yet");
}

// stub
function exportRoutesToKMLFile(resultsArr) {
  let r = resultsArr;
  console.log("no KML export yet");
}

















































































function _tabularPointsConvertExport_2(resultsArr) {
  console.log(resultsArr);
  exportPointsToCsvFile(resultsArr);
}



function readFile(file) {
  console.log("reader load");
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onerror = () => {
      reader.abort();
      reject(new DOMException("Problem parsing input file."));
    };

    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsText(file);
  });
};