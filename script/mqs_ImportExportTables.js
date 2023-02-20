// special results

function specialResults(results) {
  console.log("special results");
  console.log("is this json or geojson???");
  console.log(results);
  jsonData = results;
  /*exportToJsonFile(jsonData);*/
  exportPointsToGeoJsonFile(jsonData);
  exportToCsvFile(jsonData);
  exportPointsToKMLFile(jsonData);
  //resultCount = allResults.length; // use this somewhere
  //currentResult = allResults[index]
}

function exportPointsToGeoJsonFile(jsonData) {

  var geojson = {
    type: "FeatureCollection",
    features: [],
  };

  for (i = 0; i < jsonData.length; i++) {
    geojson.features.push({
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [jsonData[i].LON, jsonData[i].LAT]
      },
      "properties": {
        "ROUTEID": jsonData[i].ROUTEID,
        "RTE_DEFN_LN_NM": jsonData[i].RTE_DEFN_LN_NM,
        "RDBD_TYPE_DSCR": jsonData[i].RDBD_TYPE_DSCR,
        "RTE_DFO": jsonData[i].RTE_DFO,
        "CTRL_SECT_LN_NBR": jsonData[i].CTRL_SECT_LN_NBR,
        "CTRL_SECT_MPT": jsonData[i].CTRL_SECT_MPT,
        "RMRKR_PNT_NBR": jsonData[i].RMRKR_PNT_NBR,
        "RMRKR_DISPLACEMENT": jsonData[i].RMRKR_DISPLACEMENT
      }
    });
  }

  console.log(geojson);
  console.log("geoJSON export");
  let dataStr = JSON.stringify(geojson);
  let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

  let exportFileDefaultName = 'results.json';

  let linkElement = document.getElementById('JSONdownload');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);

}


function exportToCsvFile(jsonData) {
  console.log("CSV export");

  let unparsed = Papa.unparse(jsonData, { "quotes": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0] });
  let csvStr = encodeURIComponent(unparsed);
  let dataUri = 'data:text/csv;charset=utf-8,' + csvStr;
  let exportFileDefaultName = 'results.csv';

  let linkElement = document.getElementById('CSVdownload');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
}


function exportPointsToKMLFile(jsonData) {

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

  for (var i = 0; i < jsonData.length; i++) {
    var RTE_DEFN_LN_NM = jsonData[i].RTE_DEFN_LN_NM;
    var LON = jsonData[i].LON;
    var LAT = jsonData[i].LAT;

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

  console.log(kmlContent);
  console.log("KML export");

  let dataUri = encodeURI(kmlContent);
  let exportFileDefaultName = 'results.kml';

  let linkElement = document.getElementById('KMLdownload');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
}

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



function makeDownloadLink(csvContent) {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8,' })
  const objUrl = URL.createObjectURL(blob)

  let exportFileDefaultName = 'christian_bale.csv';

  let linkElement = document.getElementById('CSVdownload');
  linkElement.setAttribute('href', objUrl);
  linkElement.setAttribute('download', exportFileDefaultName);

}
