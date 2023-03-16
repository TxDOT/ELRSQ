function makeRouteGeoJson(myReturnedFeatureGeom, myPrjAttributes) {

  let aFeatureCollectionArray = [];

  for (var b = 0; b < myReturnedFeatureGeom.length; b++) {

    let aGeometryObj = new Object();
    aGeometryObj.type = "LineString";
    aGeometryObj.coordinates = myReturnedFeatureGeom[b];

    let aFeatureObj = new Object();
    aFeatureObj.type = "Feature";
    aFeatureObj.properties = myPrjAttributes;
    aFeatureObj.geometry = aGeometryObj;
    aFeatureObj.id = "abc123";

    aFeatureCollectionArray.push(aFeatureObj);
  }

  let metadata = [];
  let aFeatureCollectionObj = new Object();
  aFeatureCollectionObj.type = "FeatureCollection";
  aFeatureCollectionObj.metadata = metadata;
  aFeatureCollectionObj.features = aFeatureCollectionArray;

  return aFeatureCollectionObj;
}
