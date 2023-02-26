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



});


// TODO split out and extend these functions
// creates point graphic at lat/lon of each result

function showPointResultsOnMap(results) {
  //go through each result and add on map

  require(["esri/Graphic"], (Graphic) => {
    // FIXME verify that this draws all returned points
    results.forEach(_result => {

      let point = {
        type: "point",
        latitude: parseFloat(_result.LAT),
        longitude: parseFloat(_result.LON)
      };

      let symbol = {
        type: "simple-marker",
        color: [226, 119, 40],
        size: "12px",
        outline: {
          color: [255, 255, 0],
          width: 3
        }
      };

      let pointGraphic = new Graphic({
        geometry: point,
        symbol: symbol
      });

      graphics.push(pointGraphic)
      view.graphics.add(pointGraphic);
    })

    //zoom to all graphics
    view.goTo({
      target: graphics,
      zoom: 17
    })

  });

}

function addPointGraphic(lat, lon) {
  require(["esri/Graphic"], (Graphic) => {
    let point = {
      type: "point",
      latitude: parseFloat(lat),
      longitude: parseFloat(lon)
    };

    let symbol = {
      type: "simple-marker",
      color: [226, 119, 40],
      size: "12px",
      outline: {
        color: [255, 255, 0],
        width: 3
      }
    };

    let pointGraphic = new Graphic({
      geometry: point,
      symbol: symbol
    });

    view.graphics.add(pointGraphic);
  });
}


function clearResultsFromMap() {

  graphics = [];
  //clear existing point
  view.graphics.removeAll();

  view.goTo({
    center: [-99.90, 31.96], // Longitude, latitude of Texas
    zoom: 6, // Zoom level
  })
}


function returnToPoint() {

  if (graphics.length > 0) {
    //zoom to all graphics
    view.goTo({
      target: graphics,
      zoom: 17
    })
  }
}