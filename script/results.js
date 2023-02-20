
var outputFieldIDs = {
  ROUTEID: "#p_returned_ROUTEID",
  RTE_DEFN_LN_NM: "#p_returned_RTE_DEFN_LN_NM",
  RDBD_TYPE_DSCR: "#p_returned_RDBD_TYPE_DSCR",
  RTE_DFO: "#p_returned_RTE_DFO",
  CTRL_SECT_LN_NBR: "#p_returned_CTRL_SECT_LN_NBR",
  CTRL_SECT_MPT: "#p_returned_CTRL_SECT_MPT",
  RMRKR_PNT_NBR: "#p_returned_RMRKR_PNT_NBR",
  RMRKR_DISPLACEMENT: "#p_returned_RMRKR_DISPLACEMENT",
  LAT: "#p_returned_LAT",
  LON: "#p_returned_LON",
  BDFO: "#p_returned_RTE_DFO_begin",
  EDFO: "#p_returned_RTE_DFO_end"
};


// determine pagination and fill in HTML table results
function showResults(results, navIndex) {
  allResults = results; // this is changing the value of a global variable
  resultCount = allResults.length; // use this somewhere
  const index = navIndex ? navIndex - 1 : 0;
  currentResult = allResults[index];

  //insert pagination
  insertPagination(currentPos, resultCount);

  // fill in HTML results
  $(outputFieldIDs.ROUTEID).html(currentResult['ROUTEID']);
  $(outputFieldIDs.RTE_DEFN_LN_NM).html(currentResult['RTE_DEFN_LN_NM']);
  $(outputFieldIDs.RDBD_TYPE_DSCR).html(currentResult['RDBD_TYPE_DSCR']);
  $(outputFieldIDs.RTE_DFO).html(currentResult['RTE_DFO']);

  $(outputFieldIDs.CTRL_SECT_LN_NBR).html(currentResult['CTRL_SECT_LN_NBR']);
  $(outputFieldIDs.CTRL_SECT_MPT).html(currentResult['CTRL_SECT_MPT']);

  $(outputFieldIDs.RMRKR_PNT_NBR).html(currentResult['RMRKR_PNT_NBR']);
  $(outputFieldIDs.RMRKR_DISPLACEMENT).html(currentResult['RMRKR_DISPLACEMENT']);

  $(outputFieldIDs.LAT).html(currentResult['LAT']);
  $(outputFieldIDs.LON).html(currentResult['LON']);
}


//insert pagination
function insertPagination(currentPos, resultCount) {
  console.log(currentPos + " of " + resultCount);
  const btn_prev_inactive = `<li class="page-item disabled"><span class="page-link" tabindex="-1" aria-disabled="true">Previous</span></li>`;
  const btn_next_inactive = `<li class="page-item disabled"><span class="page-link" tabindex="-1" aria-disabled="true">Next</span></li>`;

  const btn_prev_active = `<li class="page-item"><span class="page-link" onClick="navResults('prev')">Previous</span></li>`;
  const btn_next_active = `<li class="page-item"><span class="page-link" onClick="navResults('next')">Next</span></li>`;

  const pgnStart = `<nav aria-label="..."><ul class="pagination justify-content-center">`
  const pgnEnd = `</ul></nav>`
  const pgnCurrentOpen = `<li class="page-item active" aria-current="page"><span class="page-link">`
  const pgnCurrentClose = `</span></li>`
  const pgnCurrentIndicator = `${currentPos} of ${resultCount}`
  var pgnCurrent = `<li class="page-item active" aria-current="page"><span class="page-link">` + "No data" + `</span></li>`
  var navTitle = pgnStart + pgnCurrent + pgnEnd

  if (resultCount > 1) {
    if (currentPos == 1) {
      pgnCurrent = btn_prev_inactive + pgnCurrentOpen + pgnCurrentIndicator + pgnCurrentClose + btn_next_active
    } else if (currentPos + 0 == resultCount) {
      pgnCurrent = btn_prev_active + pgnCurrentOpen + pgnCurrentIndicator + pgnCurrentClose + btn_next_inactive
    } else {
      pgnCurrent = btn_prev_active + pgnCurrentOpen + pgnCurrentIndicator + pgnCurrentClose + btn_next_active
    }
  } else if (resultCount == 1) {
    pgnCurrent = pgnCurrentOpen + pgnCurrentIndicator + pgnCurrentClose
  } else {
    pgnCurrent = pgnCurrentOpen + "No data" + pgnCurrentClose
  }

  navTitle = pgnStart + pgnCurrent + pgnEnd

  //insert pagination
  $("#result-pagination").html(navTitle);

}

