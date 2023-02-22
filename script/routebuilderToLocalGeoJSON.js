
//TODO RouteBuilder: finish writing
//Draws user defined project on the map 
function parseGeometryToGeoJSON(prjGeom) {
  console.log("parseGeometryToGeoJSON");
  console.log(prjGeom);
  let x = isJSON(prjGeom);
  console.log(x);

  let featureCollectionTextArr = [];
  // begin loop over FeatureCollection
  for (var nFeatureCollection = 0; nFeatureCollection < prjGeom.length; nFeatureCollection++) {
    console.log("print geom level FeatureCollection: ");
    console.log(prjGeom[nFeatureCollection]);
    console.log("Feature: " + nFeatureCollection);

    let featureTextArr = [];
    // begin loop over Feature
    for (var nFeature = 0; nFeature < prjGeom[nFeatureCollection].length; nFeature++) {
      console.log("print geom level Feature: ");
      console.log(prjGeom[nFeatureCollection][nFeature]);

      let propertiesTextArr = [];
      // begin loop over Properties
      for (var nLineString = 1; nLineString < prjGeom[nFeatureCollection][nFeature].length; nLineString++) {
        console.log("print geom level LineString: ");
        let propertyVals = prjGeom[nFeatureCollection][nFeature][nLineString];
        let propertyKeys = ["RTE_NM", "BDFO" , "EDFO", "Color", "Width", "Desc"];
        let propertiesText = JSON.stringify(propertyKeys.reduce((obj, key, index) => ({ ...obj, [key]: propertyVals[index] }), {}));
        propertiesTextArr.push(propertiesText);

      }
      // end loop over Properties
      console.log(propertiesTextArr);

      let strCoordinates = "[" + (prjGeom[nFeatureCollection][nFeature][0]).join("],[") + "]";
      let geometryText = `geometry: { type: LineString, coordinates: [${strCoordinates}] }`;
      ////console.log(geometryText);

      let _propertiesText = propertiesTextArr[0];
      let featureText = `{ "type": "Feature", ${_propertiesText},${geometryText}, "id": ${nFeature} }`;
      featureTextArr.push(featureText);
    }
    // end loop over Feature
    console.log(featureTextArr);


    //featureText = `, "id": "` + nFeatureCollection + `" }`;
    //console.log(featureText);
  }
  // end loop over FeatureCollection

  //featureCollectionText = `{"type": "FeatureCollection", "metadata": {}, "features": [` + featureText + `]}`;
  //console.log(featureCollectionText);
}


function isJSON(str) {
  try {
    return (JSON.parse(str) && !!str);
  } catch (e) {
    return false;
  }
}