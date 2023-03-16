/**
 *
 * @param {*} myRoadwayQueryResults
 * @param {*} myPrjAttributes an object with RTE_NM, BDFO, and EDFO attributes
 * @returns  a feature collection
 */
function jsonFromAgoApiToRouteGeoJson(myRoadwayQueryResults, myPrjAttributes) {
  //WATCH this is on the data to geojson to map chain
  let flatClippedLine = makeClippedLineStrings(myRoadwayQueryResults, myPrjAttributes);
  return makeRouteGeoJson([flatClippedLine], myPrjAttributes);
}
