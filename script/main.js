require([
  "esri/config", 
  "esri/Map", 
  "esri/views/MapView",
  "esri/layers/GraphicsLayer",
  "esri/layers/FeatureLayer",
  "esri/layers/VectorTileLayer"
  ], function (
    esriConfig,
    Map,
    MapView,
    GraphicsLayer,
    FeatureLayer,
    VectorTileLayer
  ) {

  esriConfig.apiKey = "";

  const map = new Map({
    //basemap: "streets", // Basemap layer service
  });

  TxDOTVectorTileLayer = new VectorTileLayer(
    "https://tiles.arcgis.com/tiles/KTcxiTD9dsQw4r7Z/arcgis/rest/services/TxDOT_Vector_Tile_Basemap/VectorTileServer"
    );
  map.add(TxDOTVectorTileLayer);

  window.view = new MapView({
    map: map,
    center: [-99.90, 31.96], // Longitude, latitude of Texas
    zoom: 6, // Zoom level
    container: "viewDiv", // Div map element
  });

  window.view.on("click", function (event) {
      handleMapClick(event)
  })
});