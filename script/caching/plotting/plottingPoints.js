/**
 * 
 * @param {*} currentResult 
 * @returns 
 */
function objectifyPointProject(currentResult) {
  console.log("objectify-Point-Project: currentResult: " + currentResult);
  let projObj = new Object();
  projObj.RTE_NM = currentResult['RTE_DEFN_LN_NM'];
  projObj.LAT = currentResult['LAT'];
  projObj.LON = currentResult['LON'];
  projObj.Color = currentResult['Color'];
  projObj.Width = currentResult['Width'];
  projObj.Desc = currentResult['Feature'];

  if (GLOBALSETTINGS.PrintProjGeom == 1) { console.log("objectify-Point-Project: " + JSON.stringify(projObj)); }

  return projObj;
}


/**
 *
 * 
 * @param {*} projObj 
 * @returns 
 */
function jsonFromLrsApiToPointGeoJson(projObj) {
  let point2d = [projObj.LON, projObj.LAT];
  return makePointGeoJson([point2d], projObj);
}


function makePointGeoJson(myReturnedFeatureGeom, projObj) {
  let geojson_featureArr = [];

  for (let i = 0; i < myReturnedFeatureGeom.length; i++) {

    let aGeometryObj = new Object();
    aGeometryObj.type = "Point";
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
 * takes a geoJSON point input
 * creates a new GeoJSON layer and adds it to the map view
 * then zooms to the layer
 *
 * @param {*} localGeoJSON
 */
function localPointGeoJSONToMap(localGeoJSONArr) {
  require(["esri/layers/GeoJSONLayer"], (GeoJSONLayer) => {

    for (let i = 0; i < localGeoJSONArr.length; i = i + 1) {
      let geojson_point = localGeoJSONArr[i];
      let color = geojson_point.properties.Color || "#ff8000";
      let inputWidth = (parseInt(geojson_point.properties.Width) * 4).toString() || "12";
      let width = inputWidth + "px";

      const renderer_point = JSON.parse(
        `{
          "type": "simple", 
          "symbol": {
            "type": "simple-marker", 
            "color": "${color}", 
            "size": "${width}"
          }
        }`
      );

      let blob = new Blob([JSON.stringify(geojson_point)], {
        type: "application/json"
      });

      // create new geojson layer using the blob url
      projectLayer = new GeoJSONLayer({
        url: URL.createObjectURL(blob),
        renderer: renderer_point,
      });

      view.map.add(projectLayer); // adds the layer to the map




      view.goTo({
        center: [parseFloat(geojson_point.properties.LON), parseFloat(geojson_point.properties.LAT)],
        zoom: 17,
      });

    }
  });
}


