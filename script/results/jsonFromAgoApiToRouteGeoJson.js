/**
 *
 * @param {*} myRoadwayQueryResults
 * @param {*} myPrjAttributes an object with RTE_NM, BDFO, and EDFO attributes
 * @returns  a feature collection
 */
function jsonFromAgoApiToRouteGeoJson(myRoadwayQueryResults, myPrjAttributes) {
  let flatClippedLine = makeClippedLineStrings(myRoadwayQueryResults, myPrjAttributes);
  return makeRouteGeoJson([flatClippedLine], myPrjAttributes);
}
