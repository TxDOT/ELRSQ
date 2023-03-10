// 1bi) jsonFromLrsApiToPointGeoJson
function jsonFromLrsApiToPointGeoJson(resultsArr) {

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
