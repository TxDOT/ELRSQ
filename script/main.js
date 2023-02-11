require([
  "esri/config", 
  "esri/Map", 
  "esri/views/MapView",
  "esri/layers/GraphicsLayer",
  "esri/layers/FeatureLayer",
  "esri/layers/VectorTileLayer",
  "esri/layers/TileLayer"
  ], function (
    esriConfig,
    Map,
    MapView,
    GraphicsLayer,
    FeatureLayer,
    VectorTileLayer,
    TileLayer
  ) {

  esriConfig.apiKey = "";

  const map = new Map({ });

  TxDOTVectorTileLayer = new VectorTileLayer(
    "https://tiles.arcgis.com/tiles/KTcxiTD9dsQw4r7Z/arcgis/rest/services/TxDOT_Vector_Tile_Basemap/VectorTileServer"
    );
  map.add(TxDOTVectorTileLayer);

  imagery = new TileLayer("https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer");
  map.add(imagery);
  imagery.visible = false;

  TxDOT_Reference_Markers = new FeatureLayer("https://services.arcgis.com/KTcxiTD9dsQw4r7Z/arcgis/rest/services/TxDOT_Reference_Markers/FeatureServer/0");
  map.add(TxDOT_Reference_Markers);
  TxDOT_Reference_Markers.visible = false;

  TxDOT_Control_Sections = new FeatureLayer("https://services.arcgis.com/KTcxiTD9dsQw4r7Z/arcgis/rest/services/TxDOT_Control_Sections/FeatureServer/0")
  map.add(TxDOT_Control_Sections);
  TxDOT_Control_Sections.visible = false;

  window.view = new MapView({
    map: map,
    center: [-99.90, 31.96], // Longitude, latitude of Texas
    zoom: 6, // Zoom level
    container: "viewDiv", // Div map element
  });

  window.view.on("click", function (event) {
      handleMapClick(event)
  })


  // watch handler
  var zoomHandle = view.watch('zoom', function(newZoom) {
    console.log("Zoom: ", newZoom);
    if (newZoom > 10) {
      console.log("Zoom over 10 ");
      $('#refmrkr-event').bootstrapToggle('enable')
    } else {
      console.log("Zoom under 10");
      $('#refmrkr-event').bootstrapToggle('disable')
      $('#refmrkr-event').bootstrapToggle('off')
    }  
  });





  // toggle buttons for showing/hiding layers
  $('#basemap-event').change(function() {
    if ($(this).prop('checked')){
      imagery.visible = false;
      TxDOTVectorTileLayer.visible = true;
    } else {
      TxDOTVectorTileLayer.visible = false;
      imagery.visible = true;
    }
  })

  $('#refmrkr-event').change(function() {
    if ($(this).prop('checked')){
      TxDOT_Reference_Markers.visible = false;
    } else if (window.view.zoom < 10){
      TxDOT_Reference_Markers.visible = false;
    } else {
      TxDOT_Reference_Markers.visible = true;
    }
  })

  $('#controlsec-event').change(function() {
    if ($(this).prop('checked')){
      TxDOT_Control_Sections.visible = false;
    } else if (window.view.zoom < 10){
      TxDOT_Control_Sections.visible = false;
    } else {
      TxDOT_Control_Sections.visible = true;
    }
  })

});