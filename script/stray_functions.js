// Zooms to the extent of the layer as defined by
// its definitionExpression
// This method will work for all FeatureLayers, even
// those without a saved `fullExtent` on the service.

function zoomToLayer(layer) {
    return layer.queryExtent().then((response) => {
      console.log(response);
      view.goTo(response.extent)
        .catch((error) => {
          console.error(error);
        });
    });
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


