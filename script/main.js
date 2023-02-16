require([
  "esri/config", 
  "esri/Map", 
  "esri/views/MapView",
  "esri/layers/GraphicsLayer",
  "esri/layers/FeatureLayer",
  "esri/layers/VectorTileLayer",
  "esri/layers/TileLayer",
  "esri/layers/support/LabelClass"
  ], function (
    esriConfig,
    Map,
    MapView,
    GraphicsLayer,
    FeatureLayer,
    VectorTileLayer,
    TileLayer,
    LabelClass
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


  const TxDOT_Reference_MarkersLabelClass = new LabelClass({
    labelExpressionInfo: { expression: "$feature.MRKR_NBR" },
    symbol: {
      type: "text",  // autocasts as new TextSymbol()
      color: "black",
      haloSize: 1,
      haloColor: "white"
    }
  });

  TxDOT_Reference_Markers = new FeatureLayer("https://services.arcgis.com/KTcxiTD9dsQw4r7Z/arcgis/rest/services/TxDOT_Reference_Markers/FeatureServer/0");
  TxDOT_Reference_Markers.labelingInfo = [ TxDOT_Reference_MarkersLabelClass ];
  map.add(TxDOT_Reference_Markers);
  TxDOT_Reference_Markers.visible = false;


  const TxDOT_Control_SectionsLabelClass = new LabelClass({
    labelExpressionInfo: { expression: "$feature.CTRL_SECT_NBR" },
    symbol: {
      type: "text",  // autocasts as new TextSymbol()
      color: "black",
      haloSize: 1,
      haloColor: "white"
    }
  });

  TxDOT_Control_Sections = new FeatureLayer("https://services.arcgis.com/KTcxiTD9dsQw4r7Z/arcgis/rest/services/TxDOT_Control_Sections/FeatureServer/0")
  TxDOT_Control_Sections.labelingInfo = [ TxDOT_Control_SectionsLabelClass ];
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
    //console.log("Zoom: ", newZoom);
    
    //// enable/disable checkboxes
   /* if (newZoom > 10) {
      console.log("enable");
      $("#refmrkr-event").prop("disabled", false);
      $("#controlsec-event").prop("disabled", false);
    } else {
      console.log("off + disable");
      $("#refmrkr-event").prop("checked", false);
      $("#refmrkr-event").prop("disabled", true);
      $("#controlsec-event").prop("checked", false);
      $("#controlsec-event").prop("disabled", true);
    }  */


    // enable/disable toggles
    if (newZoom > 10) {
      console.log("enable");
      $('#refmrkr-event').bootstrapToggle('enable');
      $('#controlsec-event').bootstrapToggle('enable');
    } else {
      console.log("off + disable");
      $('#refmrkr-event').bootstrapToggle('off');
      $('#refmrkr-event').bootstrapToggle('disable');
      $('#controlsec-event').bootstrapToggle('off');
      $('#controlsec-event').bootstrapToggle('disable');

    }  



    //show/hide layers
    if (newZoom <= 10){
      TxDOT_Reference_Markers.visible = false;
      TxDOT_Control_Sections.visible = false;
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
    if ($(this).attr('disabled')){
      console.log("hide due to  disabled");
      TxDOT_Reference_Markers.visible = false;
    } else if (window.view.zoom < 10){
      console.log("hide due to zoom");
      TxDOT_Reference_Markers.visible = false;
    } else if (!($("#refmrkr-event").prop("checked"))) {
      console.log("hide due to unchecked");
      TxDOT_Reference_Markers.visible = false;
    } else if ($("#refmrkr-event").prop("checked")) {
      console.log("show due to checked");
      TxDOT_Reference_Markers.visible = true;
    } else {
      console.log("hide due to unknown");
      TxDOT_Reference_Markers.visible = false;
    }
  })


  $('#controlsec-event').change(function() {
    if ($(this).attr('disabled')){
      console.log("hide due to  disabled");
      TxDOT_Control_Sections.visible = false;
    } else if (window.view.zoom < 10){
      console.log("hide due to zoom");
      TxDOT_Control_Sections.visible = false;
    } else if (!($("#controlsec-event").prop("checked"))) {
      console.log("hide due to unchecked");
      TxDOT_Control_Sections.visible = false;
    } else if ($("#controlsec-event").prop("checked")) {
      console.log("show due to checked");
      TxDOT_Control_Sections.visible = true;
    } else {
      console.log("hide due to unknown");
      TxDOT_Control_Sections.visible = false;
    }
  })



});