/**
 * 
 * @param {*} currentResult is an object with route characteristics
 * @returns a project object consisting of route, DFOs, and drawing characteristics
 */
function objectifyRouteProject(currentResult) {
  //WATCH this is on the data to geojson to map chain
  console.log("objectify-Route-Project: currentResult: " + currentResult);
  let projObj = new Object();
  projObj.RTE_NM = currentResult['BEGIN_RTE_DEFN_LN_NM'];
  projObj.BDFO = currentResult['BEGIN_RTE_DFO'];
  projObj.EDFO = currentResult['END_RTE_DFO'];
  projObj.Color = currentResult['Color'];
  projObj.Width = currentResult['Width'];
  projObj.Desc = currentResult['Feature'];

  if (GLOBALSETTINGS.PrintProjGeom == 1) { console.log("objectify-Route-Project: " + JSON.stringify(projObj)); }

  return projObj;
}


/**
 *
 * @param {*} myRoadwayQueryResults
 * @param {*} projObj an object with RTE_NM, BDFO, and EDFO attributes
 * @returns  a feature collection
 */
function jsonFromAgoApiToRouteGeoJson(myRoadwayQueryResults, projObj) {
  //WATCH this is on the data to geojson to map chain
  let flatClippedLine = makeClippedLineStrings(myRoadwayQueryResults, projObj);
  return makeRouteGeoJson([flatClippedLine], projObj);
}


function makeRouteGeoJson(myReturnedFeatureGeom, projObj) {
  //WATCH this is on the data to geojson to map chain
  let geojson_featureArr = [];

  for (let i = 0; i < myReturnedFeatureGeom.length; i++) {

    let aGeometryObj = new Object();
    aGeometryObj.type = "LineString";
    aGeometryObj.coordinates = myReturnedFeatureGeom[i];

    let aFeatureObj = new Object();
    aFeatureObj.type = "Feature";
    aFeatureObj.properties = projObj;
    aFeatureObj.geometry = aGeometryObj;
    aFeatureObj.id = "abc123";

    geojson_featureArr.push(aFeatureObj);
  }

  return geojson_featureArr;
}





/**
 *
 * https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GeoJSONLayer.html
 * takes a geoJSON route input
 * creates a new GeoJSON layer and adds it to the map view
 * then zooms to the layer
 *
 * @param {*} localGeoJSON
 */
function localRouteGeoJSONToMap(localGeoJSONArr) {
  // WATCH 
  require(["esri/layers/GeoJSONLayer"], (GeoJSONLayer) => {

    for (let i = 0; i < localGeoJSONArr.length; i = i + 1) {
      let geojson_line = localGeoJSONArr[i];
      let color = geojson_line.properties.Color || "#ff8000";
      let width = (geojson_line.properties.Width || "3") + "px";

      const renderer_line = JSON.parse(
        `{
          "type": "simple", 
          "symbol": {
            "type": "simple-line", 
            "color": "${color}", 
            "width": "${width}"
          }
        }`
      );

      let blob = new Blob([JSON.stringify(geojson_line)], {
        type: "application/json"
      });

      // create new geojson layer using the blob url
      projectLayer = new GeoJSONLayer({
        url: URL.createObjectURL(blob),
        renderer: renderer_line,
      });

      view.map.add(projectLayer); // adds the layer to the map

      // When the layer is loaded, query for the extent
      // of all features in the layer. Then set the view's
      // extent to the returned extent of all features.
      projectLayer
        .when(() => {
          return projectLayer.queryExtent();
        })
        .then((response) => {
          view.goTo(response.extent);
        });
    }
  });
}


