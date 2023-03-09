require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/GraphicsLayer",
  "esri/layers/FeatureLayer",
  "esri/layers/VectorTileLayer",
  "esri/layers/TileLayer",
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
  GeoJSONLayer,
  LabelClass
) {

  esriConfig.apiKey = "";

  const map = new Map({});

  TxDOTVectorTileLayer = new VectorTileLayer(
    "https://tiles.arcgis.com/tiles/KTcxiTD9dsQw4r7Z/arcgis/rest/services/TxDOT_Vector_Tile_Basemap/VectorTileServer"
  );
  map.add(TxDOTVectorTileLayer);

  imagery = new TileLayer("https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer");
  map.add(imagery);
  imagery.visible = false;

  //FIXME change format of TxDOT_Reference_MarkersLabelClass
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


  TxDOT_Reference_Markers.renderer = {
    type: "simple",
    symbol: {
      type: "cim",
      data: {
        type: "CIMSymbolReference",
        primitiveOverrides: [
          {
            type: "CIMPrimitiveOverride",
            primitiveName: "textGraphic",
            propertyName: "TextString",
            valueExpressionInfo: {
              type: "CIMExpressionInfo",
              title: "Custom",
              expression: "$feature.MRKR_NBR",
              returnType: "Default"
            }
          }
        ],
        symbol: getPointSymbolData()
      }
    }
  };

  map.add(TxDOT_Reference_Markers);
  TxDOT_Reference_Markers.visible = false;

  //FIXME change format of TxDOT_Control_SectionsLabelClass
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
  TxDOT_Control_Sections.labelingInfo = [TxDOT_Control_SectionsLabelClass];
  map.add(TxDOT_Control_Sections);
  TxDOT_Control_Sections.visible = false;

  function getPointSymbolData() {
    return {
      "type": "CIMPointSymbol",
      "symbolLayers": [
        {
          "type": "CIMVectorMarker",
          "enable": true,
          "size": 10,
          "colorLocked": true,
          "anchorPointUnits": "Relative",
          "frame": { "xmin": -5, "ymin": -5, "xmax": 5, "ymax": 5 },
          "markerGraphics": [
            {
              "type": "CIMMarkerGraphic",
              primitiveName: "textGraphic",
              "geometry": { "x": 0, "y": 0 },
              "symbol": {
                "type": "CIMTextSymbol",
                "fontFamilyName": "Arial",
                "fontStyleName": "Bold",
                "height": 16,
                "angle": 90,
                "offsetX": -9,
                "offsetY": 12,
                "symbol": {
                  "type": "CIMPolygonSymbol", "symbolLayers": [{
                    "type": "CIMSolidFill", "enable": true, "color": [162, 183, 158, 255],"effects": [{ "type": "CIMGeometricEffectRotate", "angle": 90 }]}]
                },
                "verticalAlignment": "Center",
                "font": { "family": "Arial", "decoration": "none", "style": "normal", "weight": "bold" }
              },
              "textString": "text"
            }
          ],
          "scaleSymbolsProportionally": true,
          "respectFrame": true
        },

        {
          "type": "CIMVectorMarker",
          "enable": true,
          "anchorPoint": { "x": 0, "y": -0.5 },
          "anchorPointUnits": "Relative",
          "dominantSizeAxis3D": "Y",
          "size": 40,
          "billboardMode3D": "FaceNearPlane",
          "frame": { "xmin": 0, "ymin": 0, "xmax": 42, "ymax": 42 },
          "markerGraphics": [
            {
              "type": "CIMMarkerGraphic",
              "geometry": { "rings": [[[21, 42], [21, 0], [0, 0], [0, 42], [21, 42]]] },
              "symbol": {
                "type": "CIMPolygonSymbol",
                "symbolLayers": [
                  { "type": "CIMSolidStroke", "enable": true, "capStyle": "Round", "joinStyle": "Round", "lineStyle3D": "Strip", "miterLimit": 10, "width": 1, "color": [162, 183, 158, 255] },
                  { "type": "CIMSolidFill", "enable": true, "color": [37, 134, 24, 255] }
                ]
              }
            }
          ],
          "scaleSymbolsProportionally": true,
          "respectFrame": true,
          "offsetX": 0,
          "offsetY": -18
        }
      ]
    };
  }






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
      console.log("foo");
      //cursorQuery(evt.mapPoint.latitude, evt.mapPoint.longitude);

      let lat = evt.mapPoint.latitude;
      let lon = evt.mapPoint.longitude
      resetGraphics();
      resetCurrentPagination();

      clearResultsFromMap();

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
    //console.log("Zoom: ", newZoom);

    //// do not delete
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
      //console.log("enable");
      $('#refmrkr-event').bootstrapToggle('enable');
      $('#controlsec-event').bootstrapToggle('enable');
    } else {
      //console.log("off + disable");
      $('#refmrkr-event').bootstrapToggle('off');
      $('#refmrkr-event').bootstrapToggle('disable');
      $('#controlsec-event').bootstrapToggle('off');
      $('#controlsec-event').bootstrapToggle('disable');

    }

    //show/hide layers
    if (newZoom <= 10) {
      TxDOT_Reference_Markers.visible = false;
      TxDOT_Control_Sections.visible = false;
    }
  });

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

  $('#refmrkr-event').change(function () {
    if ($(this).attr('disabled')) {
      //console.log("hide due to  disabled");
      TxDOT_Reference_Markers.visible = false;
    } else if (window.view.zoom < 10) {
      //console.log("hide due to zoom");
      TxDOT_Reference_Markers.visible = false;
    } else if (!($("#refmrkr-event").prop("checked"))) {
      //console.log("hide due to unchecked");
      TxDOT_Reference_Markers.visible = false;
    } else if ($("#refmrkr-event").prop("checked")) {
      //console.log("show due to checked");
      TxDOT_Reference_Markers.visible = true;
    } else {
      //console.log("hide due to unknown");
      TxDOT_Reference_Markers.visible = false;
    }
  })

  $('#controlsec-event').change(function () {
    if ($(this).attr('disabled')) {
      //console.log("hide due to  disabled");
      TxDOT_Control_Sections.visible = false;
    } else if (window.view.zoom < 10) {
      //console.log("hide due to zoom");
      TxDOT_Control_Sections.visible = false;
    } else if (!($("#controlsec-event").prop("checked"))) {
      //console.log("hide due to unchecked");
      TxDOT_Control_Sections.visible = false;
    } else if ($("#controlsec-event").prop("checked")) {
      //console.log("show due to checked");
      TxDOT_Control_Sections.visible = true;
    } else {
      //console.log("hide due to unknown");
      TxDOT_Control_Sections.visible = false;
    }
  })
});

