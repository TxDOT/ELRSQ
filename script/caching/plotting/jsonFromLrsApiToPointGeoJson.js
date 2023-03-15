// 1bi) json-FromLrsApi-ToPointGeoJson

/**
 * 
 * @param {*} resultsArr 
 * @returns a geoJSON feature collection of points
 */
function jsonFromLrsApiToPointGeoJson(resultsArr) {
  //WATCH this is on the data to geojson to map chain

  var geojson = {
    type: "FeatureCollection",
    features: [],
  };

  for (i = 0; i < resultsArr.length; i++) {
    //console.log("looping through features, i = " + i);
    geojson.features.push({
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [resultsArr[i].LON, resultsArr[i].LAT]
      },
      "properties": {
        "ROUTEID": resultsArr[i].ROUTEID,
        "RTE_DEFN_LN_NM": resultsArr[i].RTE_DEFN_LN_NM,
        "RDBD_TYPE_DSCR": resultsArr[i].RDBD_TYPE_DSCR,
        "RTE_DFO": resultsArr[i].RTE_DFO,
        "CTRL_SECT_LN_NBR": resultsArr[i].CTRL_SECT_LN_NBR,
        "CTRL_SECT_MPT": resultsArr[i].CTRL_SECT_MPT,
        "RMRKR_PNT_NBR": resultsArr[i].RMRKR_PNT_NBR,
        "RMRKR_DISPLACEMENT": resultsArr[i].RMRKR_DISPLACEMENT
      }
    });
  }

  return geojson;
}


function jsonFromLrsApiToPointGeoJson_singular_B(myPrjAttributes) {
  //WATCH this could be on the data to geojson to map chain

  let aGeometryObj = new Object();
  aGeometryObj.type = "Point";
  aGeometryObj.coordinates = [myPrjAttributes.LON, myPrjAttributes.LAT];

  let aFeatureObj = new Object();
  aFeatureObj.type = "Feature";
  aFeatureObj.properties = myPrjAttributes;
  aFeatureObj.geometry = aGeometryObj;
  aFeatureObj.id = "abc123";

  let aFeatureCollectionArray = [(aFeatureObj)];

  let metadata = [];
  let aFeatureCollectionObj = new Object();
  aFeatureCollectionObj.type = "FeatureCollection";
  aFeatureCollectionObj.metadata = metadata;
  aFeatureCollectionObj.features = aFeatureCollectionArray;

  return aFeatureCollectionObj;
}


// this is never used
function json_FromLrsApi_ToPointGeoJson_singular(resultsArr) {

  var geojson = {
    type: "FeatureCollection",
    features: [],
  };

  geojson.features.push({
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [resultsArr.LON, resultsArr.LAT]
    },
    "properties": {
      "ROUTEID": resultsArr.ROUTEID,
      "RTE_DEFN_LN_NM": resultsArr.RTE_DEFN_LN_NM,
      "RDBD_TYPE_DSCR": resultsArr.RDBD_TYPE_DSCR,
      "RTE_DFO": resultsArr.RTE_DFO,
      "CTRL_SECT_LN_NBR": resultsArr.CTRL_SECT_LN_NBR,
      "CTRL_SECT_MPT": resultsArr.CTRL_SECT_MPT,
      "RMRKR_PNT_NBR": resultsArr.RMRKR_PNT_NBR,
      "RMRKR_DISPLACEMENT": resultsArr.RMRKR_DISPLACEMENT
    }
  });

  return geojson;
}


// this is never used
function json_FromLrsApi_ToPointGeoJson_B(resultsArr) {

  let aFeatureCollectionArray = [];

  for (i = 0; i < resultsArr.length; i++) {
    let aGeometryObj = new Object();
    aGeometryObj.type = "Point";
    aGeometryObj.coordinates = [resultsArr[i].LON, resultsArr[i].LAT];

    let aFeatureObj = new Object();
    aFeatureObj.type = "Feature";
    aFeatureObj.properties = resultsArr;
    aFeatureObj.geometry = aGeometryObj;
    aFeatureObj.id = "abc123";

    aFeatureCollectionArray.push(aFeatureObj);
  }

  let aFeatureCollectionObj = new Object();
  aFeatureCollectionObj.type = "FeatureCollection";
  aFeatureCollectionObj.metadata = [];
  aFeatureCollectionObj.features = aFeatureCollectionArray;

  return aFeatureCollectionObj;

}