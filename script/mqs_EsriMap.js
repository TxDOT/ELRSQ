require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/GraphicsLayer",
  "esri/layers/FeatureLayer",
  "esri/layers/VectorTileLayer",
  "esri/layers/TileLayer",
  "esri/layers/WMTSLayer",
  "esri/layers/OpenStreetMapLayer",
  "esri/layers/GeoJSONLayer",
  "esri/layers/support/LabelClass"
], function (
  esriConfig,
  Map,
  MapView,
  GraphicsLayer,
  FeatureLayer,
  VectorTileLayer,
  TileLayer,
  WMTSLayer,
  OpenStreetMapLayer,
  GeoJSONLayer,
  LabelClass
) {

  esriConfig.apiKey = "";
  let vectorURL = "https://tiles.arcgis.com/tiles/KTcxiTD9dsQw4r7Z/arcgis/rest/services/TxDOT_Vector_Tile_Basemap/VectorTileServer";
  let serviceError = 0;

  const map = new Map({});

  let TxDOTVectorTileLayer = new VectorTileLayer(
    "https://tiles.arcgis.com/tiles/KTcxiTD9dsQw4r7Z/arcgis/rest/services/TxDOT_Vector_Tile_Basemap/VectorTileServer"
  );
  map.add(TxDOTVectorTileLayer);
  //TxDOTVectorTileLayer.visible = true;

  let txdotLightGray = new VectorTileLayer(
    "https://www.arcgis.com/sharing/rest/content/items/507a9905e7154ce484617c7327ee8bc4/resources/styles/root.json?f=pjson"
  );

  let osmLayer = new OpenStreetMapLayer();



  // Add Google Imagery WMTS layer
  //let GoogleLayerInfo = new WMTSLayerInfo({ identifier: "texas", tileMatrixSet: "0to20", format: "png", });
  //let GoogleLayerOptions = { serviceMode: "KVP", layerInfo: GoogleLayerInfo };
  let GoogleLayerOptions = { serviceMode: "KVP" };
  let google = new WMTSLayer("https://txgi.tnris.org/login/path/corner-express-popcorn-compact/wmts", GoogleLayerOptions);


  $('.basemap').on("click", function () {
    let basemap_btn = $(this).attr('id');
    console.log(basemap_btn);
    changeBaseMap(basemap_btn);
  });


  serviceCheck();

  function changeBaseMap(basemap_btn) {

    map.remove(google);
    map.remove(osmLayer);
    map.remove(txdotLightGray);

    let newBasemap = basemap_btn;
    $('.basemap').css("color", "");
    document.getElementById(newBasemap).style.color = "red";

    if (newBasemap == "TxDOT") {
      view.map.add(TxDOTVectorTileLayer);
      view.map.reorder(TxDOTVectorTileLayer, 0);
    }

    if (newBasemap == "Google") {
      //imageryZoomOut(); // prevent zoom past 21 on imagery -mw
      map.add(google);
      map.reorder(google, 1);

    }

    if (newBasemap == "openStreetMap") {
      map.add(osmLayer);
      map.reorder(osmLayer, 1);
    }

    if (newBasemap == "txdotLightGray") {
      if (serviceError == 0) {
        map.add(txdotLightGray);
        map.reorder(txdotLightGray, 1);

      }
      else {
        alert("This basemap service is temporarily unavailable");
        view.map.add(TxDOTVectorTileLayer);
        document.getElementById(newBasemap).style.color = "";
        document.getElementById("TxDOT").style.color = "red";
      }
    }
  }

  function serviceCheck() {
    let request = new XMLHttpRequest();
    request.open("GET", vectorURL, false);
    request.onreadystatechange = function () {
      if (request.readyState === XMLHttpRequest.DONE && request.response.includes("error")) {
        console.log(JSON.parse(request.response));
        vectorURL = "https://tiles.arcgis.com/tiles/KTcxiTD9dsQw4r7Z/arcgis/rest/services/TxDOT_Vector_Tile_Basemap_BACKUP/VectorTileServer";
        serviceError = 1;
      }
    }
    request.send();
  }




  const TxDOT_Control_SectionsLabelClass = new LabelClass({
    labelExpressionInfo: { expression: "$feature.CTRL_SECT_NBR" },
    symbol: {
      type: "text",  // autocasts as new TextSymbol()
      color: "black",
      haloSize: 2,
      haloColor: "white"
    }
  });

  TxDOT_Control_Sections = new FeatureLayer("https://services.arcgis.com/KTcxiTD9dsQw4r7Z/arcgis/rest/services/TxDOT_Control_Sections/FeatureServer/0")
  TxDOT_Control_Sections.labelingInfo = [TxDOT_Control_SectionsLabelClass];
  map.add(TxDOT_Control_Sections);
  TxDOT_Control_Sections.visible = false;


  const TxDOT_Reference_MarkersLabelClass = new LabelClass({
    labelExpressionInfo: { expression: "$feature.MRKR_NBR" },
    symbol: {
      type: "text",  // autocasts as new TextSymbol()
      color: "black",
      haloSize: 2,
      haloColor: "white"
    }
  });

  TxDOT_Reference_Markers = new FeatureLayer({
    url: "https://services.arcgis.com/KTcxiTD9dsQw4r7Z/arcgis/rest/services/TxDOT_Reference_Markers/FeatureServer/0",
    definitionExpression: "RDBD_TYPE = 'KG'"
  });
  TxDOT_Reference_Markers.labelingInfo = [TxDOT_Reference_MarkersLabelClass];
  map.add(TxDOT_Reference_Markers);
  TxDOT_Reference_Markers.visible = false;


  TxDOT_Reference_Markers.renderer = {
    type: "simple",  // autocasts as new SimpleRenderer()
    symbol: {
      type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
      size: 4,
      color: "red",
      outline: {  // autocasts as new SimpleLineSymbol()
        width: 0.5,
        color: "white"
      }
    }
  };


  window.view = new MapView({
    map: map,
    center: [-99.90, 31.96], // Longitude, latitude of Texas
    zoom: 6, // Zoom level
    container: "viewDiv", // Div map element
  });


  window.view.on("click", function (evt) {
    var oncursortab = document.querySelectorAll("#mapcursor-tabpane.active");
    if (oncursortab[0]) {
      cursorQuery(evt.mapPoint.latitude, evt.mapPoint.longitude);
    }
  })


  window.view.on("click", function (evt) {
    var onCursor = GLOBALSETTINGS.MapCursorLive;
    if (onCursor == 1) {
      //cursorQuery(evt.mapPoint.latitude, evt.mapPoint.longitude);

      let lat = evt.mapPoint.latitude;
      let lon = evt.mapPoint.longitude
      resetGraphics();
      resetCurrentPagination();

      clearGraphicsFromMap();

      //go to cursor location, regardless of api results
      addPointGraphic(lat, lon);
      view.goTo({
        center: [parseFloat(lon), parseFloat(lat)],
        zoom: 17,
      });

      $("#kbInputLatitude").val(lat);
      $("#kbInputLongitude").val(lon);

    }
  })




  // watch handler
  var zoomHandle = view.watch('zoom', function (newZoom) {
    //// enable/disable checkboxes
    if (newZoom > 10) {
      $("#refmrkr-event").prop("disabled", false);
      $("#controlsec-event").prop("disabled", false);
    } else {
      $("#refmrkr-event").prop("checked", false);
      $("#refmrkr-event").prop("disabled", true);
      $("#controlsec-event").prop("checked", false);
      $("#controlsec-event").prop("disabled", true);
    }

    //show/hide layers
    if (newZoom <= 10) {
      TxDOT_Reference_Markers.visible = false;
      TxDOT_Control_Sections.visible = false;
    }
  });



  $('#refmrkr-event').change(function () {
    if ($(this).attr('disabled')) {
      TxDOT_Reference_Markers.visible = false;
    } else if (window.view.zoom < 10) {
      TxDOT_Reference_Markers.visible = false;
    } else if (!($("#refmrkr-event").prop("checked"))) {
      TxDOT_Reference_Markers.visible = false;
    } else if ($("#refmrkr-event").prop("checked")) {
      TxDOT_Reference_Markers.visible = true;
    } else {
      TxDOT_Reference_Markers.visible = false;
    }
  })

  $('#controlsec-event').change(function () {
    if ($(this).attr('disabled')) {
      TxDOT_Control_Sections.visible = false;
    } else if (window.view.zoom < 10) {
      TxDOT_Control_Sections.visible = false;
    } else if (!($("#controlsec-event").prop("checked"))) {
      TxDOT_Control_Sections.visible = false;
    } else if ($("#controlsec-event").prop("checked")) {
      TxDOT_Control_Sections.visible = true;
    } else {
      TxDOT_Control_Sections.visible = false;
    }
  })
});

