
//TODO RouteBuilder: finish writing
//Draws user defined project on the map 
function parseGeometryToGeoJSON(prjGeom) {
  console.log("parseGeometryToGeoJSON");
  for (var nFeatureCollection = 0; nFeatureCollection < prjGeom.length; nFeatureCollection++) {
    console.log("print geom level FeatureCollection: ");
    console.log(prjGeom[nFeatureCollection]);
    console.log("Feature: " + nFeatureCollection);

    for (var nFeature = 0; nFeature < prjGeom[nFeatureCollection].length; nFeature++) {
      let coordinates = '';

      for (var nLineString = 1; nLineString < prjGeom[nFeatureCollection][nFeature].length; nLineString++) {
        console.log("print geom level LineString: ");
        console.log(prjGeom[nFeatureCollection][nFeature][nLineString]);
        console.log("RTE_NM: " + prjGeom[nFeatureCollection][nFeature][nLineString][0]);
        console.log("BDFO: " + prjGeom[nFeatureCollection][nFeature][nLineString][1]);
        console.log("EDFO: " + prjGeom[nFeatureCollection][nFeature][nLineString][2]);
        console.log("Color: " + prjGeom[nFeatureCollection][nFeature][nLineString][3]);
        console.log("Width: " + prjGeom[nFeatureCollection][nFeature][nLineString][4]);
        console.log("Desc: " + prjGeom[nFeatureCollection][nFeature][nLineString][5]);



        propertiesText = `"properties": { "RTE_NM": "` + prjGeom[nFeatureCollection][nFeature][nLineString][0] +
          `", "BDFO": ` + prjGeom[nFeatureCollection][nFeature][nLineString][1] + `, "EDFO": ` + prjGeom[nFeatureCollection][nFeature][nLineString][2] +
          `,"Color": "` + prjGeom[nFeatureCollection][nFeature][nLineString][3] + `", "Width": ` + prjGeom[nFeatureCollection][nFeature][nLineString][4] +
          `,"Desc": "` + prjGeom[nFeatureCollection][nFeature][nLineString][5] + `"}`

        console.log(propertiesText);

      }
      for (var nCoordinate = 0; nCoordinate < 10; nCoordinate++) {
        console.log("coordinates: " + nCoordinate);
        console.log(prjGeom[nFeatureCollection][nFeature][0][nCoordinate]);

        if (nCoordinate + 1 < 10) {
          coordinateBracket = `[` + prjGeom[nFeatureCollection][nFeature][0][nCoordinate] + `],`;
        } else {
          coordinateBracket = `[` + prjGeom[nFeatureCollection][nFeature][0][nCoordinate] + `]`;
        }

        coordinates += coordinateBracket;

      }
      console.log(coordinates);
      geometryText = `"geometry": { ` + `"type": "LineString", "coordinates": [` + coordinates + `]`;

    }


    featureText = `{ "type": "Feature", ` + propertiesText + `,` + geometryText + `}, "id": "` + nFeatureCollection + `" }`;
    console.log(featureText);
  }
  featureCollectionText = `{"type": "FeatureCollection", "metadata": {}, "features": [` + featureText + `]}`;
  console.log(featureCollectionText);
}