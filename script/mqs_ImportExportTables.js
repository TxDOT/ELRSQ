// tabularPointsConvertExport

function tabularPointsConvertExport(resultsArr) {
  console.log(resultsArr);
  exportPointsToCsvFile(resultsArr);
  exportPointsToGeoJsonFile(resultsArr);

}

function exportPointsToCsvFile(resultsArr) {
  console.log("CSV export");

  let unparsed = Papa.unparse(resultsArr);
  let dataUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(unparsed);
  let exportFileDefaultName = 'results.csv';

  let linkElement = document.getElementById('CSVdownload');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
}


function exportPointsToGeoJsonFile(resultsArr) {
  console.log("geoJSON export");

  var geojson = jsonFromLrsApiToGeoJson(resultsArr)
  let dataStr = JSON.stringify(geojson);
  let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
  let exportFileDefaultName = 'results.json';

  let linkElement = document.getElementById('JSONdownload');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
}



function jsonFromLrsApiToGeoJson(resultsArr) {

  var geojson = {
    type: "FeatureCollection",
    features: [],
  };

  for (i = 0; i < resultsArr.length; i++) {
    console.log("looping through features, i = " + i);
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






// tabularRoutesConvertExport

function tabularRoutesConvertExport(resultsArr) {
  exportRoutesToCsvFile(resultsArr);
}


function exportRoutesToCsvFile(resultsArr) {
  console.log("CSV export");

  let unparsed = Papa.unparse(resultsArr);
  let dataUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(unparsed);
  let exportFileDefaultName = 'bwdresults.csv';

  let linkElement = document.getElementById('CSVdownload');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
}


function tabularPointsConvertExport_2(resultsArr) {
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