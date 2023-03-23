/** determine pagination and fill in HTML table results
 *
 * @param {*} results
 * @param {*} navIndex
 */
function readOutPointResults(results, navIndex) {
  const index = navIndex ? navIndex - 1 : 0;

  //insertPagination(currentPagination, results);
  paginationUpdater("#result-pagination", results.length);

  fillInPointHtmlTable(results[index]);
  // plot point for results[index]
  try { showThisPointResultOnMap(results[index]); } catch { }
}


/** determine pagination and fill in HTML table results
 *
 * @param {*} results
 * @param {*} navIndex
 */
function readOutRouteResults(results, navIndex) {
  const index = navIndex ? navIndex - 1 : 0;

  //insertPagination(currentPagination, results);
  paginationUpdater("#result-pagination", results.length);

  fillInRouteHtmlTable(results[index]);
  // plot route for results[index]
  try { showThisRouteResultOnMap(results[index]); } catch { }
}


/**
 * 
 * @param {*} currentResult 
 */
async function showThisRouteResultOnMap(currentResult) {
  if (GLOBALSETTINGS.PrintProjGeom == 1) { console.log("currentResult: " + currentResult); }

  try {
    addProjectToArray(currentResult); // this may not be doing anything
    let projObj = objectifyRouteProject(currentResult);
    let aProjectFeatureCollection = await queryProjectGeometry_pg(projObj);
    localRouteGeoJSONToMap([aProjectFeatureCollection]);
  } catch { }
}


/**
 * 
 * @param {*} projObj 
 * @returns a geoJSON feature collection of routes
 */
async function queryProjectGeometry_pg(projObj) {

  resetProjectFeatureCollections();

  //get segment is called within a loop, for each project
  let results = await queryRoadwayServiceByLine(projObj);
  let aProjectFeatureCollection = jsonFromAgoApiToRouteGeoJson(results, projObj);

  return aProjectFeatureCollection;

}


/**
 *
 * @param {*} myRoadwayQueryResults
 * @param {*} myPrjAttributes an object with RTE_NM, BDFO, and EDFO attributes
 * @returns  a feature collection
 */
function jsonFromAgoApiToRouteGeoJson(myRoadwayQueryResults, myPrjAttributes) {
  let flatClippedLine = makeClippedLineStrings(myRoadwayQueryResults, myPrjAttributes);
  return makeRouteGeoJson([flatClippedLine], myPrjAttributes);
}



// https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GeoJSONLayer.html

/**
 * takes a geoJSON route input
 * creates a new GeoJSON layer and adds it to the map view
 * then zooms to the layer
 * 
 * @param {*} localGeoJSON 
 */
function localRouteGeoJSONToMap(localGeoJSON) {
  require(["esri/layers/GeoJSONLayer"], (GeoJSONLayer) => {

    for (let i = 0; i < localGeoJSON.length; i = i + 1) {
      let geojson_line = localGeoJSON[i]; // is this a feature collection? do we need another loop over features?
      let color = localGeoJSON[i].features[0].properties.Color || "#ff8000";
      let width = (localGeoJSON[i].features[0].properties.Width || "3") + "px";
      const renderer_line = JSON.parse(`{"type": "simple", "symbol": {"type": "simple-line", "color": "${color}", "width": "${width}"}}`);

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



