// function which takes method to query lrs service for a single point
async function lrsQuery(method, useMap, ...id_coord) {
  resetGraphics();
  resetCurrentPagination();

  if (useMap == 1) {
    clearResultsFromMap();
  }

  GreenToYellow();

  url = makeLrsQueryUrlFromHtml(method, id_coord);

  const results = await queryService(url);
  showResults(results);
  tabularPointsConvertExport(results);

  if (useMap == 1) {
    showPointResultsOnMap(results);
  }

  YellowToGreen();
}