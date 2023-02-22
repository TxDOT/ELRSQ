// https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GeoJSONLayer.html

function localGeoJSONToMap(localGeoJSON) {
  console.log('localGeoJSONToMap');
  require(["esri/layers/GeoJSONLayer"], (GeoJSONLayer) => {


    for (let i = 0; i < localGeoJSON.length; i = i + 1) {
      let geojson_line = localGeoJSON[i];

      //TODO get render elements from feature properties
      const renderer_line = {
        type: "simple",
        symbol: {
          type: "simple-line",  // autocasts as new SimpleLineSymbol()
          color: "orange",
          width: "5px"
        }
      };

      let blob = new Blob([JSON.stringify(geojson_line)], {
        type: "application/json"
      });

      // create new geojson layer using the blob url
      projectLayer = new GeoJSONLayer({
        url: URL.createObjectURL(blob),
        renderer: renderer_line,
      });

      view.map.add(projectLayer);  // adds the layer to the map

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
