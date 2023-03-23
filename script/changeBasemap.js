

dojo.query(".Basemaps").forEach(function (result) {
  on(result, "click", changeBaseMap);
});


function changeBaseMap(event) {
  getBasemapLayers();
  var newMap = event.target.id;
  document.getElementById(newMap).style.color = "red";
  map.removeLayer(layer0);

  if (newMap == "TxDOT") {
    map.addLayer(TxDOTVectorTileLayer);
  }

  if (newMap == "Google") {
    imageryZoomOut(); // prevent zoom past 21 on imagery -mw
    map.addLayer(google);

  }

  if (newMap == "txdotLightGray") {
    if (serviceError == 0) {
      txdotLightGray = new VectorTileLayer(
        "https://www.arcgis.com/sharing/rest/content/items/507a9905e7154ce484617c7327ee8bc4/resources/styles/root.json?f=pjson"
      );
      map.addLayer(txdotLightGray);
    }
    else {
      alert("This basemap service is temporarily unavailable");
      map.addLayer(TxDOTVectorTileLayer);
      document.getElementById(newMap).style.color = "";
      document.getElementById("TxDOT").style.color = "red";
    }
  }

  if (newMap == "txdotDarkGray") {
    if (serviceError == 0) {
      txdotDarkGray = new VectorTileLayer(
        "https://www.arcgis.com/sharing/rest/content/items/4bd376c56f314bc5a36446630db604a6/resources/styles/root.json?f=pjson"
      );
      map.addLayer(txdotDarkGray);
    }
    else {
      alert("This basemap service is temporarily unavailable");
      map.addLayer(TxDOTVectorTileLayer);
      document.getElementById(newMap).style.color = "";
      document.getElementById("TxDOT").style.color = "red";
    }
  }

  if (newMap == "esriStreets") {
    esriStreets = new VectorTileLayer(
      "https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer"
    );
    map.addLayer(esriStreets);
  }

  if (newMap == "openStreetMap") {
    osmLayer = new OpenStreetMapLayer();
    map.addLayer(osmLayer);
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
TxDOTVectorTileLayer = new VectorTileLayer(vectorURL);
map.addLayer(TxDOTVectorTileLayer);

// Google Imagery WMTS layer info
var GoogleLayerInfo = new WMTSLayerInfo({
  identifier: "texas",
  tileMatrixSet: "0to20",
  format: "png",
});

var GoogleLayerOptions = {
  serviceMode: "KVP",
  layerInfo: GoogleLayerInfo,
};

// Name server with CORS enabled for Google Imagery
esri.config.defaults.io.corsEnabledServers.push("https://txgi.tnris.org");

// Add Google Imagery WMTS layer
google = new WMTSLayer(
  "https://txgi.tnris.org/login/path/corner-express-popcorn-compact/wmts",
  GoogleLayerOptions
);



function getBasemapLayers() {
  layer0 = map.getLayer(map.layerIds[0]); //This should be the SPM Basemap layer
  layer1 = map.getLayer(map.layerIds[1]); //This will be INRIX if present
}