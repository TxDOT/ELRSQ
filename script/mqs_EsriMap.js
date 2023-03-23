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

  let imagery = new TileLayer("https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer");
  map.add(imagery);
  imagery.visible = false;

  // Add Google Imagery WMTS layer
  //let GoogleLayerInfo = new WMTSLayerInfo({ identifier: "texas", tileMatrixSet: "0to20", format: "png", });
  //let GoogleLayerOptions = { serviceMode: "KVP", layerInfo: GoogleLayerInfo };
  let GoogleLayerOptions = { serviceMode: "KVP" };
  let google = new WMTSLayer("https://txgi.tnris.org/login/path/corner-express-popcorn-compact/wmts", GoogleLayerOptions);








  // toggle buttons for showing/hiding layers
  $('#basemap-event').change(function () {
    if ($(this).prop('checked')) {
      imagery.visible = false;
      TxDOTVectorTileLayer.visible = true;
    } else {
      TxDOTVectorTileLayer.visible = false;
      imagery.visible = true;
    }
  })


  $('.basemap').on("click", function () {
    let basemap_btn = $(this).attr('id');
    console.log(basemap_btn);
    changeBaseMap(basemap_btn);
  });


  serviceCheck();

  function changeBaseMap(basemap_btn) {

    //layer0 = map.getLayer(view.map.layerIds[0]); //This should be the SPM Basemap layer
    //layer1 = map.getLayer(view.map.layerIds[1]); //This will be INRIX if present

    var newBasemap = basemap_btn;
    //document.getElementsByClassName("basemap").style.color = "";
    $('.basemap').css("color", "");
    document.getElementById(newBasemap).style.color = "red";
    //view.map.removeLayer(layer0);

    if (newBasemap == "TxDOT") {
      view.map.add(TxDOTVectorTileLayer);
    }

    if (newBasemap == "Google") {
      //imageryZoomOut(); // prevent zoom past 21 on imagery -mw
      view.map.add(google);

    }

    if (newBasemap == "txdotLightGray") {
      if (serviceError == 0) {
        txdotLightGray = new VectorTileLayer(
          "https://www.arcgis.com/sharing/rest/content/items/507a9905e7154ce484617c7327ee8bc4/resources/styles/root.json?f=pjson"
        );
        view.map.add(txdotLightGray);
      }
      else {
        alert("This basemap service is temporarily unavailable");
        view.map.add(TxDOTVectorTileLayer);
        document.getElementById(newBasemap).style.color = "";
        document.getElementById("TxDOT").style.color = "red";
      }
    }

    if (newBasemap == "txdotDarkGray") {
      if (serviceError == 0) {
        txdotDarkGray = new VectorTileLayer(
          "https://www.arcgis.com/sharing/rest/content/items/4bd376c56f314bc5a36446630db604a6/resources/styles/root.json?f=pjson"
        );
        view.map.add(txdotDarkGray);
      }
      else {
        alert("This basemap service is temporarily unavailable");
        view.map.add(TxDOTVectorTileLayer);
        document.getElementById(newBasemap).style.color = "";
        document.getElementById("TxDOT").style.color = "red";
      }
    }

    if (newBasemap == "esriStreets") {
      esriStreets = new VectorTileLayer(
        "https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer"
      );
      view.map.add(esriStreets);
    }

    if (newBasemap == "openStreetMap") {
      osmLayer = new OpenStreetMapLayer();
      view.map.add(osmLayer);
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




  //FIXME change format of TxDOT_Control_SectionsLabelClass
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


  //FIXME change format of TxDOT_Reference_MarkersLabelClass
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
  //TxDOT_Reference_Markers.definitionExpression("RDBD_TYPE IN ('KG')");
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
    //// do not delete
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

