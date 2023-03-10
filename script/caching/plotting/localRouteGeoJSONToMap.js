// https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GeoJSONLayer.html
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