function clearResults() {

  //clear pagination
  clearPagination();

  // fill in HTML results
  $(outputFieldIDs.ROUTEID).html('');
  $(outputFieldIDs.RTE_DEFN_LN_NM).html('');
  $(outputFieldIDs.RDBD_TYPE_DSCR).html('');
  $(outputFieldIDs.RTE_DFO).html('');

  $(outputFieldIDs.CTRL_SECT_LN_NBR).html('');
  $(outputFieldIDs.CTRL_SECT_MPT).html('');

  $(outputFieldIDs.RMRKR_PNT_NBR).html('');
  $(outputFieldIDs.RMRKR_DISPLACEMENT).html('');

  $(outputFieldIDs.LAT).html('');
  $(outputFieldIDs.LON).html('');
}


//clear pagination
function clearPagination() {
  $("#result-pagination").html('');
}


//navResults called by pagination buttons in showResults function
function navResults(direction) {
  direction == 'next' ? currentPos++ : currentPos--;

  if (currentPos > 0 && currentPos <= resultCount) {
    showResults(allResults, currentPos)
  }
}





// special results

function specialResults(results) {
  console.log("special results");
  console.log("is this json or geojson???");
  console.log(results);
  jsonData = results;
  /*exportToJsonFile(jsonData);*/
  exportToGeoJsonFile(jsonData);
  exportToCsvFile(jsonData);
  exportToKMLFile(jsonData);
  //resultCount = allResults.length; // use this somewhere
  //currentResult = allResults[index]
}


function exportToCsvFile(jsonData) {
  console.log("CSV export");
  let csvStr = parseJSONToCSVStr(jsonData);
  let dataUri = 'data:text/csv;charset=utf-8,' + csvStr;

  let exportFileDefaultName = 'results.csv';

  let linkElement = document.getElementById('CSVdownload');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
}



function exportToJsonFile(jsonData) {
  console.log("JSON export");
  let dataStr = JSON.stringify(jsonData);
  let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

  let exportFileDefaultName = 'results.json';

  let linkElement = document.getElementById('JSONdownload');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
}



function exportToGeoJsonFile(jsonData) {

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

function parseJSONToCSVStr(jsonData) {
  if (jsonData.length == 0) {
    return '';
  }

  let keys = Object.keys(jsonData[0]);

  let columnDelimiter = ',';
  let lineDelimiter = '\n';

  let csvColumnHeader = keys.join(columnDelimiter);
  let csvStr = csvColumnHeader + lineDelimiter;

  jsonData.forEach(item => {
    keys.forEach((key, index) => {
      if ((index > 0) && (index < keys.length - 1)) {
        csvStr += columnDelimiter;
      }
      csvStr += item[key];
    });
    csvStr += lineDelimiter;
  });

  return encodeURIComponent(csvStr);;
}

//TODO rename to specify that this is for single points conversion
function exportToKMLFile(jsonData) {

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

function kmlGeom(theData) {
  // console.log(theData);
  var kmlCoords = "";
  var calcCoord = [];
  for (var i = 0; i < theData.length; i++) {
      calcCoord = metersToLatLong(theData[i]);

      if (i == theData.length - 1) {
          kmlCoords += calcCoord.toString();
      } else {
          kmlCoords += calcCoord.toString() + " ";
      }
  }

  return kmlCoords;
}

function metersToLatLong(metersCoord) {
  //https://pubs.usgs.gov/pp/1395/report.pdf - Mercator to WGS 84 conversion on pages 44 and 267
  var latLongCoord = [];

  //Mercator Sphere Radius
  var sphRadius = 6378137;

  //Calculate Longitude
  latLongCoord.push(roundToDecimalPlace(((metersCoord[0] / sphRadius) * 180) / Math.PI, 6));

  //Calculate Latitude
  var latStepOne = 90;
  var latStepTwo = (metersCoord[1] / sphRadius) * -1;
  var latStepThree = Math.pow(Math.E, latStepTwo);
  var latStepFour = Math.atan(latStepThree);
  var latStepFive = latStepFour * (180 / Math.PI);
  var latStepSix = (2 * latStepFive) * -1;
  var latStepSeven = latStepOne + latStepSix;

  latLongCoord.push(roundToDecimalPlace(latStepSeven, 6));
  latLongCoord.push(metersCoord[2]);

  return latLongCoord;
}



